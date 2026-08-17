import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    // Create User, Profile, and CreditAccount in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          passwordHash,
          role: "USER",
        },
      });

      await tx.profile.create({
        data: {
          userId: user.id,
          fullName: validatedData.fullName,
          university: validatedData.university || null,
          major: validatedData.major || null,
        },
      });

      const creditAccount = await tx.creditAccount.create({
        data: {
          userId: user.id,
          balance: 100, // Default initial 100 SkillCredits welcome grant
        },
      });

      await tx.creditTransaction.create({
        data: {
          recipientAccountId: creditAccount.id,
          amount: 100,
          transactionType: "INITIAL_GRANT",
          description: "Welcome bonus SkillCredits",
        },
      });

      return user;
    });

    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      fullName: validatedData.fullName,
      role: newUser.role,
    };

    const token = await createSessionToken(tokenPayload);

    const response = NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: validatedData.fullName,
        },
      },
      { status: 201 }
    );

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    if (err && typeof err === "object" && "errors" in err) {
      return NextResponse.json(
        { error: "Validation error", details: (err as { errors: unknown }).errors },
        { status: 400 }
      );
    }
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
