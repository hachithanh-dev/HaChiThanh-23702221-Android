import { Employee } from "./Employee";

/**
 * Exercise 14: Manager class extending Employee with department and conductMeeting().
 */
export class Manager extends Employee {
  department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  conductMeeting(): void {
    console.log(`${this.name} is managing the ${this.department} department and leading a team meeting.`);
  }
}
