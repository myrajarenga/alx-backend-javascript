export default function createReportObject(employeesList) {
  const employeesObject = {
    allEmployees: employeesList,
    getNumberOfDepartments() {
      return Object.keys(this.allEmployees).length;
    },
  };
  return employeesObject;
}
