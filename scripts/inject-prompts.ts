import fs from 'fs';
import path from 'path';

const curriculumDir = path.join(process.cwd(), 'src/data/curriculum');

const templates = {
  concept: "Schematic diagram illustrating the concept of {title}, {content}, clean dark theme, educational illustration",
  insight: "Visual metaphor showing {title}, {content}, trading context, clean dark aesthetic",
  example: "UI mockup or trading chart demonstrating {title}, {content}, dark mode",
  warning: "Warning or alert graphic illustrating the danger of {title}, {content}, dark educational UI",
  exercise: null,
  dynamic: null
};

// Hardcoded images for phase 1 beginner
const hardcodedImages: Record<string, string> = {
  'b1': '/images/phase-01/p1_b1_market_1778006472359.png',
  'b2': '/images/phase-01/p1_b2_price_1778006727420.png',
  'b3': '/images/phase-01/p1_b3_orderbook_1778006903677.png',
  'b7': '/images/phase-01/p1_b7_spread_1778008164918.png',
  'b8': '/images/phase-01/p1_b8_maker_1778007757467.png'
};

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the first part of the card object up to the content field
  const cardRegex = /id:\s*'([^']+)',\s*type:\s*'([^']+)',\s*title:\s*'([^']+)',\s*content:\s*(`|'|")([\s\S]*?)\4/g;
  
  let modified = false;

  const newContent = content.replace(cardRegex, (match, id, type, title, quote, cardContent) => {
    // If it already has imagePrompt or imageUrl in the match string, we should probably be careful,
    // but our regex stops exactly after the content string ends, so we can just append safely.
    
    // Check if we already injected in a previous run to avoid duplicates
    // Wait, replace just replaces the matched portion. 
    // If we run this twice, it will just append again if we're not careful.
    // Let's just do it carefully.
    
    let prompt = templates[type as keyof typeof templates];
    let replacement = match;
    
    if (prompt !== undefined) {
      if (prompt !== null) {
          // clean content for prompt
          let shortContent = cardContent.replace(/\\n/g, ' ').replace(/\n/g, ' ').substring(0, 80);
          let finalPrompt = prompt.replace('{title}', title).replace('{content}', shortContent);
          // escape single quotes
          finalPrompt = finalPrompt.replace(/'/g, "\\'");
          replacement += `, imagePrompt: '${finalPrompt}'`;
      } else {
          replacement += `, imagePrompt: null`;
      }
      modified = true;
    }
    
    // Only apply hardcoded images if this is beginner.ts from phase-01
    // And if it matches the specific IDs
    if (hardcodedImages[id] && filePath.includes('phase-01') && filePath.includes('beginner.ts')) {
        replacement += `, imageUrl: '${hardcodedImages[id]}'`
    }
    
    return replacement;
  });

  if (modified) {
    // Basic deduplication if the script was run multiple times
    const deduplicated = newContent.replace(/, imagePrompt: '[^']*', imagePrompt: /g, ", imagePrompt: ");
    fs.writeFileSync(filePath, deduplicated, 'utf8');
    console.log(`Processed ${filePath}`);
  }
}

function walkDir(dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') && !fullPath.includes('index.ts') && !fullPath.includes('images.ts')) {
      // Check if file already has imagePrompt to avoid double-processing
      const content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('imagePrompt:')) {
        processFile(fullPath);
      } else {
        console.log(`Skipping ${fullPath} (already processed)`);
      }
    }
  }
}

walkDir(curriculumDir);
console.log('Done injecting prompts!');
