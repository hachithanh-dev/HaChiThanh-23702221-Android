import { Person } from "./Person";

/**
 * Exercise 2: Write a class Student extending Person with an additional attribute grade.
 * Add a method to display all info.
 */
export class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  displayAllInfo(): void {
    console.log(`[Student] Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}
