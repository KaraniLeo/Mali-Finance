# Comprehensive UI Implementation Prompt

**Role:** You are a Senior Full-Stack React Engineer and UI/UX Expert. 
**Context:** We have already upgraded our Supabase backend schema (with `wallets`, `wealth_jars`, `transactions`, and `debts` tables) and built a dynamic Image Generation pipeline (`useFinanceAPI` hook and `/api/generate-image` endpoint).

**Task:** Perform a comprehensive frontend overhaul of the Financial Education platform to ensure complete dynamic interactivity, following the exact rules below:

### 1. Curriculum Imagery (Strict Phase Enforcement)
- **CRITICAL REQUIREMENT:** ALL learning content from **PHASE 01 to PHASE 15** MUST have dynamic contextual images.
- Update the `Card.tsx` component to heavily emphasize the `generateImage` API hook we built. Ensure that *every single card* representing a concept, insight, or example renders a contextually relevant image either from the curriculum data or dynamically generated via our pipeline.

### 2. Wallet & Dashboard Automation
- **Wallet Initialization:** The main Wallet must start completely blank/empty (0 balance). It should only begin tracking finances when the user explicitly inputs their initial data/capital.
- **Wealth Jars Automation:** The dashboard's Wealth Jars (Spend, Save, Invest, Give) must act as dynamic placeholders initially.
  - When the user inputs their specific financial goals and saving targets, the Jars must automatically begin tracking progress.
  - Users must be able to edit (change amounts/goals) or delete Jars entirely for maximum flexibility.
- **Custom Categories:** Build functionality inside the wallet/budget page for the user to add custom Jar sections (e.g., "Tithing" or "Emergency Fund") based on how they choose to utilize their finances.

### 3. Dynamic Transactions & Debt Management
- **Transaction History:** The transaction feed must be entirely dynamic, reacting instantly to any money movement between the Wallet and the Jars, or external cash-ins.
- **Debt Management Hub:** Build a dedicated UI section for Debt Management. It must:
  - Track user debts and remaining balances.
  - Hold the user accountable for repayments.
  - Seamlessly interact with the main Wallet balance when repayments are made.

### 4. Task Board Synchronization
- **Pending Tasks:** The pending tasks shown on the dashboard must dynamically sync with the main Task Board. Completing a task should automatically reward the user and immediately reflect in the dynamic Wallet balance.

**Output:** 
Begin by implementing the `WalletView.tsx` and `DashboardView.tsx` with full state management using our `useFinanceAPI` hook to hit the Supabase endpoints. Ensure the UI feels premium, highly interactive, and completely dynamic!
