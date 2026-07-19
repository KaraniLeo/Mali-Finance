#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Environment variables not found!');
  console.error('   Set VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyChatMigration() {
  console.log('🚀 Applying chat migration...\n');

  const migrationSQL = `
-- Create conversations table
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default 'New conversation',
  archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  role text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chat_metrics table
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

-- Enable RLS
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.chat_metrics enable row level security;

-- RLS Policies for conversations
drop policy if exists "Users can view own conversations." on public.conversations;
drop policy if exists "Users can insert own conversations." on public.conversations;
drop policy if exists "Users can update own conversations." on public.conversations;
drop policy if exists "Users can delete own conversations." on public.conversations;

create policy "Users can view own conversations."
on public.conversations for select using (auth.uid() = user_id);

create policy "Users can insert own conversations."
on public.conversations for insert with check (auth.uid() = user_id);

create policy "Users can update own conversations."
on public.conversations for update using (auth.uid() = user_id);

create policy "Users can delete own conversations."
on public.conversations for delete using (auth.uid() = user_id);

-- RLS Policies for messages
drop policy if exists "Users can view own messages." on public.messages;
drop policy if exists "Users can insert own messages." on public.messages;
drop policy if exists "Users can delete own messages." on public.messages;

create policy "Users can view own messages."
on public.messages for select using (
  exists (select 1 from public.conversations c where c.id = public.messages.conversation_id and c.user_id = auth.uid())
);

create policy "Users can insert own messages."
on public.messages for insert with check (
  exists (select 1 from public.conversations c where c.id = new.conversation_id and c.user_id = auth.uid())
);

create policy "Users can delete own messages."
on public.messages for delete using (
  exists (select 1 from public.conversations c where c.id = public.messages.conversation_id and c.user_id = auth.uid())
);

-- RLS Policies for chat_metrics
drop policy if exists "Users can view own chat metrics." on public.chat_metrics;
drop policy if exists "Users can insert own chat metrics." on public.chat_metrics;

create policy "Users can view own chat metrics."
on public.chat_metrics for select using (auth.uid() = user_id);

create policy "Users can insert own chat metrics."
on public.chat_metrics for insert with check (auth.uid() = user_id);
  `;

  try {
    // Try using the admin API to execute SQL
    // Note: This requires a special approach since Supabase JS client doesn't support raw SQL execution
    // We'll use the REST API instead
    
    console.log('📡 Connecting to Supabase...');
    
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Failed to connect to Supabase: ${response.status}`);
    }

    console.log('✓ Connected to Supabase');
    console.log('\n📋 SQL Migration Required');
    console.log('=' .repeat(50));
    console.log('\n⚠️  Unfortunately, Supabase\'s JavaScript client doesn\'t support');
    console.log('   executing raw SQL directly. You need to manually apply the migration.\n');
    console.log('📝 Steps:');
    console.log('   1. Go to your Supabase Dashboard');
    console.log('   2. Select your project');
    console.log('   3. Go to SQL Editor (left sidebar)');
    console.log('   4. Click "New query"');
    console.log('   5. Paste the SQL from: APPLY_CHAT_MIGRATION.sql');
    console.log('   6. Click "Run"');
    console.log('\n💾 The SQL file is ready at: APPLY_CHAT_MIGRATION.sql\n');
    console.log('=' .repeat(50));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

applyChatMigration();
