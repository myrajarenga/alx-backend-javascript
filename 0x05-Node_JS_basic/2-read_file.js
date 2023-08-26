
const fs = require('fs');

// Counts the students in a CSV data file.
 
const countStudents = (dataPath) => {
  //check if the file exits
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  // chec if the dat is indeed afile not a directory
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  //read contents of the csv file, split it into lines and remove leading/ trailing slashes
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  // create an empty object to stor student groups
  const studentGroups = {};
  //extract the field names (column headers) from the first line of the CSV
  const dbFieldNames = fileLines[0].split(',');
  // remove last field (assuming it's not a student property, but a group identifier)
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);
 //Process each line in the CSV file (excluding the header)
  for (const line of fileLines.slice(1)) {
    //split the line into indovidaul values
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
  //Log the total number of studens
  console.log(`Number of students: ${totalStudents}`);
  // Iterate through student groups and log the number of students in each group
  for (const [field, group] of Object.entries(studentGroups)) {
     // Extract student first names and create a comma-separated list
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

// Export the countStudents function for use in other modules
module.exports = countStudents;
