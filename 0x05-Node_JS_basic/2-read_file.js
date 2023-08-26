// Import the 'fs' module for file system operations
const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = (dataPath) => {
  // Check if the data file exists
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }

  // Check if the data file is indeed a file (not a directory, for example)
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read the contents of the CSV file, split it into lines, and remove leading/trailing whitespace
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');

  // Create an empty object to store student groups
  const studentGroups = {};

  // Extract the field names (column headers) from the first line of the CSV
  const dbFieldNames = fileLines[0].split(',');

  // Remove the last field (assuming it's not a student property, but a group identifier)
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  // Process each line in the CSV file (excluding the header)
  for (const line of fileLines.slice(1)) {
    // Split the line into individual values
    const studentRecord = line.split(',');

    // Remove the last field (which is assumed to be the group identifier)
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);

    // Get the group identifier (the last field)
    const field = studentRecord[studentRecord.length - 1];

    // Create an empty array for the group if it doesn't exist in studentGroups
    if (!Object.keys(studentGroups).includes(field)) {
      studentGroups[field] = [];
    }

    // Map property names to values and create an object for each student
    const studentEntries = studentPropNames
      .map((propName, idx) => [propName, studentPropValues[idx]]);

    // Add the student object to the corresponding group
    studentGroups[field].push(Object.fromEntries(studentEntries));
  }

  // Calculate the total number of students across all groups
  const totalStudents = Object
    .values(studentGroups)
    .reduce((pre, cur) => (pre || []).length + cur.length);

  // Log the total number of students
  console.log(`Number of students: ${totalStudents}`);

  // Iterate through student groups and log the number of students in each group
  for (const [field, group] of Object.entries(studentGroups)) {
    // Extract student first names and create a comma-separated list
    const studentNames = group.map((student) => student.firstname).join(', ');

    // Log the number of students in the group and their names
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

// Export the countStudents function for use in other modules
module.exports = countStudents;
