const fs = require('fs');
const path = require('path');

function getFileContents(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function splitIntoCodeBlocks(content) {
    // This can be customized to split into lines or specific code blocks.
    return content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}

function findRepeatedBlocks(dir) {
    const codeMap = new Map();
    const repeatedBlocks = [];

    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            repeatedBlocks.push(...findRepeatedBlocks(fullPath));
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            const content = getFileContents(fullPath);
            const codeBlocks = splitIntoCodeBlocks(content);

            codeBlocks.forEach(block => {
                if (codeMap.has(block)) {
                    codeMap.set(block, [...codeMap.get(block), fullPath]);
                } else {
                    codeMap.set(block, [fullPath]);
                }
            });
        }
    });

    for (let [block, files] of codeMap) {
        if (files.length > 1) {
            repeatedBlocks.push({ block, files });
        }
    }

    return repeatedBlocks;
}

const repeatedBlocks = findRepeatedBlocks('./src'); // Replace with your project directory
if (repeatedBlocks.length > 0) {
    repeatedBlocks.forEach(({ block, files }) => {
        console.log(`Repeated code:\n${block}\nFound in: ${files.join(', ')}\n`);
    });
} else {
    console.log('No repeated code found.');
}
