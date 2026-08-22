/**
 * Exercise 4: Create a class Rectangle with width and height.
 * Write a method to calculate area and perimeter.
 */
export class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}
