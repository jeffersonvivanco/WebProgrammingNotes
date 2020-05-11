const fs = require('fs');
const pathToFile = 'dist/angular-playground';
const filesToRename = ['main-es5.js', 'main-es2015.js'];



for (let f in filesToRename) {
  fs.rename(`${pathToFile}/f`, 'dist/angular-playground/angular-playground.js', (data) => {
    console.log('renamed', data);
  });
}
