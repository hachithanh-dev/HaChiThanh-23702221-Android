/**
 * Exercise 8: Create a Product class with name, price.
 * Function to filter products with price > 100.
 */
export class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

export function filterExpensiveProducts(products: Product[], minPrice: number = 100): Product[] {
  return products.filter((product) => product.price > minPrice);
}
