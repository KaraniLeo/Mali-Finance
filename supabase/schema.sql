-- Drop existing tables to ensure a clean reset
drop table if exists public.transactions cascade;
drop table if exists public.budget_rules cascade;
drop table if exists public.wealth_jars cascade;
drop table if exists public.debts cascade;
drop table if exists public.wallets cascade;

drop table if exists public.lesson_progress cascade;
drop table if exists public.user_streaks cascade;
drop table if exists public.xp_progress cascade;
drop table if exists public.admin_accounts cascade;

drop table if exists public.learning_cards cascade;
drop table if exists public.lessons cascade;
drop table if exists public.modules cascade;
drop table if exists public.phases cascade;
drop table if exists public.achievements cascade;

drop table if exists public.game_scores cascade;
drop table if exists public.user_modules cascade;
drop table if exists public.user_tasks cascade;
drop table if exists public.profiles cascade;

-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  name text not null,
  dob date not null,
  tier text not null,
  country text not null default 'international',
  balance numeric default 0,
  streak integer default 0,
  parent_id uuid references profiles(id),
  linking_code text,
  linked_child_id uuid references profiles(id),
  spent_alerts boolean default true,
  auto_allowance numeric default 0,
  spending_limit numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- User Tasks
create table user_tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  reward numeric not null,
  category text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Modules Progress
create table user_modules (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_id text not null,
  tier text not null,
  progress integer default 0,
  locked boolean default false,
  unique(user_id, module_id)
);

-- Game Scores
create table game_scores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  game_id text not null,
  score numeric not null,
  played_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI Chat Conversations
create table conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null default 'New conversation',
  archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  role text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table chat_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  conversation_id uuid references conversations(id),
  model text not null,
  prompt text,
  response_json jsonb,
  tokens_used integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table user_tasks enable row level security;
alter table user_modules enable row level security;
alter table game_scores enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table chat_metrics enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

create policy "Users can view own tasks." on user_tasks for select using (auth.uid() = user_id);
create policy "Users can update own tasks." on user_tasks for update using (auth.uid() = user_id);
create policy "Users can insert own tasks." on user_tasks for insert with check (auth.uid() = user_id);
create policy "Users can delete own tasks." on user_tasks for delete using (auth.uid() = user_id);

create policy "Users can view own modules." on user_modules for select using (auth.uid() = user_id);
create policy "Users can update own modules." on user_modules for update using (auth.uid() = user_id);
create policy "Users can insert own modules." on user_modules for insert with check (auth.uid() = user_id);

create policy "Users can view own game scores." on game_scores for select using (auth.uid() = user_id);
create policy "Users can insert own game scores." on game_scores for insert with check (auth.uid() = user_id);

create policy "Users can view own conversations." on conversations for select using (auth.uid() = user_id);
create policy "Users can insert own conversations." on conversations for insert with check (auth.uid() = user_id);
create policy "Users can update own conversations." on conversations for update using (auth.uid() = user_id);
create policy "Users can delete own conversations." on conversations for delete using (auth.uid() = user_id);

