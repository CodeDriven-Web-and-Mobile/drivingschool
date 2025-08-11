const fs = require('fs');
const path = require('path');

// File paths
const populationCsvPath = path.join(__dirname, 'src', 'data', 'Population.csv');
const populationDataTsPath = path.join(__dirname, 'src', 'data', 'populationData.ts');
const newPopulationDataTsPath = path.join(__dirname, 'src', 'data', 'populationData_new.ts');

// Read the CSV data
const csvData = fs.readFileSync(populationCsvPath, 'utf8');

// Read the current populationData.ts file
const currentTsFile = fs.readFileSync(populationDataTsPath, 'utf8');

// Extract the header (everything before the rawPopulationData declaration)
const headerMatch = currentTsFile.match(/([\s\S]*?const rawPopulationData = `)/);
const header = headerMatch ? headerMatch[1] : '';

// Extract the footer (everything after the closing backtick of rawPopulationData)
const footerMatch = currentTsFile.match(/`;\s*([\s\S]*)/);
const footer = footerMatch ? footerMatch[1] : '';

// Create the new file content
const newFileContent = header + csvData + '`;\n' + footer;

// Write the new file
fs.writeFileSync(newPopulationDataTsPath, newFileContent, 'utf8');

console.log('Successfully created new population data file at:', newPopulationDataTsPath);
console.log('Please review and rename it to replace the original file.');
