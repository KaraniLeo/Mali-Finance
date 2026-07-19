-- ===========================================
-- MALI CHAT MIGRATION - Apply in Supabase SQL Editor
-- ===========================================
-- Paste this entire script into your Supabase SQL Editor (Database > SQL Editor)
-- This will create the necessary tables for the chat functionality

-- 1. Create conversations table
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default 'New conversation',
  archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  role text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create chat_metrics table
create table if not exists public.chat_metrics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  conversation_id uuid references public.conversations(id),
  model text not null,
  prompt text,
  response_json jsonb,
  tokens_used integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.chat_metrics enable row level security;

-- 5. Create RLS policies for conversations
create policy "Users can view own conversations."
on public.conversations for select
using (auth.uid() = user_id);

create policy "Users can insert own conversations."
on public.conversations for insert
with check (auth.uid() = user_id);

create policy "Users can update own conversations."
on public.conversations for update
using (auth.uid() = user_id);

create policy "Users can delete own conversations."
on public.conversations for delete
using (auth.uid() = user_id);

-- 6. Create RLS policies for messages
create policy "Users can view own messages."
on public.messages for select
using (
  exists (select 1 from public.conversations c where c.id = public.messages.conversation_id and c.user_id = auth.uid())
);

create policy "Users can insert own messages."
on public.messages for insert
with check (
  exists (select 1 from public.conversations c where c.id = new.conversation_id and c.user_id = auth.uid())
);

create policy "Users can delete own messages."
on public.messages for delete
using (
  exists (select 1 from public.conversations c where c.id = public.messages.conversation_id and c.user_id = auth.uid())
);

-- 7. Create RLS policies for chat_metrics
create policy "Users can view own chat metrics."
on public.chat_metrics for select
using (auth.uid() = user_id);

create policy "Users can insert own chat metrics."
on public.chat_metrics for insert
with check (auth.uid() = user_id);

-- ===========================================
-- Done! The chat tables are now ready to use.
-- ===========================================
