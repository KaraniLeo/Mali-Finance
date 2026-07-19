-- ===================================================
-- MALI PARENTAL CONTROLS RLS POLICIES & MESSAGES MIGRATION
-- ===================================================
-- Paste this entire script into your Supabase SQL Editor (Database > SQL Editor)
-- This will create the coaching_messages table and allow parent accounts to safely view and manage child wallets, jars, rules, tasks, and transactions.

-- 1. Create coaching_messages table
create table if not exists public.coaching_messages (
  id uuid default gen_random_uuid() primary key,
  parent_id uuid references public.profiles(id) on delete cascade not null,
  child_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  type text not null check (type in ('warning', 'encouragement', 'checkin')),
  meta_data jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for coaching_messages
alter table public.coaching_messages enable row level security;

-- RLS Policies for coaching_messages
drop policy if exists "Parents can manage coaching messages." on public.coaching_messages;
create policy "Parents can manage coaching messages."
on public.coaching_messages for all using (auth.uid() = parent_id);

drop policy if exists "Children can view coaching messages." on public.coaching_messages;
create policy "Children can view coaching messages."
on public.coaching_messages for select using (auth.uid() = child_id);


-- 2. Profiles Update Policy (Allow parents to update child balances/streaks/limits)
drop policy if exists "Parents can update child profiles." on public.profiles;
create policy "Parents can update child profiles."
on public.profiles for update using (parent_id = auth.uid());


-- 3. Wallets Policies (Allow parents to view/update child wallets)
drop policy if exists "Parents can view child wallets." on public.wallets;
create policy "Parents can view child wallets."
on public.wallets for select using (
  exists (select 1 from public.profiles p where p.id = public.wallets.user_id and p.parent_id = auth.uid())
);

drop policy if exists "Parents can update child wallets." on public.wallets;
create policy "Parents can update child wallets."
on public.wallets for update using (
  exists (select 1 from public.profiles p where p.id = public.wallets.user_id and p.parent_id = auth.uid())
);


-- 4. Wealth Jars Policies (Allow parents to view child wealth jars)
drop policy if exists "Parents can view child wealth jars." on public.wealth_jars;
create policy "Parents can view child wealth jars."
on public.wealth_jars for select using (
  exists (
    select 1 from public.wallets w 
    join public.profiles p on w.user_id = p.id 
    where w.id = public.wealth_jars.wallet_id and p.parent_id = auth.uid()
  )
);


-- 5. Budget Rules Policies (Allow parents to view child budget rules)
drop policy if exists "Parents can view child budget rules." on public.budget_rules;
create policy "Parents can view child budget rules."
on public.budget_rules for select using (
  exists (
    select 1 from public.wallets w 
    join public.profiles p on w.user_id = p.id 
    where w.id = public.budget_rules.wallet_id and p.parent_id = auth.uid()
  )
);


-- 6. Transactions Policies (Allow parents to view and insert transactions for children)
drop policy if exists "Parents can view child transactions." on public.transactions;
create policy "Parents can view child transactions."
on public.transactions for select using (
  exists (
    select 1 from public.wallets w 
    join public.profiles p on w.user_id = p.id 
    where w.id = public.transactions.wallet_id and p.parent_id = auth.uid()
  )
);

drop policy if exists "Parents can insert child transactions." on public.transactions;
create policy "Parents can insert child transactions."
on public.transactions for insert with check (
  exists (
    select 1 from public.wallets w 
    join public.profiles p on w.user_id = p.id 
    where w.id = wallet_id and p.parent_id = auth.uid()
  )
);


-- 7. Debts Policies (Allow parents to view child debts)
drop policy if exists "Parents can view child debts." on public.debts;
create policy "Parents can view child debts."
on public.debts for select using (
  exists (
    select 1 from public.wallets w 
    join public.profiles p on w.user_id = p.id 
    where w.id = public.debts.wallet_id and p.parent_id = auth.uid()
  )
);


-- 8. User Tasks Policies (Allow parents to view and manage child tasks)
drop policy if exists "Parents can view child tasks." on public.user_tasks;
create policy "Parents can view child tasks."
on public.user_tasks for select using (
  exists (select 1 from public.profiles p where p.id = public.user_tasks.user_id and p.parent_id = auth.uid())
);

drop policy if exists "Parents can manage child tasks." on public.user_tasks;
create policy "Parents can manage child tasks."
on public.user_tasks for all using (
  exists (select 1 from public.profiles p where p.id = public.user_tasks.user_id and p.parent_id = auth.uid())
);

-- Refresh schema cache
notify pgrst, 'reload schema';
