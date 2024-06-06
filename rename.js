const fs = require('fs');
const path = require('path');

function renameFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      renameFiles(filePath); // Recursively call for subdirectories
    } else if (file.endsWith('.mjs')) {
      const newPath = filePath.slice(0, -4) + '.js'; // Remove .mjs and add .js
      fs.renameSync(filePath, newPath);
      console.log(`Renamed ${filePath} to ${newPath}`);
    }
  }
}

const currentDir = process.cwd(); // Get the current working directory
renameFiles(currentDir);

console.log('Renaming completed!');