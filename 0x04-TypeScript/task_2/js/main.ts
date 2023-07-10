interface Employee {
  workFromHome(): string;
  getCoffeeBreak(): string;
}

interface Director extends Employee {
  workDirectorTasks(): string;
}

interface Teacher extends Employee {
  workTeacherTasks(): string;
}

class DirectorClass implements Director {
  workFromHome(): string {
    return 'Working from home';
  }

  getCoffeeBreak(): string {
    return 'Getting a coffee break';
  }

  workDirectorTasks(): string {
    return 'Doing director tasks';
  }
}

class TeacherClass implements Teacher {
  workFromHome(): string {
    return 'Cannot work from home';
  }

  getCoffeeBreak(): string {
    return 'Cannot have a coffee break';
  }

  workTeacherTasks(): string {
    return 'Doing teacher tasks';
  }
}

function createEmployee(salary: number): Director | Teacher {
  if (salary < 500) {
    return new TeacherClass();
  } else {
    return new DirectorClass();
  }
}

function isDirector(employee: Director | Teacher): employee is Director {
  return (employee as Director).workDirectorTasks !== undefined;
}

function executeWork(employee: Director | Teacher) {
  if (isDirector(employee)) {
    console.log(employee.workDirectorTasks());
  } else {
    console.log(employee.workTeacherTasks());
  }
}

type Subjects = 'Math' | 'History';

function teachClass(todayClass: Subjects): string {
  if (todayClass === 'Math') {
    return 'Teaching Math';
  } else if (todayClass === 'History') {
    return 'Teaching History';
  }
}
