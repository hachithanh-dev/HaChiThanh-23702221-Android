/**
 * Exercise 6: Create a class Book with attributes title, author, year.
 */
export class Book {
  title: string;
  author: string;
  year: number;

  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  displayDetails(): void {
    console.log(`[Book] "${this.title}" by ${this.author} (${this.year})`);
  }
}
