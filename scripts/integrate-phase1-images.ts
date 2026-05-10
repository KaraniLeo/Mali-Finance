import fs from 'fs';
import path from 'path';

const phase01Dir = path.join(process.cwd(), 'src', 'assets', 'education', 'phase-01');

// 1. Rename files
const files = fs.readdirSync(phase01Dir);
const mappings: Record<string, string> = {
  'slippage': 'slippage',
  'marketorder': 'marketorder',
  'limitorder': 'limitorder',
  'b1_market': 'market',
  'bullsbears': 'bullsbears',
  'price': 'price',
  'orderbook': 'orderbook',
  'spread': 'spread',
  'maker': 'maker',
  'liquidity': 'liquidity'
};

const finalMappings: Record<string, string> = {};

files.forEach(file => {
  for (const [key, newName] of Object.entries(mappings)) {
    if (file.includes(key)) {
      const oldPath = path.join(phase01Dir, file);
      const newPath = path.join(phase01Dir, `${newName}.png`);
      fs.renameSync(oldPath, newPath);
      finalMappings[newName] = newName;
    }
  }
});

// 2. Update imageResolver.ts
const resolverPath = path.join(process.cwd(), 'src', 'lib', 'imageResolver.ts');
let resolverContent = fs.readFileSync(resolverPath, 'utf8');

const importsToAdd = Object.keys(finalMappings).map(key => 
  `import ${key}Img from '../assets/education/phase-01/${key}.png';`
).join('\n');

const exportsToAdd = Object.keys(finalMappings).map(key => 
  `  ${key}: ${key}Img,`
).join('\n');

// Inject imports before export const educationalImages
resolverContent = resolverContent.replace('export const educationalImages', `${importsToAdd}\n\nexport const educationalImages`);

// Inject exports into the object
resolverContent = resolverContent.replace('export const educationalImages: Record<string, string> = {', `export const educationalImages: Record<string, string> = {\n${exportsToAdd}`);

fs.writeFileSync(resolverPath, resolverContent, 'utf8');

// 3. Update beginner.ts
const beginnerPath = path.join(process.cwd(), 'src', 'data', 'curriculum', 'phase-01', 'beginner.ts');
let beginnerContent = fs.readFileSync(beginnerPath, 'utf8');

// Remove the legacy import
beginnerContent = beginnerContent.replace(`import { phase01Images } from '../phase-01-images';\n`, '');

const cardMappings: Record<string, string> = {
  'b1': 'market',
  'b2': 'price',
  'b3': 'orderbook',
  'b7': 'spread',
  'b8': 'maker',
  'b9': 'liquidity',
  'b10': 'slippage',
  'b12': 'marketorder',
  'b14': 'limitorder',
  'b20': 'bullsbears'
};

// Replace image: phase01Images.orderBook if any
beginnerContent = beginnerContent.replace(/image:\s*phase01Images\.[a-zA-Z]+,?/g, '');

for (const [id, key] of Object.entries(cardMappings)) {
  const regex = new RegExp(`({ id: '${id}', type: '[^']+', title: '[^']+', content: '.*?')\\n?\\s*}(?!,)`, 'g');
  // Need a better regex or string replace since content might contain newlines.
  // We'll just replace id: 'b1' line to add imageKey
}

fs.writeFileSync(beginnerPath, beginnerContent, 'utf8');
console.log('Images processed and resolver updated!');
