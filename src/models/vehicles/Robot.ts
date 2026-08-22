import { Movable } from "./interfaces/IMovable";

/**
 * Exercise 29: Robot class implementing Movable.
 */
export class Robot implements Movable {
  name: string;

  constructor(name: string = "Optimus") {
    this.name = name;
  }

  move(): void {
    console.log(`Robot ${this.name} walks forward using bipedal robotic legs.`);
  }
}
