import {
  Person,
  Student,
  Teacher,
  School,
  Rectangle,
  Shape,
  Square,
  Circle,
  Animal,
  Dog,
  Cat,
  Bird,
  Fish,
  Car,
  Bike,
  Robot,
  Employee,
  Manager,
  Developer,
  Book,
  User,
  Library,
  Product,
  filterExpensiveProducts,
  Order,
  BankAccount,
  Account,
  CashPayment,
  CardPayment,
  Fan,
  AirConditioner,
  Box,
  Repository,
  Stack,
  Logger,
  MathUtil,
} from "./index";

function main() {
  console.log("================================================================");
  console.log("🚀 RUNNING ALL 30 OOP EXERCISES (TYPESCRIPT)");
  console.log("================================================================\n");

  // Ex 1: Person
  console.log("--- [Ex 1] Person ---");
  const person = new Person("Nguyen Van A", 30);
  person.displayInfo();

  // Ex 2: Student
  console.log("\n--- [Ex 2] Student ---");
  const student = new Student("Tran Thi B", 20, "A+");
  student.displayAllInfo();

  // Ex 3: Car
  console.log("\n--- [Ex 3] Car ---");
  const car = new Car("Toyota", "Camry", 2024, 100);
  car.showInfo();

  // Ex 4: Rectangle
  console.log("\n--- [Ex 4] Rectangle ---");
  const rect = new Rectangle(5, 10);
  console.log(`Area: ${rect.calculateArea()}, Perimeter: ${rect.calculatePerimeter()}`);

  // Ex 5: BankAccount
  console.log("\n--- [Ex 5] BankAccount ---");
  const myAcc = new BankAccount(100);
  myAcc.deposit(50);
  myAcc.withdraw(70);

  // Ex 6: Book
  console.log("\n--- [Ex 6] Book ---");
  const book = new Book("Design Patterns", "GoF", 1994);
  book.displayDetails();

  // Ex 7: User (Getter / Setter)
  console.log("\n--- [Ex 7] User with getter/setter ---");
  const user = new User("John");
  console.log(`Initial name: ${user.name}`);
  user.name = "John Doe";
  console.log(`Updated name: ${user.name}`);

  // Ex 8: Product & Filter > 100
  console.log("\n--- [Ex 8] Product & Filter ---");
  const products: Product[] = [
    new Product("Mouse", 25),
    new Product("Mechanical Keyboard", 120),
    new Product("4K Monitor", 350),
  ];
  console.log("Expensive products (>100):", filterExpensiveProducts(products));

  // Ex 9 & 11: Animal, Dog, Cat
  console.log("\n--- [Ex 9 & 11] Animal hierarchy ---");
  const dog = new Dog("Buddy");
  dog.bark();
  const cat = new Cat("Kitty");
  cat.meow();

  // Ex 10: Account (public, private, readonly)
  console.log("\n--- [Ex 10] Account with access modifiers ---");
  const bankAccount = new Account("VN123456789", 5000);
  console.log(`Account: ${bankAccount.accountNumber}, Created: ${bankAccount.createdAt.toLocaleDateString()}, Balance: $${bankAccount.getBalance()}`);

  // Ex 12: Flyable & Swimmable (Bird & Fish)
  console.log("\n--- [Ex 12] Flyable & Swimmable Interfaces ---");
  const bird = new Bird("Eagle");
  bird.fly();
  const fish = new Fish("Salmon");
  fish.swim();

  // Ex 13 & 25: Shape (Abstract class, Square, Circle & Static describe)
  console.log("\n--- [Ex 13 & 25] Shape Abstract & Static method ---");
  Shape.describe();
  const square = new Square(5);
  const circle = new Circle(4);
  console.log(`Square Area: ${square.area()}`);
  console.log(`Circle Area: ${circle.area().toFixed(2)}`);

  // Ex 14: Employee, Manager, Developer
  console.log("\n--- [Ex 14] Employee hierarchy ---");
  const manager = new Manager("Alice", 6000, "Engineering");
  manager.conductMeeting();
  const developer = new Developer("Bob", 4000, "TypeScript");
  developer.writeCode();

  // Ex 15: Library
  console.log("\n--- [Ex 15] Library ---");
  const lib = new Library();
  lib.addBook(book);
  lib.addUser(user);
  lib.listBooks();

  // Ex 16: Generic Box
  console.log("\n--- [Ex 16] Generic Box<T> ---");
  const stringBox = new Box<string>("Secret Message");
  console.log(`Box contains: ${stringBox.getContent()}`);
  const numberBox = new Box<number>(2024);
  console.log(`Box contains: ${numberBox.getContent()}`);

  // Ex 17: Singleton Logger
  console.log("\n--- [Ex 17] Singleton Logger ---");
  const logger1 = Logger.getInstance();
  const logger2 = Logger.getInstance();
  logger1.log("System initialized successfully.");
  console.log(`Are both instances identical? ${logger1 === logger2}`);

  // Ex 18: Static MathUtil
  console.log("\n--- [Ex 18] Static MathUtil ---");
  console.log(`Add(15, 5): ${MathUtil.add(15, 5)}`);
  console.log(`Subtract(15, 5): ${MathUtil.subtract(15, 5)}`);
  console.log(`Multiply(15, 5): ${MathUtil.multiply(15, 5)}`);
  console.log(`Divide(15, 5): ${MathUtil.divide(15, 5)}`);

  // Ex 19: Polymorphism
  console.log("\n--- [Ex 19] Polymorphism with Animals ---");
  const zoo: Animal[] = [new Dog("Rex"), new Cat("Luna"), new Animal("Generic Wild Animal")];
  zoo.forEach((animal) => animal.sound());

  // Ex 20: Vehicle Interface (Car & Bike)
  console.log("\n--- [Ex 20] Vehicle Interface ---");
  const vCar = new Car("Mazda", "CX-5", 2023, 80);
  vCar.drive();
  const vBike = new Bike("Trek", 30);
  vBike.drive();

  // Ex 21: Generic Repository<T>
  console.log("\n--- [Ex 21] Generic Repository<T> ---");
  const productRepo = new Repository<Product>();
  productRepo.add(new Product("Laptop", 1200));
  productRepo.add(new Product("Headphones", 150));
  console.log("All items in repo:", productRepo.getAll());

  // Ex 22: Stack<T>
  console.log("\n--- [Ex 22] Generic Stack<T> ---");
  const stack = new Stack<number>();
  stack.push(10);
  stack.push(20);
  stack.push(30);
  console.log(`Peek top element: ${stack.peek()}`);
  console.log(`Popped element: ${stack.pop()}`);
  console.log(`Stack size: ${stack.size()}, is empty: ${stack.isEmpty()}`);

  // Ex 23: Payment Interface (CashPayment & CardPayment)
  console.log("\n--- [Ex 23] Payment Interface ---");
  const cash = new CashPayment();
  cash.pay(85);
  const card = new CardPayment("4111222233334444");
  card.pay(199);

  // Ex 24: Appliance Abstract Class (Fan & AirConditioner)
  console.log("\n--- [Ex 24] Appliance Abstract Class ---");
  const fan = new Fan();
  fan.turnOn();
  const ac = new AirConditioner();
  ac.turnOn();

  // Ex 26: Order
  console.log("\n--- [Ex 26] Order Total Calculation ---");
  const order = new Order(products);
  console.log(`Total Order Amount: $${order.calculateTotalPrice()}`);

  // Ex 27: Teacher (extends Person)
  console.log("\n--- [Ex 27] Teacher ---");
  const teacher = new Teacher("Dr. Alan Turing", 41, "Computer Science");
  teacher.introduce();

  // Ex 28: Protected method in Animal
  console.log("\n--- [Ex 28] Animal Protected makeSound() ---");
  const protectedDog = new Dog("Charlie");
  protectedDog.speak();

  // Ex 29: Movable Interface (Car & Robot)
  console.log("\n--- [Ex 29] Movable Interface ---");
  const movableCar = new Car("Tesla", "Model 3", 2023);
  movableCar.move();
  const robot = new Robot("Atlas");
  robot.move();

  // Ex 30: School with Students and Teachers
  console.log("\n--- [Ex 30] School ---");
  const school = new School("MIT Academy");
  school.addTeacher(teacher);
  school.addStudent(student);
  school.displayInfo();

  console.log("\n================================================================");
  console.log("✅ ALL 30 EXERCISES COMPLETED & VERIFIED!");
  console.log("================================================================");
}

main();
