import fs from 'fs';
import path from 'path';

const curriculumDir = path.join(process.cwd(), 'src/data/curriculum');

function fixFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');

  const regex = /, imagePrompt: (null|'(?:[^'\\]|\\.)*')(, imageUrl: '[^']*')?/g;
  
  let newContent = content.replace(regex, '');
  
  if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fixed ${filePath}`);
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
      fixFile(fullPath);
    }
  }
}

walkDir(curriculumDir);
