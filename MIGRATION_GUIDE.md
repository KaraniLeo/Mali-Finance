# 🚀 Mali Chat Setup - Database Migration Guide

## Current Status
✅ Chat UI is fully implemented with typography system  
✅ Database tables migrated (`conversations`, `messages`, `chat_metrics`)  
✅ Chat functionality fully enabled and verified

## Quick Fix: Apply Database Migration (Completed)

### Option 1: Manual SQL (Recommended - 2 minutes)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Select your Finance project

2. **Go to SQL Editor**
   - In the left sidebar, click "SQL Editor"
   - Click "New query" button

3. **Copy & Paste SQL**
   - Open the file: `APPLY_CHAT_MIGRATION.sql` in your project root
   - Copy the entire contents
   - Paste into the Supabase SQL Editor

4. **Run the Migration**
   - Click the "Run" button (or Ctrl+Enter)
   - Wait for success message

5. **Verify**
   - Reload your chat page in browser
   - You should now be able to create conversations!

---

## What Gets Created

### Tables
- **conversations** - Stores chat conversation metadata
- **messages** - Stores individual messages (user + bot)
- **chat_metrics** - Tracks token usage and API calls

### Security (RLS Policies)
- Users can only see their own conversations/messages
- Users cannot access other users' data
- Admin has full access via service role key

---

## After Migration: What Works

✅ Create new conversations  
✅ Send messages to Mali  
✅ Receive AI responses  
✅ Save conversation history  
✅ Delete/archive conversations  
✅ Tier-based bot fonts (Nunito/Inter/IBM Plex Sans)  
✅ Dark mode text visibility  

---

## Troubleshooting

### Error: "Could not find the table 'public.conversations'"
**Solution:** Run the SQL migration (see above)

### Error: "Permission denied"
**Solution:** Make sure you're using the service role key in your `.env`, not the public anon key

### Chat still not working after migration
**Solution:** 
1. Refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for errors (F12)
3. Verify tables exist in Supabase > Table Editor

---

## Need More Help?

See the full migration SQL in: `APPLY_CHAT_MIGRATION.sql`
Check Supabase docs: https://supabase.com/docs/guides/database
