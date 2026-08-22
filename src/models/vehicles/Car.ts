import { IVehicle } from "./interfaces/IVehicle";
import { Movable } from "./interfaces/IMovable";

/**
 * Exercise 3: Class Car with properties brand, model, year and showInfo().
 * Exercise 20: Implements IVehicle.
 * Exercise 29: Implements Movable.
 */
export class Car implements IVehicle, Movable {
  brand: string;
  model: string;
  year: number;
  speed: number;

  constructor(brand: string, model: string, year: number, speed: number = 0) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.speed = speed;
  }

  showInfo(): void {
    console.log(`[Car] Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
  }

  drive(): void {
    console.log(`Driving ${this.brand} ${this.model} at ${this.speed} km/h.`);
  }

  move(): void {
    console.log(`The ${this.brand} car moves forward smoothly on wheels.`);
  }
}
