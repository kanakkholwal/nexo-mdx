import fs from 'fs';
import path from 'path';

// Specify the directory
const directoryPath = './lib';

// Function to delete files with specified extensions
const deleteFilesRecursively = (dir) => {
    fs.readdir(dir, (err, files) => {
      if (err) throw err;
  
      files.forEach(file => {
        const filePath = path.join(dir, file);
  
        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
  
          if (stats.isDirectory()) {
            // Recurse into subdirectory
            deleteFilesRecursively(filePath);
          } else if (stats.isFile() && (file.endsWith('.d.ts') || file.endsWith('.js'))) {
            fs.unlink(filePath, err => {
              if (err) throw err;
              // console.log(`Deleted: ${filePath}`);
            });
          }
        });
      });

      console.log("Cleanup done.")
    });
  };

// Call the function
deleteFilesRecursively(directoryPath, ['.d.ts', '.js']);
