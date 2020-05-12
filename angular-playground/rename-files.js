const fs = require('fs');
const pathToFile = 'dist/angular-playground';

const filesToRename = ['main-es5.js', 'main-es2015.js'];
const appName = 'angular-playground';

for (const f of filesToRename) {
  const newName = f.replace('main', appName);
  fs.renameSync(`${pathToFile}/${f}`, `${pathToFile}/${newName}`);
  console.log(`${f} ==> ${newName}`);
  // check if there is a .map file
  if (fs.existsSync(`${pathToFile}/${f}.map`)) {
    fs.renameSync(`${pathToFile}/${f}.map`, `${pathToFile}/${newName}.map`);
    console.log(`${f}.map ==> ${newName}.map`);
  }
}
