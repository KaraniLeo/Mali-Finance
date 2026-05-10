-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Wallets Table
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Removed REFERENCES auth.users(id) to allow DEMO_USER_ID during prototyping
    balance NUMERIC NOT NULL DEFAULT 0.00,
    total_debt NUMERIC NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Wealth Jars Table
CREATE TABLE IF NOT EXISTS wealth_jars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    target NUMERIC NOT NULL DEFAULT 0.00,
    balance NUMERIC NOT NULL DEFAULT 0.00,
    category TEXT NOT NULL CHECK (category IN ('spend', 'save', 'invest', 'give', 'custom')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
    jar_id UUID REFERENCES wealth_jars(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Debts Table
CREATE TABLE IF NOT EXISTS debts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    remaining_amount NUMERIC NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: RLS is commented out to allow the DEMO_USER_ID to work seamlessly 
-- until you have fully integrated Supabase Auth into your login flow.
-- Once Auth is active, uncomment these lines.

-- ENABLE RLS
-- ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE wealth_jars ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

-- Wallets RLS Policies
-- CREATE POLICY "Users can manage own wallet" ON wallets FOR ALL USING (auth.uid() = user_id);

-- Wealth Jars RLS Policies
-- CREATE POLICY "Users can manage own jars" ON wealth_jars FOR ALL USING (wallet_id IN (SELECT id FROM wallets WHERE user_id = auth.uid()));

-- Transactions RLS Policies
-- CREATE POLICY "Users can manage own transactions" ON transactions FOR ALL USING (wallet_id IN (SELECT id FROM wallets WHERE user_id = auth.uid()));

-- Debts RLS Policies
-- CREATE POLICY "Users can manage own debts" ON debts FOR ALL USING (wallet_id IN (SELECT id FROM wallets WHERE user_id = auth.uid()));

-- Function to automatically create a wallet when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.wallets (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
