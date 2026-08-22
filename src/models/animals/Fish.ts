import { Swimmable } from "./interfaces/ISwimmable";

/**
 * Exercise 12: Class Fish implementing Swimmable.
 */
export class Fish implements Swimmable {
  name: string;

  constructor(name: string = "Fish") {
    this.name = name;
  }

  swim(): void {
    console.log(`${this.name} swims swiftly in the water.`);
  }
}
