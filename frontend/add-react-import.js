const fs = require('fs');
const path = require('path');

function addReactImportToFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data.includes('import React from "react";')) { // Check if the import already exists
        const updatedData = `import React from "react";\n${data}`;
        fs.writeFileSync(filePath, updatedData, 'utf8');
        console.log(`Added React import to ${filePath}`);
    } else {
        console.log(`Skipped ${filePath}, import already present`);
    }
}

function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            addReactImportToFile(fullPath);
        }
    });
}

traverseDirectory('./src'); // Replace with your project directory if different
