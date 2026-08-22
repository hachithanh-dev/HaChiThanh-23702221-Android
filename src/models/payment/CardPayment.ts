import { Payment } from "./interfaces/IPayment";

/**
 * Exercise 23: CardPayment implementing Payment interface.
 */
export class CardPayment implements Payment {
  cardNumber: string;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }

  pay(amount: number): void {
    const last4Digits = this.cardNumber.slice(-4);
    console.log(`[Payment] Paid $${amount} via Card ending in ****${last4Digits}.`);
  }
}
