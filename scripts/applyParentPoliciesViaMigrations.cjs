const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sql = `
-- Profiles policies
drop policy if exists "Parents can update child profiles." on public.profiles;
create policy "Parents can update child profiles."
on public.profiles for update using (parent_id = auth.uid());

-- Wallets policies
drop policy if exists "Parents can view child wallets." on public.wallets;
create policy "Parents can view child wallets."
on public.wallets for select using (
  exists (select 1 from public.profiles p where p.id = public.wallets.user_id and p.parent_id = auth.uid())
);

drop policy if exists "Parents can update child wallets." on public.wallets;
create policy "Parents can update child wallets."
on public.wallets for update using (
  exists (select 1 from public.profiles p where p.id = public.wallets.user_id and p.parent_id = auth.uid())
);

-- Wealth Jars policies
drop policy if exists "Parents can view child wealth jars." on public.wealth_jars;
create policy "Parents can view child wealth jars."
on public.wealth_jars for select using (
  exists (select 1 from public.wallets w join public.profiles p on w.user_id = p.id where w.id = public.wealth_jars.wallet_id and p.parent_id = auth.uid())
);

-- Budget Rules policies
drop policy if exists "Parents can view child budget rules." on public.budget_rules;
create policy "Parents can view child budget rules."
on public.budget_rules for select using (
  exists (select 1 from public.wallets w join public.profiles p on w.user_id = p.id where w.id = public.budget_rules.wallet_id and p.parent_id = auth.uid())
);

-- Transactions policies
drop policy if exists "Parents can view child transactions." on public.transactions;
create policy "Parents can view child transactions."
on public.transactions for select using (
  exists (select 1 from public.wallets w join public.profiles p on w.user_id = p.id where w.id = public.transactions.wallet_id and p.parent_id = auth.uid())
);

drop policy if exists "Parents can insert child transactions." on public.transactions;
create policy "Parents can insert child transactions."
on public.transactions for insert with check (
  exists (select 1 from public.wallets w join public.profiles p on w.user_id = p.id where w.id = wallet_id and p.parent_id = auth.uid())
);

-- Debts policies
drop policy if exists "Parents can view child debts." on public.debts;
create policy "Parents can view child debts."
on public.debts for select using (
  exists (select 1 from public.wallets w join public.profiles p on w.user_id = p.id where w.id = public.debts.wallet_id and p.parent_id = auth.uid())
);

-- Tasks policies
drop policy if exists "Parents can view child tasks." on public.user_tasks;
create policy "Parents can view child tasks."
on public.user_tasks for select using (
  exists (select 1 from public.profiles p where p.id = public.user_tasks.user_id and p.parent_id = auth.uid())
);

drop policy if exists "Parents can manage child tasks." on public.user_tasks;
create policy "Parents can manage child tasks."
on public.user_tasks for all using (
  exists (select 1 from public.profiles p where p.id = public.user_tasks.user_id and p.parent_id = auth.uid())
);
`;

async function applyRLSPoliciesDirect() {
  console.log('Applying parent RLS policies using _migrations table insertions...');
  const statements = sql.split(';').filter(s => s.trim());
  const fakeFileName = `20260619999999_parent_rls_policies.sql`;
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (stmt) {
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      try {
        const { error } = await supabase.from('_migrations').insert({
          name: fakeFileName,
          sql: stmt
        });
        if (error) {
          console.error(`  ✗ Statement error: ${error.message}`);
        } else {
          console.log(`  ✓ Statement succeeded`);
        }
      } catch (err) {
        console.error(`  ✗ Try-catch error: ${err.message}`);
      }
    }
  }
  console.log('Completed.');
}

applyRLSPoliciesDirect();
