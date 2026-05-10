import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

function fixImports() {
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

  for (const file of files) {
    const fullPath = path.join(pagesDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Because we moved from src/components/views to src/pages,
    // dependencies in src/types, src/lib, src/data, src/context 
    // were accessed via '../../' but now should be '../'
    content = content.replace(/from\s+['"]\.\.\/\.\.\/(types|lib|data|context|hooks)/g, 'from \'../$1');

    // Dependencies in src/components were accessed via '../' but now should be '../components/'
    content = content.replace(/from\s+['"]\.\.\/([A-Z][a-zA-Z0-9]+|games|tools)['"]/g, 'from \'../components/$1\'');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed imports in ${file}`);
  }
}

fixImports();
