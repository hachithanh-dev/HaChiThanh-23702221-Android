import { Appliance } from "./Appliance";

/**
 * Exercise 24: Fan implementing Appliance.
 */
export class Fan extends Appliance {
  turnOn(): void {
    console.log("The Fan is turned on and spinning at high speed.");
  }
}
