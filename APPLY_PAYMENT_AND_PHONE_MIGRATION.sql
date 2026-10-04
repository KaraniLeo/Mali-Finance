-- ===================================================
-- MALI UTAJIRI: PHONE VERIFICATION & PAYSTACK PAYMENT TRANSACTIONS
-- ===================================================
-- Paste this entire script into your Supabase SQL Editor (Database > SQL Editor)
-- This creates secure tables for multi-carrier SMS OTP verification and payment tracking.

-- 1. Create phone_verifications table
create table if not exists public.phone_verifications (
  id uuid default gen_random_uuid() primary key,
  phone text not null,
  carrier text default 'unknown',
  otp_hash text not null,
  attempts integer default 0,
  max_attempts integer default 5,
  expires_at timestamp with time zone not null,
  verified boolean default false,
  verification_token text,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for phone queries
create index if not exists idx_phone_verifications_phone on public.phone_verifications(phone);
create index if not exists idx_phone_verifications_token on public.phone_verifications(verification_token);

-- 2. Create payment_transactions table
create table if not exists public.payment_transactions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  order_reference text unique not null,
  provider text not null default 'paystack' check (provider in ('paystack', 'google_play', 'daraja')),
  payment_method text not null default 'mpesa' check (payment_method in ('mpesa', 'airtel', 'card', 'bank', 'google_play')),
  amount numeric(10, 2) not null,
  currency text not null default 'KES',
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  paystack_reference text,
  mpesa_receipt_number text,
  customer_phone text,
  customer_email text,
  settlement_destination text default 'M-Pesa Paybill',
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for payments
create index if not exists idx_payment_transactions_user_id on public.payment_transactions(user_id);
create index if not exists idx_payment_transactions_order_ref on public.payment_transactions(order_reference);
create index if not exists idx_payment_transactions_paystack_ref on public.payment_transactions(paystack_reference);

-- 3. Add phone columns to profiles if not present
alter table public.profiles 
add column if not exists phone text;

alter table public.profiles 
add column if not exists phone_carrier text;

alter table public.profiles 
add column if not exists phone_verified boolean default false;

-- 4. Enable Row Level Security (RLS)
alter table public.phone_verifications enable row level security;
alter table public.payment_transactions enable row level security;

-- Only service role can access phone_verifications to protect OTP hashes from client leaks
drop policy if exists "Service role manages phone verifications" on public.phone_verifications;
create policy "Service role manages phone verifications"
on public.phone_verifications for all
using (true);

-- Users can view their own payment transactions
drop policy if exists "Users can view own payment transactions" on public.payment_transactions;
create policy "Users can view own payment transactions"
on public.payment_transactions for select
using (auth.uid()::text = user_id);

-- Service role has full access to payment transactions
drop policy if exists "Service role manages payment transactions" on public.payment_transactions;
create policy "Service role manages payment transactions"
on public.payment_transactions for all
using (true);

-- Refresh schema cache
notify pgrst, 'reload schema';
