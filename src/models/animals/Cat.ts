import { Animal } from "./Animal";

/**
 * Exercise 11: Cat with method meow().
 * Exercise 19/28: Overriding makeSound() / polymorphism.
 */
export class Cat extends Animal {
  meow(): void {
    console.log(`${this.name} says: Meow! Meow!`);
  }

  protected override makeSound(): void {
    this.meow();
  }
}
