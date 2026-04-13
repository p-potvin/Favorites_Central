const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const outputDir = path.join(__dirname, 'package');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
} else {
    // Clean old zip files
    const files = fs.readdirSync(outputDir);
    for (const file of files) {
        if (file.endsWith('.zip')) {
            fs.unlinkSync(path.join(outputDir, file));
        }
    }
}

const timestamp = Date.now();
const output = fs.createWriteStream(path.join(outputDir, `vault-central_${timestamp}.zip`));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`\x1b[32mSuccess! Archive created: ${archive.pointer()} total bytes\x1b[0m`);
    console.log('\x1b[36mPath:\x1b[0m', path.join(outputDir, `vault-central_${timestamp}.zip`));
});

archive.on('error', (err) => { throw err; });

archive.pipe(output);

// Append files from dist directory
const distPath = path.join(__dirname, 'dist');
archive.directory(distPath, false);

archive.finalize();
