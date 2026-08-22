import { Student } from "../person/Student";
import { Teacher } from "../person/Teacher";

/**
 * Exercise 30: Create a class School with list of Students and Teachers.
 * Add method to display info.
 */
export class School {
  name: string;
  students: Student[] = [];
  teachers: Teacher[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  displayInfo(): void {
    console.log(`========================================`);
    console.log(`🏫 School: ${this.name}`);
    console.log(`--- Teachers (${this.teachers.length}) ---`);
    this.teachers.forEach((t) => t.introduce());
    console.log(`--- Students (${this.students.length}) ---`);
    this.students.forEach((s) => s.displayAllInfo());
    console.log(`========================================`);
  }
}
