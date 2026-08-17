import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.userId },
    include: {
      profile: true,
      creditAccount: true,
    },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.profile?.fullName || "",
      university: user.profile?.university || "",
      major: user.profile?.major || "",
      ratingAverage: user.profile?.ratingAverage || 0,
      balance: user.creditAccount?.balance ?? 100,
    },
  });
}
