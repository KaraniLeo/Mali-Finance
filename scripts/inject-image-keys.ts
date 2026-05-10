import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/data/curriculum');

const rules = [
    { key: 'candlestick', keywords: ["candle", "wick", "open", "close", "body"] },
    { key: 'supportResistance', keywords: ["support", "resistance", "floor", "ceiling", "rebound"] },
    { key: 'trendline', keywords: ["trend", "uptrend", "downtrend", "direction", "slope"] },
    { key: 'budgeting', keywords: ["budget", "expenses", "income", "savings", "allocation"] },
    { key: 'riskManagement', keywords: ["risk", "stop loss", "leverage", "exposure", "position size"] },
];

function walk(directory: string) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);
    for (const f of files) {
        const fullPath = path.join(directory, f);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (f.endsWith('.ts') && !f.includes('index.ts') && !f.includes('images.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Regex to match the LearningCard object without imageUrl/Prompt
            // Pattern matches id, type, title, content
            const cardRegex = /id:\s*'([^']+)',\s*type:\s*'([^']+)',\s*title:\s*'([^']+)',\s*content:\s*(`|'|")([\s\S]*?)\4/g;

            content = content.replace(cardRegex, (match, id, type, title, quote, cardContent) => {
                // Determine if we should inject an imageKey
                let matchedKey: string | null = null;
                const searchString = (title + ' ' + cardContent).toLowerCase();

                for (const rule of rules) {
                    if (rule.keywords.some(kw => searchString.includes(kw.toLowerCase()))) {
                        matchedKey = rule.key;
                        break;
                    }
                }

                if (matchedKey) {
                    // Inject the key just after the content
                    modified = true;
                    return `${match}, imageKey: '${matchedKey}'`;
                }

                return match;
            });

            if (modified) {
                // Deduplicate imageKey just in case
                content = content.replace(/,\s*imageKey:\s*'[^']+',\s*imageKey:\s*('[^']+')/g, ", imageKey: $1");
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Injected keys into ${fullPath}`);
            }
        }
    }
}

walk(dir);
console.log('Injection complete.');
