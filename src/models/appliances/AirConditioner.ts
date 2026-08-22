import { Appliance } from "./Appliance";

/**
 * Exercise 24: AirConditioner implementing Appliance.
 */
export class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("The Air Conditioner is turned on and cooling the room.");
  }
}
