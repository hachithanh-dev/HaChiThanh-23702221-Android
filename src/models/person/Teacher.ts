import { Person } from "./Person";

/**
 * Exercise 27: Create a class Teacher that extends Person.
 * Add subject attribute and introduce method.
 */
export class Teacher extends Person {
  subject: string;

  constructor(name: string, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }

  introduce(): void {
    console.log(`Hello, my name is ${this.name}, I am ${this.age} years old, and I teach ${this.subject}.`);
  }
}
