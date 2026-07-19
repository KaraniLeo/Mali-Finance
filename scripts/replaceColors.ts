import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const replacements = [
  // #A7C957 -> brand-primary
  { pattern: /text-\[#A7C957\]/g, replacement: 'text-brand-primary' },
  { pattern: /bg-\[#A7C957\]/g, replacement: 'bg-brand-primary' },
  { pattern: /border-\[#A7C957\]/g, replacement: 'border-brand-primary' },
  { pattern: /from-\[#A7C957\]/g, replacement: 'from-brand-primary' },
  { pattern: /to-\[#A7C957\]/g, replacement: 'to-brand-primary' },
  
  // #2D3911 -> brand-secondary or brand-dark
  { pattern: /text-\[#2D3911\]/g, replacement: 'text-brand-secondary' },
  { pattern: /bg-\[#2D3911\]/g, replacement: 'bg-brand-secondary' },
  { pattern: /border-\[#2D3911\]/g, replacement: 'border-brand-secondary' },
  { pattern: /from-\[#2D3911\]/g, replacement: 'from-brand-secondary' },
  { pattern: /to-\[#2D3911\]/g, replacement: 'to-brand-secondary' },

  // #6B8E23 -> brand-accent
  { pattern: /text-\[#6B8E23\]/g, replacement: 'text-brand-accent' },
  { pattern: /bg-\[#6B8E23\]/g, replacement: 'bg-brand-accent' },
  { pattern: /border-\[#6B8E23\]/g, replacement: 'border-brand-accent' },

  // #A3B18A -> brand-light or accent
  { pattern: /text-\[#A3B18A\]/g, replacement: 'text-brand-accent/70' },
  { pattern: /bg-\[#A3B18A\]/g, replacement: 'bg-brand-accent/20' },
  
  // Custom alpha cases like bg-[#A7C957]/10
  { pattern: /bg-\[#A7C957\]\/10/g, replacement: 'bg-brand-primary/10' },
  { pattern: /bg-\[#A7C957\]\/20/g, replacement: 'bg-brand-primary/20' },
  
  // hover states
  { pattern: /hover:bg-\[#A7C957\]/g, replacement: 'hover:bg-brand-primary' },
  { pattern: /hover:text-\[#A7C957\]/g, replacement: 'hover:text-brand-primary' },
  { pattern: /hover:bg-\[#b8da68\]/g, replacement: 'hover:bg-brand-primary/80' },
  { pattern: /hover:text-\[#6B8E23\]/g, replacement: 'hover:text-brand-accent' },
  { pattern: /hover:bg-\[#2D3911\]/g, replacement: 'hover:bg-brand-secondary' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const { pattern, replacement } of replacements) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(SRC_DIR);
console.log('Color replacement complete.');
