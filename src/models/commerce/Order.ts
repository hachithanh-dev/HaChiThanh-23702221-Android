import { Product } from "./Product";

/**
 * Exercise 26: Create a class Order with list of products.
 * Add method to calculate total price.
 */
export class Order {
  products: Product[];

  constructor(products: Product[] = []) {
    this.products = products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  calculateTotalPrice(): number {
    return this.products.reduce((total, p) => total + p.price, 0);
  }
}
