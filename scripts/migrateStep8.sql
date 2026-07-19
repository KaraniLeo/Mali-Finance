-- Step 8 Migrations: Moving Wallet & Jars from Local to Supabase

-- 1. Create Wallets
CREATE TABLE IF NOT EXISTS wallets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  balance numeric DEFAULT 0,
  total_debt numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- 2. Create Wealth Jars (including color and icon)
CREATE TABLE IF NOT EXISTS wealth_jars (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  target numeric DEFAULT 0,
  balance numeric DEFAULT 0,
  category text NOT NULL,
  color text DEFAULT 'bg-emerald-500',
  icon text DEFAULT 'PiggyBank',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Budget Rules
CREATE TABLE IF NOT EXISTS budget_rules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  jar_id uuid REFERENCES wealth_jars(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL DEFAULT 'percentage',
  value numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(jar_id)
);

-- 4. Create Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  jar_id uuid REFERENCES wealth_jars(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Debts
CREATE TABLE IF NOT EXISTS debts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id uuid REFERENCES wallets(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  total_amount numeric NOT NULL,
  remaining_amount numeric NOT NULL,
  due_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable RLS for all new tables
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wealth_jars ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

-- 7. Policies

-- Wallets
DROP POLICY IF EXISTS "Users can view own wallets." ON wallets;
CREATE POLICY "Users can view own wallets." ON wallets FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own wallets." ON wallets;
CREATE POLICY "Users can insert own wallets." ON wallets FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own wallets." ON wallets;
CREATE POLICY "Users can update own wallets." ON wallets FOR UPDATE USING (auth.uid() = user_id);

-- Wealth Jars
DROP POLICY IF EXISTS "Users can view own wealth jars." ON wealth_jars;
CREATE POLICY "Users can view own wealth jars." ON wealth_jars FOR SELECT USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert own wealth jars." ON wealth_jars;
CREATE POLICY "Users can insert own wealth jars." ON wealth_jars FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can update own wealth jars." ON wealth_jars;
CREATE POLICY "Users can update own wealth jars." ON wealth_jars FOR UPDATE USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can delete own wealth jars." ON wealth_jars;
CREATE POLICY "Users can delete own wealth jars." ON wealth_jars FOR DELETE USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

-- Budget Rules
DROP POLICY IF EXISTS "Users can view own budget rules." ON budget_rules;
CREATE POLICY "Users can view own budget rules." ON budget_rules FOR SELECT USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = budget_rules.wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert own budget rules." ON budget_rules;
CREATE POLICY "Users can insert own budget rules." ON budget_rules FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can update own budget rules." ON budget_rules;
CREATE POLICY "Users can update own budget rules." ON budget_rules FOR UPDATE USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can delete own budget rules." ON budget_rules;
CREATE POLICY "Users can delete own budget rules." ON budget_rules FOR DELETE USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

-- Transactions
DROP POLICY IF EXISTS "Users can view own transactions." ON transactions;
CREATE POLICY "Users can view own transactions." ON transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert own transactions." ON transactions;
CREATE POLICY "Users can insert own transactions." ON transactions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

-- Debts
DROP POLICY IF EXISTS "Users can view own debts." ON debts;
CREATE POLICY "Users can view own debts." ON debts FOR SELECT USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert own debts." ON debts;
CREATE POLICY "Users can insert own debts." ON debts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can update own debts." ON debts;
CREATE POLICY "Users can update own debts." ON debts FOR UPDATE USING (
  EXISTS (SELECT 1 FROM wallets w WHERE w.id = wallet_id AND w.user_id = auth.uid())
);
