# HaChiThanh-23702221-Android

> **30 OOP Exercises in TypeScript (Object-Oriented Programming)**

## 📚 Giới thiệu
Dự án giải quyết trọn vẹn 30 bài tập Lập trình Hướng đối tượng (OOP) bằng TypeScript theo cấu trúc module chuẩn và hiện đại.

## 🏗️ Cấu trúc thư mục
```text
├── package.json
├── tsconfig.json
├── Bao_Cao_OOP_TypeScript_30_Cau.docx    # Báo cáo Word có ảnh chụp terminal & giải thích
├── terminal_shots/                       # 30 ảnh chụp màn hình terminal sắc nét
└── src/
    ├── index.ts                          # Barrel export
    ├── main.ts                           # File demo thực thi toàn bộ 30 bài
    ├── models/
    │   ├── person/                       # Person, Student, Teacher
    │   ├── school/                       # School
    │   ├── shapes/                       # Rectangle, Shape, Square, Circle
    │   ├── animals/                      # Animal, Dog, Cat, Bird, Fish, Interfaces
    │   ├── vehicles/                     # Car, Bike, Robot, Interfaces
    │   ├── employees/                    # Employee, Manager, Developer
    │   ├── library/                      # Book, User, Library
    │   ├── commerce/                     # Product, Order
    │   ├── banking/                      # BankAccount, Account
    │   ├── payment/                      # Payment Interface, CashPayment, CardPayment
    │   └── appliances/                   # Appliance, Fan, AirConditioner
    ├── data-structures/                  # Box<T>, Repository<T>, Stack<T>
    └── utils/                            # Singleton Logger, Static MathUtil
```

## 🚀 Hướng dẫn chạy dự án

### Cài đặt và thực thi trực tiếp:
```bash
npx ts-node src/main.ts
```

### Hoặc biên dịch sang JavaScript:
```bash
npx -p typescript tsc
node dist/main.js
```
