/**
 * Exercise 13: Create an abstract class Shape with method area().
 * Exercise 25: Create a class Shape with a static method describe().
 */
export abstract class Shape {
  abstract area(): number;

  static describe(): void {
    console.log("A shape is an enclosed geometric figure defined by boundaries.");
  }
}
