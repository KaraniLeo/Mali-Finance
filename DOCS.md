# Mali: Smart Money For Kids - Documentation

## 1. Product Requirements Document (PRD)

### Executive Summary
**Mali** (Swahili for "Wealth") is an AI-powered financial literacy ecosystem designed for Gen Alpha (ages 7–17+). It bridges the gap between traditional chores and high-level financial concepts like portfolio management and bond investing.

### Target Audience
1.  **Tier 1 (7–12 Yrs):** Focus on "Needs vs. Wants", piggy bank concepts, and basic chores.
2.  **Tier 2 (13–18 Yrs):** Budgeting (50/30/20 rule), side-hustle simulation, and interest rates.
3.  **Tier 3 (18+ Pro):** Advanced financial instruments (Bonds, Hedge Funds, ETF analysis).

### Core Features
- **Age-Adaptive Dashboard:** The UI and terminology change based on the user's age group.
- **MaliBot (AI Tutor):** Persistently available AI tutor providing context-aware financial advice.
- **Task Board:** Gamified chores system where kids earn "Mali Coins" or real currency (KES).
- **Adventure Modules:** Interactive learning paths (e.g., "The Piggy Bank Heist" to "Bond Market Mastery").
- **Savings Jars:** Visual tracking of financial goals (e.g., "Buy a New Bike").

---

## 2. User Stories

### For Children
- **As a 7-year-old,** I want to see simple progress bars for my chores so I know when I'll get my reward.
- **As a 15-year-old,** I want to simulate a side-hustle so I can understand the risks and rewards of business.
- **As a 19-year-old,** I want to learn about government bonds so I can start growing my long-term wealth responsibly.

### For Parents
- **As a parent,** I want to approve tasks and view spending reports so I can guide my child's behavior.
- **As a parent,** I want to set a "matching" bonus for my child's savings goals to encourage long-term thinking.

---

## 3. Technical Specifications

### Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS 4.
- **Backend:** Node.js (Express) proxy for secure API orchestration.
- **AI Engine:** Google Gemini 3 Flash (via `@google/genai`).
- **Styling:** "Natural Tones" palette (Olive, Sage, Sand, Cream).
- **Animations:** `motion/react` for smooth transitions and gamified feel.

### Security
- **API Key Protection:** Gemini keys are kept server-side in the Express environment.
- **Data Encryption:** TLS for all data in transit. 
- **Parental Controls:** PIN-protected parental dashboard to prevent unauthorized withdrawals or task approvals.

---

## 4. API Documentation

### POST `/api/chat`
Ask MaliBot a financial question.
- **Body:** `{ prompt: string, ageGroup: string }`
- **Response:** `{ text: string }`

### GET `/api/tasks`
Fetch assigned chores for the current logged-in child.
- **Response:** `Array<{ id: string, title: string, reward: number, status: 'pending' | 'completed' }>`

### POST `/api/tasks/approve`
(Parent Only) Approve a completed task.
- **Body:** `{ taskId: string }`
- **Response:** `{ success: true, newBalance: number }`
