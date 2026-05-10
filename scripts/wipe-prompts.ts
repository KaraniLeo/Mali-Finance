import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/data/curriculum');

function walk(directory: string) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);
    for (const f of files) {
        const fullPath = path.join(directory, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (f.endsWith('.ts') || f.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Remove imagePrompt (matches strings with any quotes including template literals and null)
            content = content.replace(/,\s*imagePrompt:\s*(null|`[\s\S]*?`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, '');
            content = content.replace(/imagePrompt:\s*(null|`[\s\S]*?`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"),?\s*/g, '');

            // Remove imageUrl
            content = content.replace(/,\s*imageUrl:\s*(null|`[\s\S]*?`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/g, '');
            content = content.replace(/imageUrl:\s*(null|`[\s\S]*?`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"),?\s*/g, '');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Cleaned ${fullPath}`);
            }
        }
    }
}
walk(dir);
console.log('Wipe complete.');
