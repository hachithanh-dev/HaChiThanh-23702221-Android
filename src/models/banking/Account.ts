/**
 * Exercise 10: Create a class Account with public, private and readonly fields.
 */
export class Account {
  public accountNumber: string;
  private balance: number;
  readonly createdAt: Date;

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.createdAt = new Date();
  }

  getBalance(): number {
    return this.balance;
  }
}
