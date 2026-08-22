import { Shape } from "./Shape";

/**
 * Exercise 13: Implement Circle extending Shape.
 */
export class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
