# HaChiThanh-23702221-Android

> **Kho lưu trữ bài tập thực hành môn Lập trình Thiết bị Di động (TypeScript Foundation)**  
> **Sinh viên thực hiện**: Hà Chí Thanh  
> **Mã số sinh viên (MSSV)**: 23702221  
> **Repository**: [https://github.com/hachithanh-dev/HaChiThanh-23702221-Android](https://github.com/hachithanh-dev/HaChiThanh-23702221-Android)

---

## 📚 Mục lục tổng hợp bài tập

| Tuần | Chủ đề bài tập | Số lượng bài | Báo cáo Word đính kèm | Thư mục mã nguồn | Thư mục ảnh Terminal |
|:---:|---|:---:|---|---|---|
| **Tuần 1** | **OOP TypeScript** (Lập trình Hướng đối tượng) | 30 bài | [HaChiThanh_23702221.docx](./HaChiThanh_23702221.docx) | `src/models/`, `src/data-structures/` | `terminal_shots/` |
| **Tuần 2** | **Async TypeScript** (Lập trình Bất đồng bộ) | 30 bài | [HaChiThanh_23702221_Tuan2.docx](./HaChiThanh_23702221_Tuan2.docx) | `src/async/` | `terminal_shots_async/` |

---

## 🏗️ Cấu trúc thư mục dự án

```text
d:\Android\
├── package.json                          # Khai báo dependency, script chạy dự án
├── tsconfig.json                         # Cấu hình TypeScript (ES2022, CommonJS, Strict)
├── HaChiThanh_23702221.docx              # Báo cáo Tuần 1: 30 bài OOP TypeScript
├── HaChiThanh_23702221_Tuan2.docx        # Báo cáo Tuần 2: 30 bài Async TypeScript
│
├── docs/                                 # Tài liệu đề bài gốc
│   ├── 1_OOP_Exercises_TypeScript.pdf   # Đề bài Tuần 1 (OOP)
│   └── 2_Async_Exercises_TypeScript.pdf # Đề bài Tuần 2 (Async)
│
├── scripts/                              # Các script Python tự động hóa
│   └── generate_report_tuan2.py          # Sinh 30 ảnh terminal & đóng gói file Word Tuần 2
│
├── terminal_shots/                       # 30 ảnh chụp kết quả terminal Tuần 1 (OOP)
│   └── terminal_ex_1.png ... terminal_ex_30.png
│
├── terminal_shots_async/                 # 30 ảnh chụp kết quả terminal Tuần 2 (Async)
│   └── terminal_async_ex_1.png ... terminal_async_ex_30.png
│
└── src/
    ├── index.ts                          # Barrel export OOP
    ├── main.ts                           # Runner chính Tuần 1 (OOP)
    │
    ├── models/                           # [Tuần 1] Các thực thể OOP
    │   ├── person/                       # Person, Student, Teacher
    │   ├── school/                       # School
    │   ├── shapes/                       # Rectangle, Shape, Square, Circle
    │   ├── animals/                      # Animal, Dog, Cat, Bird, Fish, Interfaces
    │   ├── vehicles/                     # Car, Bike, Robot, Interfaces
    │   ├── employees/                    # Employee, Manager, Developer
    │   ├── library/                      # Book, User, Library
    │   ├── commerce/                     # Product, Order
    │   ├── banking/                      # BankAccount, Account
    │   ├── payment/                      # IPayment, CashPayment, CardPayment
    │   └── appliances/                   # Appliance, Fan, AirConditioner
    │
    ├── data-structures/                  # [Tuần 1] Generic Data Structures (Box, Repository, Stack)
    ├── utils/                            # [Tuần 1] Singleton Logger, Static MathUtil
    │
    └── async/                            # [Tuần 2] Lập trình Bất đồng bộ (Async TypeScript)
        ├── types.ts                      # Interfaces DTO (Todo, User, PostRequest, SettledStatus)
        ├── utils.ts                      # Hàm tiện ích bổ trợ (delay, simulateTask, logTimestamp)
        ├── partA_promise.ts              # Bài 1 -> 10: Promise basics, then/catch/finally, all/race, chain
        ├── partB_async_await.ts          # Bài 11 -> 20: Async/Await, try/catch, for await...of, timeout
        ├── partC_fetch_io.ts             # Bài 21 -> 30: Fetch API, filter, POST, download, retry, queue, allSettled
        └── main.ts                       # Runner trung tâm Tuần 2 (chạy toàn bộ hoặc lẻ từng câu)
```

---

## 🚀 Hướng dẫn cài đặt & Thực thi

### 1. Cài đặt môi trường
Đảm bảo đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản 18+ hoặc 20+). Sau đó mở terminal tại thư mục gốc và chạy:

```bash
npm install
```

### 2. Thực thi bài tập Tuần 1 (OOP TypeScript)
Chạy toàn bộ 30 bài tập Lập trình hướng đối tượng:
```bash
npm start
# Hoặc:
npx ts-node src/main.ts
```

