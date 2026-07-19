const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, name, tier, parent_id, linked_child_id, linking_code');
    
  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }
  
  console.log('Profiles currently in DB:');
  console.table(profiles);
}

run();
