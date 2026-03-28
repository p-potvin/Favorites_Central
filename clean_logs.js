const fs = require('fs');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove lines that have console.log or console.warn containing [VaultAuth]
    const lines = content.split('\n');
    const newLines = lines.filter(line => !line.match(/console\.(log|warn)\(.*\[VaultAuth\]/));
    
    let res = newLines.join('\n');
    
    fs.writeFileSync(filePath, res);
}

cleanFile('src/scripts/content.ts');
cleanFile('background/scripts/background.ts');
