import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function speedrunAdmin() {
  console.log('Finding admin user...');
  
  // Find admin user
  const { data: admins, error: adminError } = await supabase.from('admin_accounts').select('id').limit(1);
  
  let targetUserId = null;
  
  if (admins && admins.length > 0) {
    targetUserId = admins[0].id;
    console.log(`Found admin account: ${targetUserId}`);
  } else {
    // Fallback to first profile
    const { data: profiles, error: profilesError } = await supabase.from('profiles').select('id').limit(1);
    if (!profiles || profiles.length === 0) {
      console.log('No users found in the database. You need to log in or create an account first.');
      return;
    }
    targetUserId = profiles[0].id;
    console.log(`No explicit admin found, defaulting to first profile: ${targetUserId}`);
  }
  
  // Get all lessons
  const { data: lessons, error: lessonsError } = await supabase.from('lessons').select('id');
  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }
  
  console.log(`Found ${lessons.length} lessons. Unlocking...`);
  
  const progressRecords = lessons.map(lesson => ({
    user_id: targetUserId,
    lesson_id: lesson.id,
    completed: true,
    total_cards: 0
  }));
  
  // Insert or update
  const { error: progressError } = await supabase
    .from('lesson_progress')
    .upsert(progressRecords, { onConflict: 'user_id, lesson_id' });
    
  if (progressError) {
    console.error('Error unlocking lessons:', progressError);
    return;
  }
  
  console.log('Successfully unlocked ALL lessons for the user! Please refresh the app.');
}

speedrunAdmin().catch(console.error);
