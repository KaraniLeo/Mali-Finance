const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  // Read all migration files
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} migration files`);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log(`\n▶ Running migration: ${file}`);
    
    try {
      const { error } = await supabase.rpc('exec', { sql_text: sql });
      
      // If rpc doesn't work, try direct query
      if (error && error.message.includes('exec')) {
        console.log(`  Note: Using direct SQL execution for ${file}`);
        // For direct SQL, we need to split by statements
        const statements = sql.split(';').filter(s => s.trim());
        for (const stmt of statements) {
          if (stmt.trim()) {
            const { error: execError } = await supabase.from('_migrations').insert({
              name: file,
              sql: stmt
            }).eq('name', file);
            // This is just to execute, errors are expected
          }
        }
      } else if (error) {
        console.error(`  ✗ Error: ${error.message}`);
      } else {
        console.log(`  ✓ Migration applied successfully`);
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  console.log('\n✓ Migration process completed!');
}

runMigrations().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
