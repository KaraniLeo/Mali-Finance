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

async function seed() {
  console.log('Starting curriculum seed...');

  // 1. Insert Phases (and their lessons/cards) FIRST so foreign keys work
  for (const phase of allPhases) {
    console.log(`Seeding Phase: ${phase.id} - ${phase.title}`);
    
    // Insert Phase
    const { error: phaseError } = await supabase
      .from('phases')
      .upsert({
        id: phase.id,
        title: phase.title,
        description: phase.description
      }, { onConflict: 'id' });

    if (phaseError) {
      console.error('Error inserting phase:', phaseError);
      continue;
    }

    // Insert Lessons
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

        if (lessonError) {
          console.error(`Error inserting lesson ${lesson.id}:`, lessonError);
          continue;
        }

        // Insert Cards
        if (lesson.cards) {
          const cardsToInsert = lesson.cards.map((card, index) => ({
            id: `${lesson.id}-${card.id}`, // Ensure uniqueness
            lesson_id: lesson.id,
            type: card.type,
            title: card.title,
            content: card.content,
            image_key: card.imageKey || null,
            options: card.options ? JSON.stringify(card.options) : null,
            correct_answer: card.correctAnswer || null,
            tool: card.tool || null,
            tool_props: card.toolProps ? JSON.stringify(card.toolProps) : null,
            order_index: index
          }));

          const { error: cardError } = await supabase
            .from('learning_cards')
            .upsert(cardsToInsert, { onConflict: 'id' });

          if (cardError) {
            console.error(`Error inserting cards for lesson ${lesson.id}:`, cardError);
          }
        }
      }
    }
  }

  // 2. Insert Modules SECOND so they can reference the phases that now exist
  for (const [tier, mods] of Object.entries(modulesData)) {
    for (const mod of mods) {
      console.log(`Seeding Module: ${mod.id} - ${mod.title}`);
      const { error: moduleError } = await supabase
        .from('modules')
        .upsert({
          id: mod.id,
          title: mod.title,
          description: mod.description,
          tier: tier,
          phase_id: mod.phaseId,
          icon_svg: 'Globe' // Fallback icon name instead of JSX
        }, { onConflict: 'id' });

      if (moduleError) {
        console.error(`Error inserting module ${mod.id}:`, moduleError);
      }
    }
  }

  console.log('Curriculum seeded successfully!');
}

seed().catch(console.error);
