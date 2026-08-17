/**
 * Skillswap Types Definition Layer
 */

export type UserRole = "USER" | "ADMIN" | "MODERATOR";

export type ProficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type TransactionType =
  | "INITIAL_GRANT"
  | "TASK_ESCROW"
  | "TASK_PAYMENT"
  | "REFUND"
  | "ADJUSTMENT";

export type ResourceType =
  | "NOTES"
  | "CODE"
  | "REPOSITORY"
  | "TEMPLATE"
  | "OTHER";

export interface UserSummary {
  id: string;
  email: string;
  fullName: string;
  university?: string;
  major?: string;
  ratingAverage: number;
}
