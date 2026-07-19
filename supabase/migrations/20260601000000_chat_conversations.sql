-- Migration: Add chat conversations, messages, and metrics tables

create table if not exists conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null default 'New conversation',
  archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  role text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists chat_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  conversation_id uuid references conversations(id),
  model text not null,
  prompt text,
  response_json jsonb,
  tokens_used integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table conversations enable row level security;
alter table messages enable row level security;
alter table chat_metrics enable row level security;

create policy if not exists "Users can view own conversations." on conversations for select using (auth.uid() = user_id);
create policy if not exists "Users can insert own conversations." on conversations for insert with check (auth.uid() = user_id);
create policy if not exists "Users can update own conversations." on conversations for update using (auth.uid() = user_id);
create policy if not exists "Users can delete own conversations." on conversations for delete using (auth.uid() = user_id);

create policy if not exists "Users can view own messages." on messages for select using (
  exists (select 1 from conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);
create policy if not exists "Users can insert own messages." on messages for insert with check (
  exists (select 1 from conversations c where c.id = new.conversation_id and c.user_id = auth.uid())
);
create policy if not exists "Users can delete own messages." on messages for delete using (
  exists (select 1 from conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);

create policy if not exists "Users can view own chat metrics." on chat_metrics for select using (auth.uid() = user_id);
create policy if not exists "Users can insert own chat metrics." on chat_metrics for insert with check (auth.uid() = user_id);
