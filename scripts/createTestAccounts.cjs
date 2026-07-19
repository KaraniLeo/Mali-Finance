const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const accounts = [
    { email: 'parent@utajiri.com', name: 'Test Parent', dob: '1980-01-01', tier: 'parent', country: 'kenya' },
    { email: 'teen@utajiri.com', name: 'Test Teen', dob: '2010-01-01', tier: 'teen', country: 'kenya' },
    { email: 'junior@utajiri.com', name: 'Test Junior', dob: '2015-01-01', tier: 'junior', country: 'kenya' }
  ];

  let createdUsers = [];

  for (const acc of accounts) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: acc.email,
      password: 'Password123!',
      email_confirm: true,
      user_metadata: {
        name: acc.name,
        dob: acc.dob,
        tier: acc.tier,
        country: acc.country
      }
    });

    if (error) {
      console.log(`Failed to create ${acc.email}:`, error.message);
    } else {
      console.log(`Created ${acc.email} with ID: ${data.user.id}`);
      createdUsers.push(data.user);
    }
  }

  // Fetch all lessons to unlock them
  const { data: lessons, error: lessonsError } = await supabase.from('lessons').select('id');
  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`Unlocking ${lessons.length} lessons for the test accounts...`);

  // We unlock them for ALL the accounts just created + admin
  // Wait, let's get admin ID
  const { data: adminData } = await supabase.auth.admin.listUsers();
  const adminUser = adminData?.users?.find(u => u.email === 'admin@utajiri.com');
  if (adminUser) createdUsers.push(adminUser);

  for (const user of createdUsers) {
    const progressRecords = lessons.map(l => ({
      user_id: user.id,
      lesson_id: l.id,
      completed: true,
      total_cards: 10,
      cards_completed: 10
    }));

    const { error: unlockError } = await supabase.from('lesson_progress').upsert(progressRecords, { onConflict: 'user_id,lesson_id' });
    if (unlockError) {
      console.error(`Failed to unlock modules for ${user.email}:`, unlockError);
    } else {
      console.log(`Unlocked all modules for ${user.email}`);
    }
  }
}

run();
