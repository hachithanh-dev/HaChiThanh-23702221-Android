import { Employee } from "./Employee";

/**
 * Exercise 14: Developer class extending Employee with programmingLanguage and writeCode().
 */
export class Developer extends Employee {
  programmingLanguage: string;

  constructor(name: string, salary: number, programmingLanguage: string) {
    super(name, salary);
    this.programmingLanguage = programmingLanguage;
  }

  writeCode(): void {
    console.log(`${this.name} is writing high-performance code in ${this.programmingLanguage}.`);
  }
}
