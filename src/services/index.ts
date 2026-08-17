import { prisma } from "@/lib/db";

/**
 * Service layer for Skill Management and Skill Verification Tests.
 * Handles listing skills, adding user skills, and evaluating verification quizzes.
 */
export const SkillService = {
  async getAllSkills() {
    return prisma.skill.findMany({
      orderBy: { name: "asc" },
    });
  },

  async getUserSkills(userId: string) {
    return prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });
  },

  async addSkillToUser(userId: string, skillId: string, proficiencyLevel = "BEGINNER") {
    return prisma.userSkill.create({
      data: {
        userId,
        skillId,
        proficiencyLevel,
      },
    });
  },

  async submitVerificationTest(userId: string, skillId: string, answers: Record<string, unknown>) {
    // Stub for skill verification grading algorithm
    const passed = true;
    const testScore = 90.0;

    const verification = await prisma.skillVerification.create({
      data: {
        userId,
        skillId,
        testScore,
        status: passed ? "PASSED" : "FAILED",
        verifiedAt: passed ? new Date() : null,
      },
    });

    if (passed) {
      await prisma.userSkill.updateMany({
        where: { userId, skillId },
        data: { isVerified: true },
      });
    }

    return verification;
  },
};

/**
 * Service layer for SkillCredits and Escrow System.
 * CRITICAL SECURITY: Credit balances MUST be modified exclusively server-side.
 */
export const CreditService = {
  async getAccountBalance(userId: string) {
    const account = await prisma.creditAccount.findUnique({
      where: { userId },
    });
    return account ? account.balance : 0;
  },

  async lockEscrow(userId: string, taskId: string, amount: number) {
    return prisma.$transaction(async (tx) => {
      const account = await tx.creditAccount.findUnique({ where: { userId } });
      if (!account || account.balance < amount) {
        throw new Error("Insufficient SkillCredits balance");
      }

      await tx.creditAccount.update({
        where: { userId },
        data: {
          balance: { decrement: amount },
          frozenBalance: { increment: amount },
        },
      });

      return tx.creditTransaction.create({
        data: {
          senderAccountId: account.id,
          recipientAccountId: account.id,
          amount,
          transactionType: "TASK_ESCROW",
          referenceId: taskId,
          description: `Locked escrow for SkillTask ${taskId}`,
        },
      });
    });
  },

  async releaseEscrowToProvider(requesterId: string, providerId: string, taskId: string, amount: number) {
    return prisma.$transaction(async (tx) => {
      const requesterAcc = await tx.creditAccount.findUnique({ where: { userId: requesterId } });
      const providerAcc = await tx.creditAccount.findUnique({ where: { userId: providerId } });

      if (!requesterAcc || !providerAcc) {
        throw new Error("Account not found");
      }

      await tx.creditAccount.update({
        where: { userId: requesterId },
        data: { frozenBalance: { decrement: amount } },
      });

      await tx.creditAccount.update({
        where: { userId: providerId },
        data: { balance: { increment: amount } },
      });

      return tx.creditTransaction.create({
        data: {
          senderAccountId: requesterAcc.id,
          recipientAccountId: providerAcc.id,
          amount,
          transactionType: "TASK_PAYMENT",
          referenceId: taskId,
          description: `Released payment for completed SkillTask ${taskId}`,
        },
      });
    });
  },
};

/**
 * Service layer for SkillTasks Marketplace and Applications.
 */
export const TaskService = {
  async listTasks(filters?: { category?: string; status?: string }) {
    return prisma.skillTask.findMany({
      where: {
        status: filters?.status || "OPEN",
      },
      include: {
        requester: { include: { profile: true } },
        tags: { include: { skill: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async createTask(requesterId: string, data: { title: string; description: string; creditPrice: number }) {
    return prisma.skillTask.create({
      data: {
        requesterId,
        title: data.title,
        description: data.description,
        creditPrice: data.creditPrice,
      },
    });
  },
};

/**
 * Service layer for Messaging / DealChat.
 */
export const ChatService = {
  async getOrCreateConversation(user1Id: string, user2Id: string, taskId?: string) {
    const existing = await prisma.conversation.findFirst({
      where: {
        OR: [
          { user1Id, user2Id, taskId },
          { user1Id: user2Id, user2Id: user1Id, taskId },
        ],
      },
    });
    if (existing) return existing;

    return prisma.conversation.create({
      data: { user1Id, user2Id, taskId },
    });
  },

  async sendMessage(conversationId: string, senderId: string, content: string) {
    return prisma.message.create({
      data: { conversationId, senderId, content },
    });
  },
};
