import { Animal } from "./Animal";

/**
 * Exercise 11: Dog with method bark().
 * Exercise 19/28: Overriding makeSound() / polymorphism.
 */
export class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says: Woof! Woof!`);
  }

  protected override makeSound(): void {
    this.bark();
  }
}
