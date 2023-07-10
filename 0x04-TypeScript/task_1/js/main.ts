interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  readonly fullTimeEmployee: boolean;
  readonly yearsOfExperience?: number;
  readonly location: string;
  [key: string]: any;
}

// Example usage:
const teacher: Teacher = {
  firstName: "Joseph",
  lastName: "Joe",
  fullTimeEmployee: true,
  yearsOfExperience: 5,
  location: "New York",
  contract: true, // Adding an additional attribute dynamically
  };
interface Directors extends Teacher {
  numberOfReports: number;
  }

const director: Directors = {
  firstName: "James",
  lastName: "Jael",
  fullTimeEmployee: true,
  yearsOfExperience: 10,
  location: "New York",
  numberOfReports: 5,
};

interface PrintTeacherFunction {
  (firstName: string, lastName: string): string;
}

const printTeacher: PrintTeacherFunction = (firstName: string, lastName: string): string => {
  const firstLetter = firstName.charAt(0);
  return `${firstLetter}. ${lastName}`;
};

// Usage example to print out
console.log(teacher);
console.log(director);
console.log(printTeacher("John", "Mary"));

interface StudentClassInterface {
  new(firstName: string,
  lastName: string): StudentClass;
}

interface StudentClass {
  workOnHomework(): string;
  displayName(): string;
}

class StudentClass implements StudentClass {
  constructor(private firstName: string, private lastName: string) {}

  workOnHomework(): string {
    return "Currently working";
  }

  displayName(): string {
    return this.firstName;
  }
}
const student = new StudentClass("Joyce", "Myra");
console.log(student.workOnHomework()); 
console.log(student.displayName());



