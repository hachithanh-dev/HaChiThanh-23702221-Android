/**
 * Exercise 16: Create a generic class Box that can store any type of value.
 */
export class Box<T> {
  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }

  setContent(newContent: T): void {
    this.content = newContent;
  }
}