create policy "Users can view own messages." on messages for select using (
  exists (select 1 from conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);
create policy "Users can insert own messages." on messages for insert with check (
  exists (select 1 from conversations c where c.id = new.conversation_id and c.user_id = auth.uid())
);
create policy "Users can delete own messages." on messages for delete using (
  exists (select 1 from conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);

create policy "Users can view own chat metrics." on chat_metrics for select using (auth.uid() = user_id);
create policy "Users can insert own chat metrics." on chat_metrics for insert with check (auth.uid() = user_id);

-- Triggers for auth to auto create profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, dob, tier, country, parent_id, linking_code, linked_child_id)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    (new.raw_user_meta_data->>'dob')::date,
    new.raw_user_meta_data->>'tier',
    coalesce(new.raw_user_meta_data->>'country', 'international'),
    (new.raw_user_meta_data->>'parentId')::uuid,
    new.raw_user_meta_data->>'linkingCode',
    (new.raw_user_meta_data->>'linkedChildId')::uuid
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Wallets
create table wallets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  balance numeric default 0,
  total_debt numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Wealth Jars
create table wealth_jars (
  id uuid default gen_random_uuid() primary key,
  wallet_id uuid references wallets(id) on delete cascade not null,
  name text not null,
  target numeric default 0,
  balance numeric default 0,
  category text not null, -- spend, save, invest, give, custom
  color text default 'bg-emerald-500',
  icon text default 'PiggyBank',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Budget Rules
create table budget_rules (
  id uuid default gen_random_uuid() primary key,
  wallet_id uuid references wallets(id) on delete cascade not null,
  jar_id uuid references wealth_jars(id) on delete cascade not null,
  type text not null default 'percentage',
  value numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(jar_id)
);

-- Transactions
create table transactions (
  id uuid default gen_random_uuid() primary key,
  wallet_id uuid references wallets(id) on delete cascade not null,
  jar_id uuid references wealth_jars(id) on delete cascade,
  amount numeric not null,
  type text not null, -- credit, debit
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Debts
create table debts (
  id uuid default gen_random_uuid() primary key,
  wallet_id uuid references wallets(id) on delete cascade not null,
  name text not null,
  total_amount numeric not null,
  remaining_amount numeric not null,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table wallets enable row level security;
alter table wealth_jars enable row level security;
alter table transactions enable row level security;
alter table debts enable row level security;

-- Policies for new tables
create policy "Users can view own wallets." on wallets for select using (auth.uid() = user_id);
create policy "Users can insert own wallets." on wallets for insert with check (auth.uid() = user_id);
create policy "Users can update own wallets." on wallets for update using (auth.uid() = user_id);

create policy "Users can view own wealth jars." on wealth_jars for select using (
  exists (select 1 from wallets w where w.id = wealth_jars.wallet_id and w.user_id = auth.uid())
);
create policy "Users can insert own wealth jars." on wealth_jars for insert with check (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);
create policy "Users can update own wealth jars." on wealth_jars for update using (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);
create policy "Users can delete own wealth jars." on wealth_jars for delete using (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

alter table budget_rules enable row level security;
create policy "Users can view own budget rules." on budget_rules for select using (
  exists (select 1 from wallets w where w.id = budget_rules.wallet_id and w.user_id = auth.uid())
);
create policy "Users can insert own budget rules." on budget_rules for insert with check (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);
create policy "Users can update own budget rules." on budget_rules for update using (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);
create policy "Users can delete own budget rules." on budget_rules for delete using (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

create policy "Users can view own transactions." on transactions for select using (
  exists (select 1 from wallets w where w.id = transactions.wallet_id and w.user_id = auth.uid())
);
create policy "Users can insert own transactions." on transactions for insert with check (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

create policy "Users can view own debts." on debts for select using (
  exists (select 1 from wallets w where w.id = debts.wallet_id and w.user_id = auth.uid())
);
create policy "Users can insert own debts." on debts for insert with check (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);
create policy "Users can update own debts." on debts for update using (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);
create policy "Users can delete own debts." on debts for delete using (
  exists (select 1 from wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

-- Curriculum Data
create table phases (
  id text primary key,
  title text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table modules (
  id text primary key,
  title text not null,
  description text not null,
  tier text not null,
  phase_id text references phases(id) on delete cascade,
  icon_svg text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table lessons (
  id text primary key,
  phase_id text references phases(id) on delete cascade not null,
  title text not null,
  level text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table learning_cards (
  id text primary key,
  lesson_id text references lessons(id) on delete cascade not null,
  type text not null,
  title text not null,
  content text not null,
  image_key text,
  options jsonb,
  correct_answer text,
  tool text,
  tool_props jsonb,
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table admin_accounts (
  id uuid references profiles(id) on delete cascade primary key,
  role text not null default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table achievements (
  id text primary key,
  title text not null,
  description text not null,
  icon_url text,
  condition text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table user_streaks (
  user_id uuid references profiles(id) on delete cascade primary key,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_login timestamp with time zone default timezone('utc'::text, now()) not null
);

create table lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  lesson_id text references lessons(id) on delete cascade not null,
  completed boolean default false,
  cards_completed integer default 0,
  total_cards integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

create table xp_progress (
  user_id uuid references profiles(id) on delete cascade primary key,
  total_xp integer default 0,
  level integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table phases enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table learning_cards enable row level security;
alter table admin_accounts enable row level security;

create policy "Users can view their own admin status" on admin_accounts for select using (id = auth.uid());

alter table achievements enable row level security;
alter table user_streaks enable row level security;
alter table lesson_progress enable row level security;
alter table xp_progress enable row level security;

-- Public read policies for curriculum
create policy "Phases are viewable by everyone." on phases for select using (true);
create policy "Modules are viewable by everyone." on modules for select using (true);
create policy "Lessons are viewable by everyone." on lessons for select using (true);
create policy "Learning cards are viewable by everyone." on learning_cards for select using (true);
create policy "Achievements are viewable by everyone." on achievements for select using (true);

-- User Progress Policies
create policy "Users can view own streaks." on user_streaks for select using (auth.uid() = user_id);
create policy "Users can update own streaks." on user_streaks for update using (auth.uid() = user_id);
create policy "Users can insert own streaks." on user_streaks for insert with check (auth.uid() = user_id);

create policy "Users can view own lesson progress." on lesson_progress for select using (auth.uid() = user_id);
create policy "Users can update own lesson progress." on lesson_progress for update using (auth.uid() = user_id);
create policy "Users can insert own lesson progress." on lesson_progress for insert with check (auth.uid() = user_id);

create policy "Users can view own xp." on xp_progress for select using (auth.uid() = user_id);
create policy "Users can update own xp." on xp_progress for update using (auth.uid() = user_id);
create policy "Users can insert own xp." on xp_progress for insert with check (auth.uid() = user_id);

-- Admin Policies (Admins can do everything)
create policy "Admins can manage phases" on phases for all using (exists (select 1 from admin_accounts where id = auth.uid()));
create policy "Admins can manage modules" on modules for all using (exists (select 1 from admin_accounts where id = auth.uid()));
create policy "Admins can manage lessons" on lessons for all using (exists (select 1 from admin_accounts where id = auth.uid()));
create policy "Admins can manage cards" on learning_cards for all using (exists (select 1 from admin_accounts where id = auth.uid()));
create policy "Admins can manage achievements" on achievements for all using (exists (select 1 from admin_accounts where id = auth.uid()));

-- RPC for Distributing Deposit
create or replace function public.rpc_distribute_deposit(
  p_wallet_id uuid,
  p_amount numeric,
  p_source_desc text
)
returns void
language plpgsql
security definer
as $$
declare
  v_remaining numeric := p_amount;
  v_rule record;
  v_allocation numeric;
  v_actual_allocation numeric;
begin
  -- Insert main wallet deposit transaction
  insert into public.transactions (wallet_id, amount, type, description)
  values (p_wallet_id, p_amount, 'credit', p_source_desc);

  -- Loop through budget rules and allocate
  for v_rule in 
    select r.jar_id, r.value, j.name, j.balance
    from public.budget_rules r
    join public.wealth_jars j on r.jar_id = j.id
    where r.wallet_id = p_wallet_id and r.type = 'percentage' and r.value > 0
  loop
    if v_remaining > 0 then
      v_allocation := (p_amount * v_rule.value) / 100;
      if v_allocation > v_remaining then
        v_actual_allocation := v_remaining;
      else
        v_actual_allocation := v_allocation;
      end if;

      if v_actual_allocation > 0 then
        -- Update jar balance
        update public.wealth_jars
        set balance = balance + v_actual_allocation
        where id = v_rule.jar_id;

        -- Insert jar transaction
        insert into public.transactions (wallet_id, jar_id, amount, type, description)
        values (p_wallet_id, v_rule.jar_id, v_actual_allocation, 'credit', 'Auto-Allocated to ' || v_rule.name);

        v_remaining := v_remaining - v_actual_allocation;
      end if;
    end if;
  end loop;

  -- Update wallet balance with the unallocated remainder
  if v_remaining > 0 then
    update public.wallets
    set balance = balance + v_remaining
    where id = p_wallet_id;
  end if;
end;
$$;

-- RPC for Clearing History
create or replace function public.rpc_clear_history(
  p_wallet_id uuid,
  p_older_than_hours integer
)
returns void
language plpgsql
security definer
as $$
begin
  if p_older_than_hours is null or p_older_than_hours < 0 then
    -- delete all
    delete from public.transactions where wallet_id = p_wallet_id;
  else
    delete from public.transactions 
    where wallet_id = p_wallet_id 
    and created_at < (now() - (p_older_than_hours || ' hours')::interval);
  end if;
end;
$$;
