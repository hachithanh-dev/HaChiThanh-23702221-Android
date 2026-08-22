import { IVehicle } from "./interfaces/IVehicle";

/**
 * Exercise 20: Bike class implementing IVehicle.
 */
export class Bike implements IVehicle {
  brand: string;
  speed: number;

  constructor(brand: string, speed: number = 0) {
    this.brand = brand;
    this.speed = speed;
  }

  drive(): void {
    console.log(`Riding ${this.brand} bike at ${this.speed} km/h.`);
  }
}
