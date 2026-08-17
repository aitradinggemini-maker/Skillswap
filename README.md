# Skillswap — Project Foundation & Architecture

Skillswap is a student-focused skill and knowledge exchange platform allowing campus students to request assistance, offer technical or academic skills, negotiate task details, and earn internal **SkillCredits**.

---

## 🏗 System Architecture & Technology Stack

- **Framework**: Next.js 16 (App Router) with React 19 & TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Database & ORM**: Prisma ORM with SQLite (local zero-cost dev setup)
- **Authentication**: JWT Cookie Session Auth (`jose`) with `bcryptjs` password hashing and `Zod` validation
- **Deployment & Budget Constraints**: Designed for zero-cost hosting (e.g. Vercel / Render / Supabase / PlanetScale free tiers).

---

## 📁 Repository Directory Structure

```
skillswap/
├── prisma/
│   ├── schema.prisma       # Complete schema (17 entities)
│   └── seed.ts             # Database seeding script for initial skills & demo user
├── src/
│   ├── app/                # Next.js App Router Pages & API Routes
│   │   ├── api/
│   │   │   └── auth/       # Auth routes (/register, /login, /logout, /me)
│   │   ├── dashboard/      # Main Dashboard view
│   │   ├── get-help/       # Post & manage SkillTask requests
│   │   ├── offer-skills/   # Discover & apply for tasks
│   │   ├── resources/      # Peer resource repository
│   │   ├── messages/       # Task-specific DealChat
│   │   ├── profile/        # User profile, reputation & skills
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppShell.tsx # Responsive App Layout Shell with Mobile Drawer
│   │   └── ui/             # Reusable Design System components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Textarea.tsx
│   │       ├── Dropdown.tsx
│   │       ├── Modal.tsx
│   │       ├── Badge.tsx
│   │       ├── StatusIndicator.tsx
│   │       ├── EmptyState.tsx
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       └── Navigation.tsx
│   ├── lib/
│   │   ├── auth.ts         # JWT Session utilities & Zod schemas
│   │   └── db.ts           # Prisma Client singleton
│   ├── services/
│   │   └── index.ts        # Modular Service Layer (Skill, Credit, Task, Chat stubs)
│   ├── types/
│   │   └── index.ts        # Core TypeScript type definitions
│   └── middleware.ts       # Protected route authentication middleware
├── package.json
└── README.md
```

---

## 🗄 Database Entities (17 Core Models)

1. `User`: Primary user authentication model.
2. `Profile`: Extended student details (name, university, major, average rating).
3. `Skill`: Catalog of technical, academic, and creative skills.
4. `UserSkill`: Junction model storing proficiency level and verification status.
5. `SkillVerification`: Audit log for skill test scores and pass/fail statuses.
6. `SkillTask`: Student task requests with credit prices and status (`OPEN`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
7. `TaskTag`: Relates tasks to required skills.
8. `TaskApplication`: Peer applications to assist on tasks with pitch and timeline proposals.
9. `TaskAgreement`: Formal contract between requester and provider for escrow release.
10. `Conversation`: Chat thread tied to two users and an optional task context.
11. `Message`: Individual messages within a conversation.
12. `CreditAccount`: Ledger tracking available and frozen (escrowed) SkillCredits.
13. `CreditTransaction`: Audit log of all credit grants, escrow holds, payments, and refunds.
14. `Rating`: Reviews and scores (1 to 5) given after agreement completion.
15. `Report`: Moderation reports for users, tasks, resources, or messages.
16. `Resource`: Shared study notes, code templates, or external links.
17. `Notification`: System alerts for task updates, messages, and credit transactions.

---

## 🔒 Security & Credit Safeguards

- **Server-Side Credit Mutability**: SkillCredit balances are tracked exclusively in `CreditAccount` and `CreditTransaction` models. Frontend client code NEVER passes or directly modifies credit balances.
- **Route Protection**: Next.js route middleware (`src/middleware.ts`) protects `/dashboard`, `/get-help`, `/offer-skills`, `/resources`, `/messages`, and `/profile`.
- **Validation**: All incoming requests are validated using `Zod` schemas before hitting database layer logic.

---

## 🚀 Development Setup & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Database & Run Migrations**:
   ```bash
   npx prisma db push
   ```

3. **Seed Database with Default Skills**:
   ```bash
   npx prisma db seed
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 🗺 Implementation Roadmap for Future Steps

Future feature modules should be built directly into the established architecture:

- **Step 2 — Skill Verification System**: Implement test quiz UI and wire `SkillService.submitVerificationTest()` to evaluate answers.
- **Step 3 — Task Marketplace & Applications**: Expand `/get-help` and `/offer-skills` to connect to `TaskService` for real-time task posting and application submittals.
- **Step 4 — DealChat & Agreements**: Connect `/messages` with WebSocket / Server-Sent Events / Polling using `ChatService` and enable agreement formation.
- **Step 5 — SkillCredits Escrow Execution**: Execute `CreditService.lockEscrow()` upon agreement creation and `CreditService.releaseEscrowToProvider()` upon task completion.
- **Step 6 — Reputation & Ratings**: Post completed task ratings and recalculate `Profile.ratingAverage`.
