import { Book } from "./Book";
import { User } from "./User";

/**
 * Exercise 15: Create a Library class that can store Book and User objects.
 * Add method to add books.
 */
export class Library {
  books: Book[] = [];
  users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
    console.log(`[Library] Added book: "${book.title}"`);
  }

  addUser(user: User): void {
    this.users.push(user);
    console.log(`[Library] Registered user: ${user.name}`);
  }

  listBooks(): void {
    console.log("[Library] Books list:", this.books.map((b) => b.title));
  }
}
