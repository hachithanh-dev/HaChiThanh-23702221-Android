import { User } from "./types";
import { delay, simulateTask } from "./utils";
import { ex1_createHelloAsyncPromise, ex3_rejectWithError } from "./partA_promise";

/**
 * ============================================================================
 * PHẦN B: ASYNC / AWAIT (BÀI 11 -> BÀI 20)
 * ============================================================================
 */

// --- BÀI 11 ---
// Đề bài: Convert Exercise 1 into async/await.
export async function ex11_getHelloAsyncAwait(): Promise<string> {
  const result = await ex1_createHelloAsyncPromise();
  console.log(`[Bài 11] Kết quả nhận được từ async/await: ${result}`);
  return result;
}

// --- BÀI 12 ---
// Đề bài: Write an async function that calls simulateTask(2000) and logs the result.
export async function ex12_callSimulateTask(): Promise<void> {
  console.log("[Bài 12] Đang bắt đầu gọi simulateTask(2000)...");
  const result = await simulateTask(2000, "Tác vụ mẫu 2000ms");
  console.log(`[Bài 12] Kết quả log: ${result}`);
}

// --- BÀI 13 ---
// Đề bài: Handle errors using try/catch with async/await.
export async function ex13_handleErrorWithTryCatch(): Promise<void> {
  try {
    console.log("[Bài 13] Đang gọi hàm có khả năng ném ra lỗi...");
    await ex3_rejectWithError();
  } catch (error) {
    if (error instanceof Error) {
      console.log(`[Bài 13] Đã bắt được lỗi thành công qua try/catch: ${error.message}`);
    } else {
      console.log(`[Bài 13] Bắt được lỗi không xác định: ${String(error)}`);
    }
  }
}

// --- BÀI 14 ---
// Đề bài: Write an async function that takes a number, waits 1 second, and returns the number * 3.
export async function ex14_multiplyByThree(num: number): Promise<number> {
  await delay(1000);
  const result = num * 3;
  console.log(`[Bài 14] Đầu vào: ${num} -> Đợi 1s -> Kết quả (num * 3): ${result}`);
  return result;
}

// --- BÀI 15 ---
// Đề bài: Call multiple async functions sequentially using await.
export async function ex15_callSequentially(): Promise<void> {
  console.log("[Bài 15] Bắt đầu chuỗi gọi tuần tự các hàm async (Sequential):");
  const startTime = Date.now();

  const step1 = await simulateTask(600, "Bước 1 - Khởi tạo môi trường");
  console.log(`  > ${step1} (tại +${Date.now() - startTime}ms)`);

  const step2 = await simulateTask(800, "Bước 2 - Xử lý dữ liệu");
  console.log(`  > ${step2} (tại +${Date.now() - startTime}ms)`);

  const step3 = await simulateTask(500, "Bước 3 - Xuất báo cáo");
  console.log(`  > ${step3} (tại +${Date.now() - startTime}ms)`);

  console.log(`[Bài 15] Toàn bộ 3 bước tuần tự hoàn tất sau: ${Date.now() - startTime}ms`);
}

// --- BÀI 16 ---
// Đề bài: Call multiple async functions in parallel using Promise.all().
export async function ex16_callInParallel(): Promise<string[]> {
  console.log("[Bài 16] Bắt đầu gọi các hàm async song song (Parallel):");
  const startTime = Date.now();

  const p1 = simulateTask(1000, "Tải cấu hình");
  const p2 = simulateTask(1000, "Kết nối Cơ sở dữ liệu");
  const p3 = simulateTask(1000, "Đồng bộ bộ nhớ đệm");

  const results = await Promise.all([p1, p2, p3]);
  const totalTime = Date.now() - startTime;

  console.log(`[Bài 16] Hoàn tất song song 3 tác vụ trong ${totalTime}ms (~1000ms):`);
  results.forEach((res) => console.log(`  ✓ ${res}`));

  return results;
}

// --- BÀI 17 ---
// Đề bài: Use for await...of to iterate over an array of Promises.
export async function ex17_forAwaitOf(): Promise<void> {
  const promises: Promise<string>[] = [
    delay(300).then(() => "Mục 1 (sau 300ms)"),
    delay(500).then(() => "Mục 2 (sau 500ms)"),
    delay(400).then(() => "Mục 3 (sau 400ms)")
  ];

  console.log("[Bài 17] Bắt đầu duyệt qua mảng Promise bằng 'for await...of':");
  for await (const item of promises) {
    console.log(`  [for await] Nhận giá trị: ${item}`);
  }
}

// --- BÀI 18 ---
// Đề bài: Write an async function fetchUser(id) that simulates an API call (resolves a user object after 1 second).
export async function ex18_fetchUser(id: number): Promise<User> {
  await delay(1000);
  const user: User = {
    id,
    name: `User_${id}_HaChiThanh`,
    email: `student.${id}@hachithanh.dev`,
    role: id === 1 ? "Administrator" : "Developer"
  };
  console.log(`[Bài 18] fetchUser(${id}) đã hoàn tất:`, JSON.stringify(user));
  return user;
}

// --- BÀI 19 ---
// Đề bài: Create an async function fetchUsers(ids: number[]) that calls fetchUser for each ID.
export async function ex19_fetchUsers(ids: number[]): Promise<User[]> {
  console.log(`[Bài 19] Đang lấy thông tin người dùng cho danh sách ID: [${ids.join(", ")}]...`);
  // Có thể gọi song song cho từng ID thông qua Promise.all
  const userPromises = ids.map((id) => ex18_fetchUser(id));
  const users = await Promise.all(userPromises);
  console.log(`[Bài 19] Đã lấy thành công ${users.length} người dùng.`);
  return users;
}

// --- BÀI 20 ---
// Đề bài: Add a timeout: if the API call takes more than 2 seconds, throw an error.
export async function ex20_fetchUserWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 2000
): Promise<T> {
  let timer: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Quá thời gian chờ (Timeout): Tác vụ vượt quá giới hạn ${timeoutMs}ms!`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timer!);
    return result;
  } catch (error) {
    clearTimeout(timer!);
    throw error;
  }
}

// Hàm chạy thử Bài 20 minh họa cả 2 trường hợp: Thành công (<2s) và Timeout (>2s)
export async function ex20_demonstrateTimeout(): Promise<void> {
  console.log("[Bài 20] Thử nghiệm 1: Tác vụ nhanh mất 1000ms (giới hạn timeout 2000ms):");
  try {
    const fastTask = delay(1000).then(() => "Dữ liệu trả về an toàn trong 1s");
    const res1 = await ex20_fetchUserWithTimeout(fastTask, 2000);
    console.log(`  ✓ Thành công: ${res1}`);
  } catch (err: any) {
    console.log(`  ✗ Lỗi: ${err.message}`);
  }

  console.log("[Bài 20] Thử nghiệm 2: Tác vụ chậm mất 3000ms (giới hạn timeout 2000ms):");
  try {
    const slowTask = delay(3000).then(() => "Dữ liệu bị trễ");
    await ex20_fetchUserWithTimeout(slowTask, 2000);
  } catch (err: any) {
    console.log(`  ✗ Đã kích hoạt Timeout: ${err.message}`);
  }
}
