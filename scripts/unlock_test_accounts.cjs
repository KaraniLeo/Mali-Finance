require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function unlockAll() {
  console.log('Fetching all achievements and modules...');
  const { data: achievements } = await supabase.from('achievements').select('id');
  const achievementIds = achievements.map(a => a.id);

  const { data: lessons } = await supabase.from('lessons').select('id');
  const lessonIds = lessons.map(l => l.id);

  const testEmails = [
    'admin@utajiri.com',
    'parent@utajiri.com',
    'teen@utajiri.com',
    'junior@utajiri.com'
  ];

  for (const email of testEmails) {
    // 1. Find user by email from auth schema is hard via standard API without admin.getUserById
    // So let's find them by querying profiles. Wait, profiles doesn't store email directly,
    // but we can query by name if needed.
    // Or we can just get all profiles and hope their names are known.
    // Let's get them by exact names we set up.
  }
  
  // Actually, let's just update the accounts based on the known names from the previous script:
  const testNames = ['Utajiri Admin', 'Test Parent', 'Test Teen', 'Test Junior'];

  const { data: profiles } = await supabase.from('profiles').select('id, name').in('name', testNames);

  if (!profiles || profiles.length === 0) {
    console.log('No test profiles found.');
    return;
  }

  for (const profile of profiles) {
    console.log(`Unlocking for ${profile.name}...`);
    
    // Grant achievements
    await supabase.from('profiles').update({ achievements: achievementIds }).eq('id', profile.id);

    // Grant all lessons progress
    const progressInserts = lessonIds.map(lessonId => ({
      user_id: profile.id,
      lesson_id: lessonId,
      completed: true,
      score: 100
    }));

    await supabase.from('lesson_progress').upsert(progressInserts, { onConflict: 'user_id, lesson_id' });
  }

  console.log('Successfully unlocked all achievements and modules for test accounts!');
}

unlockAll().catch(console.error);
