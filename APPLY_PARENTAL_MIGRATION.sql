-- ===================================================
-- MALI PARENTAL CONTROLS MIGRATION - Apply in Supabase SQL Editor
-- ===================================================
-- Paste this entire script into your Supabase SQL Editor (Database > SQL Editor)
-- This will add parental controls columns to the profiles table.

-- Add spent_alerts column to profiles table
alter table public.profiles 
add column if not exists spent_alerts boolean default true;

-- Add auto_allowance column to profiles table (weekly amount)
alter table public.profiles 
add column if not exists auto_allowance numeric default 0;

-- Add spending_limit column to profiles table
alter table public.profiles 
add column if not exists spending_limit numeric default 0;

-- Refresh schema cache
notify pgrst, 'reload schema';
