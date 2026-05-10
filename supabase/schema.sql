-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  name text not null,
  dob date not null,
  tier text not null,
  balance numeric default 0,
  streak integer default 0,
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

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table user_tasks enable row level security;
alter table user_modules enable row level security;
alter table game_scores enable row level security;

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

-- Triggers for auth to auto create profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, dob, tier)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    (new.raw_user_meta_data->>'dob')::date,
    new.raw_user_meta_data->>'tier'
  );
  return new;
end;
$$;

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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
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
