const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

function processFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    if (filePath.includes('currency.ts')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Simple heuristic: if we replace something, make sure formatCurrency is imported
    let changed = false;

    // Replace {amount} KES with {formatCurrency(amount)}
    const regex1 = /\{([^}]+)\}\s*KES/g;
    content = content.replace(regex1, (match, p1) => {
        // If p1 already has toLocaleString, strip it
        let expr = p1.replace(/\.toLocaleString\([^)]*\)/g, '');
        changed = true;
        return `{formatCurrency(${expr})}`;
    });

    // Replace \`${amount} KES\` with \`${formatCurrency(amount)}\`
    const regex2 = /\$\{([^}]+)\}\s*KES/g;
    content = content.replace(regex2, (match, p1) => {
        let expr = p1.replace(/\.toLocaleString\([^)]*\)/g, '');
        changed = true;
        return `\${formatCurrency(${expr})}`;
    });
    
    // Replace hardcoded "500 KES", "1000 KES"
    const regex3 = /\b(\d+)\s*KES/g;
    content = content.replace(regex3, (match, p1) => {
        changed = true;
        return `{formatCurrency(${p1})}`;
    });

    if (changed) {
        // We need to inject the import
        if (!content.includes('formatCurrency')) {
            // Find relative path to src/lib/currency
            const absoluteSrc = path.join(__dirname, 'src');
            const fileDir = path.dirname(filePath);
            let rel = path.relative(fileDir, path.join(absoluteSrc, 'lib', 'currency'));
            rel = rel.replace(/\\/g, '/');
            if (!rel.startsWith('.')) rel = './' + rel;
            
            // prepend import
            content = `import { formatCurrency } from '${rel}';\n` + content;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

walkSync(path.join(__dirname, 'src'), processFile);