### 3. Thực thi bài tập Tuần 2 (Async TypeScript)
Chạy toàn bộ 30 bài tập Lập trình bất đồng bộ:
```bash
npm run async
# Hoặc:
npx ts-node src/async/main.ts
```

Chạy riêng lẻ một câu bất kỳ của Tuần 2 (Ví dụ: Bài 6 hoặc Bài 21):
```bash
npx ts-node src/async/main.ts 6
npx ts-node src/async/main.ts 21
npx ts-node src/async/main.ts 30
```

### 4. Tự động sinh báo cáo Word & Chụp ảnh Terminal (Tuần 2)
Script Python tự động render 30 ảnh terminal mockup sắc nét và xuất file báo cáo Word:
```bash
python scripts/generate_report_tuan2.py
```

### 5. Biên dịch sang JavaScript (Build)
```bash
npm run build
```

---

## 📋 Chi tiết 30 bài tập Async TypeScript (Tuần 2)

### Phần A: Basics with Promise (Bài 1 -> 10)
- **Bài 1**: Tạo Promise trả về chuỗi `"Hello Async"` sau 2 giây.
- **Bài 2**: Hàm trả về Promise resolve với số `10` sau 1 giây.
- **Bài 3**: Hàm reject Promise với thông báo lỗi `"Something went wrong"` sau 1 giây.
- **Bài 4**: Xử lý Promise trả về số ngẫu nhiên bằng `.then()` và `.catch()`.
- **Bài 5**: Hàm `simulateTask(time)` trả về Promise resolve `"Task done"` sau `time` ms.
- **Bài 6**: Sử dụng `Promise.all()` chạy song song 3 Promise mô phỏng và in kết quả.
- **Bài 7**: Sử dụng `Promise.race()` lấy kết quả từ Promise hoàn thành sớm nhất.
- **Bài 8**: Chuỗi Promise chain: bình phương 2 $\rightarrow$ nhân đôi $\rightarrow$ cộng 5 ($= 13$).
- **Bài 9**: Promise đọc một mảng sau 1 giây và lọc các số chẵn.
- **Bài 10**: Sử dụng `.finally()` để log `"Done"` khi Promise hoàn tất (thành công hoặc thất bại).

### Phần B: Async/Await (Bài 11 -> 20)
- **Bài 11**: Chuyển đổi Bài 1 sang cú pháp `async/await`.
- **Bài 12**: Hàm async gọi `simulateTask(2000)` và in kết quả log.
- **Bài 13**: Bắt và xử lý lỗi bằng khối `try/catch` trong hàm async.
- **Bài 14**: Hàm async nhận 1 số, đợi 1 giây và trả về số đó $\times 3$.
- **Bài 15**: Gọi nhiều hàm async tuần tự (Sequential) bằng `await`.
- **Bài 16**: Gọi nhiều hàm async song song (Parallel) bằng `Promise.all()`.
- **Bài 17**: Sử dụng vòng lặp `for await...of` duyệt mảng các Promise.
- **Bài 18**: Hàm async `fetchUser(id)` mô phỏng API call trả về đối tượng `User` sau 1 giây.
- **Bài 19**: Hàm async `fetchUsers(ids: number[])` gọi `fetchUser` cho từng ID trong mảng.
- **Bài 20**: Cơ chế Timeout: nếu gọi API mất hơn 2 giây thì tự động ném ra ngoại lệ lỗi.

### Phần C: Fetch API & Simulated I/O (Bài 21 -> 30)
- **Bài 21**: Sử dụng `fetch` lấy dữ liệu từ API công khai (`https://jsonplaceholder.typicode.com/todos/1`).
- **Bài 22**: Gửi nhiều request gọi API đồng thời và in danh sách kết quả.
- **Bài 23**: Hàm async tải danh sách Todos và lọc ra các mục đã hoàn thành (`completed: true`).
- **Bài 24**: Hàm async `postData()` gửi POST request kèm JSON body lên test API.
- **Bài 25**: Hàm `downloadFile` mô phỏng quá trình tải tệp trong 3 giây với thanh tiến trình.
- **Bài 26**: Sử dụng `async/await` kết hợp `setTimeout` mô phỏng thời gian chờ 5 giây.
- **Bài 27**: Hàm `fetchWithRetry(url, retries)` tự động gửi lại yêu cầu khi API thất bại (Exponential Backoff).
- **Bài 28**: Hàm `batchProcess()` xử lý cùng lúc 5 tác vụ bất đồng bộ theo mẻ bằng `Promise.all`.
- **Bài 29**: Hàm `queueProcess()` đưa các tác vụ vào hàng đợi và thực thi tuần tự theo cơ chế FIFO.
- **Bài 30**: Dùng `async/await` + `Promise.allSettled()` gọi nhiều API và phân loại trạng thái `fulfilled`/`rejected`.
