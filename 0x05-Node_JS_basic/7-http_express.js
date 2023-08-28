// Import the 'express' module to create a web server
const express = require('express');
// Import the 'fs' module for file system operations
const fs = require('fs');

// Create an express app
const app = express();
// Define the port for the server
const PORT = 1245;
// Get the database file path from command-line arguments or set it to an empty string
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @returns {Promise<String>} A Promise that resolves to a report with student information.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        // Create an array to store parts of the report
        const reportParts = [];
        
        // Split the file content into lines and process each line
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          
          if (!studentGroups[field]) {
            studentGroups[field] = [];
          }
          
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        // Calculate the total number of students and add it to the report
        const totalStudents = Object.values(studentGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);

        // Add information about each student group to the report
        for (const [field, group] of Object.entries(studentGroups)) {
          const studentNames = group.map((student) => student.firstname).join(', ');
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            studentNames,
          ].join(' '));
        }
        
        // Resolve the Promise with the complete report
        resolve(reportParts.join('\n'));
      }
    });
  }
});

// Define a route for the root URL
app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

// Define a route for the '/students' URL
app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  // Call the countStudents function to get the student report
  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.send(responseText);
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.send(responseText);
    });
});

// Start the express app and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

// Export the 'app' object for use in other modules
module.exports = app;
