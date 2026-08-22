import { Payment } from "./interfaces/IPayment";

/**
 * Exercise 23: CashPayment implementing Payment interface.
 */
export class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`[Payment] Paid $${amount} in Cash.`);
  }
}
