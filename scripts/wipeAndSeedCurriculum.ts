import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { allPhases } from '../src/data/curriculum/index';
import { modulesData } from '../src/data/modules';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function wipeTable(tableName: string) {
  console.log(`Wiping table: ${tableName}`);
  while (true) {
    const { data, error } = await supabase.from(tableName).select('id').limit(1000);
    if (error) throw error;
    if (!data || data.length === 0) break;
    
    const ids = data.map(d => d.id);
    await supabase.from(tableName).delete().in('id', ids);
  }
}

async function wipeAndSeed() {
  console.log('Wiping old curriculum data completely...');
  
  // Wipe in reverse order of foreign keys
  await wipeTable('learning_cards');
  await wipeTable('lessons');
  await wipeTable('modules');
  await wipeTable('phases');
  
  console.log('Old curriculum wiped successfully. Starting fresh seed...');

  // 1. Insert Phases (and their lessons/cards) FIRST so foreign keys work
  for (const phase of allPhases) {
    console.log(`Seeding Phase: ${phase.id} - ${phase.title}`);
    
    const { error: phaseError } = await supabase
      .from('phases')
      .upsert({
        id: phase.id,
        title: phase.title,
        description: phase.description
      }, { onConflict: 'id' });

    if (phaseError) console.error('Error inserting phase:', phaseError);

    if (phase.lessons) {
      for (const lesson of phase.lessons) {
        const { error: lessonError } = await supabase
          .from('lessons')
          .upsert({
            id: lesson.id,
            phase_id: phase.id,
            title: lesson.title,
            level: lesson.level
          }, { onConflict: 'id' });

        if (lessonError) console.error('Error inserting lesson:', lessonError);

        if (lesson.cards && lesson.cards.length > 0) {
          const cardsToInsert = lesson.cards.map((c: any, index: number) => ({
            id: `${lesson.id}-${c.id}`, // Guaranteed unique
            lesson_id: lesson.id,
            type: c.type,
            title: c.title,
            content: c.content,
            options: c.options,
            correct_answer: c.correctAnswer,
            order_index: c.orderIndex ?? index
          }));

          const { error: cardsError } = await supabase
            .from('learning_cards')
            .upsert(cardsToInsert, { onConflict: 'id' });

          if (cardsError) console.error('Error inserting cards:', cardsError);
        }
      }
    }
  }

  // 2. Insert Modules
  for (const tier of Object.keys(modulesData)) {
    const mods = (modulesData as any)[tier];
    for (const m of mods) {
      console.log(`Seeding Module: ${m.id} - ${m.title}`);
      const { error: modError } = await supabase
        .from('modules')
        .upsert({
          id: m.id,
          tier: tier,
          title: m.title,
          description: m.description,
          phase_id: m.phaseId,
          order_index: (m as any).orderIndex || 0
        }, { onConflict: 'id' });

      if (modError) console.error('Error inserting module:', modError);
    }
  }

  console.log('Curriculum wipe and seed completed successfully!');
}

wipeAndSeed().catch(console.error);
