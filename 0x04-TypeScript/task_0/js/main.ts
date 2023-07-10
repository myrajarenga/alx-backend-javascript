// Define the Student interface
interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

// Create two students
const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 20,
  location: "New York",
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  location: "London",
};

// Create an array of students
const studentsList: Student[] = [student1, student2];

// Get the table element by its ID
const table = document.getElementById("students-table");

// Iterate over the students array and append a new row for each student
studentsList.forEach((student) => {
  // Create a new row element
  const row = document.createElement("tr");

  // Create table cells for the student's first name and location
  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = student.firstName;

  const locationCell = document.createElement("td");
  locationCell.textContent = student.location;

  // Append the cells to the row
  row.appendChild(firstNameCell);
  row.appendChild(locationCell);

  // Append the row to the table
  table.appendChild(row);
});
