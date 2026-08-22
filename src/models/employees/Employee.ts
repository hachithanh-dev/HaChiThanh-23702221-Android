/**
 * Exercise 14: Base class Employee with name, salary.
 */
export class Employee {
  name: string;
  salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getDetails(): string {
    return `Employee: ${this.name}, Salary: $${this.salary}`;
  }
}
