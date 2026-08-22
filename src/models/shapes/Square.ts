import { Shape } from "./Shape";

/**
 * Exercise 13: Implement Square extending Shape.
 */
export class Square extends Shape {
  side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}
