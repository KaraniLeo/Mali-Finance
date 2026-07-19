import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const allAchievements = [
  { id: 'FIRST_SAVE', title: 'First Save', description: 'Saved your first 100 KES', icon_url: 'Trophy', condition: 'save_100' },
  { id: 'TASK_MASTER', title: 'Task Master', description: 'Completed 10 tasks in a week', icon_url: 'Zap', condition: 'task_10' },
  { id: 'WEALTH_GUIDE_CHAT', title: 'Wealth Guide', description: 'Chatted with MaliBot', icon_url: 'Shield', condition: 'chat_1' },
  { id: 'MARKET_SIM_SURVIVOR', title: 'Investor', description: 'Started your first virtual sim', icon_url: 'Star', condition: 'sim_1' },
  { id: 'SURVIVED_LIQUIDITY_CRISIS', title: 'Liquidity Survivor', description: 'Survived an inverted yield curve scenario', icon_url: 'Anchor', condition: 'survive_liquidity' },
  { id: 'NAVIGATED_COMMERCIAL_CLIFF', title: 'Real Estate Mogul', description: 'Managed a commercial balloon loan', icon_url: 'Briefcase', condition: 'manage_commercial' },
  { id: 'FINAL_EXIT_ACHIEVED', title: 'The Ultimate Exit', description: 'Successfully sold your private equity firm', icon_url: 'TrendingUp', condition: 'sell_pe' },
  { id: 'DODGED_VALUE_TRAP', title: 'Value Trap Dodger', description: 'Avoided a dead company in the simulator', icon_url: 'AlertTriangle', condition: 'avoid_trap' }
];

async function seedAchievements() {
  console.log('Seeding achievements...');
  
  for (const achievement of allAchievements) {
    const { error } = await supabase.from('achievements').upsert({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      icon_url: achievement.icon_url,
      condition: achievement.condition
    });
    
    if (error) {
      console.error(`Failed to insert achievement ${achievement.id}:`, error);
    } else {
      console.log(`Inserted achievement: ${achievement.id}`);
    }
  }
  
  console.log('Achievements seeding complete!');
}

seedAchievements();
