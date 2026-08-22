import { IAnimal } from "./interfaces/IAnimal";

/**
 * Exercise 11: Create a base class Animal.
 * Exercise 19: Demonstrate method overriding using polymorphism.
 * Exercise 28: Create a class Animal with protected method makeSound().
 */
export class Animal implements IAnimal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Public method complying with IAnimal interface
  sound(): void {
    this.makeSound();
  }

  // Protected method that subclasses can override
  protected makeSound(): void {
    console.log(`${this.name} makes a generic sound.`);
  }

  // Method to trigger sound execution
  speak(): void {
    this.makeSound();
  }
}
