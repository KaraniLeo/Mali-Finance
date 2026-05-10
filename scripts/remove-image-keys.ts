import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/data/curriculum');
const skipFile = path.join(dir, 'phase-01', 'beginner.ts');

function walk(directory: string) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);
    for (const f of files) {
        const fullPath = path.join(directory, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (f.endsWith('.ts') || f.endsWith('.json')) {
            // Skip phase-01 beginner.ts
            if (path.normalize(fullPath) === path.normalize(skipFile)) {
                console.log(`Skipping ${fullPath}`);
                continue;
            }

            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Remove imageKey and legacy image field
            content = content.replace(/,\s*imageKey:\s*(null|`[\s\S]*?`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, '');
            content = content.replace(/imageKey:\s*(null|`[\s\S]*?`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"),?\s*/g, '');

            content = content.replace(/,\s*image:\s*([a-zA-Z0-9_.]+)/g, '');
            content = content.replace(/image:\s*([a-zA-Z0-9_.]+),?\s*/g, '');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Removed imageKeys from ${fullPath}`);
            }
        }
    }
}
walk(dir);
console.log('ImageKey removal complete.');
