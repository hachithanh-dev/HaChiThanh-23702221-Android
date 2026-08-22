import { Flyable } from "./interfaces/IFlyable";

/**
 * Exercise 12: Class Bird implementing Flyable.
 */
export class Bird implements Flyable {
  name: string;

  constructor(name: string = "Bird") {
    this.name = name;
  }

  fly(): void {
    console.log(`${this.name} spreads its wings and flies high in the sky.`);
  }
}
