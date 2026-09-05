import { Todo, PostRequest, PostResponse } from "./types";
import { delay } from "./utils";

/**
 * ============================================================================
 * PHẦN C: FETCH API & SIMULATED I/O (BÀI 21 -> BÀI 30)
 * ============================================================================
 */

// --- BÀI 21 ---
// Đề bài: Use fetch to get data from a public API (e.g., https://jsonplaceholder.typicode.com/todos/1).
export async function ex21_fetchTodo(): Promise<Todo> {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  console.log(`[Bài 21] Đang gửi yêu cầu GET tới: ${url}...`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const todo: Todo = (await response.json()) as Todo;
  console.log("[Bài 21] Dữ liệu Todo nhận được thành công:");
  console.log(`  - ID: ${todo.id}`);
  console.log(`  - Title: "${todo.title}"`);
  console.log(`  - Completed: ${todo.completed}`);
  return todo;
}

// --- BÀI 22 ---
// Đề bài: Call the API multiple times and log the results.
export async function ex22_fetchMultipleTodos(ids: number[] = [1, 2, 3]): Promise<Todo[]> {
  console.log(`[Bài 22] Đang gọi API song song cho danh sách Todo ID: [${ids.join(", ")}]...`);

  const fetchPromises = ids.map(async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = (await res.json()) as Todo;
    console.log(`  > [Todo ${id}] Title: "${data.title}" | Status: ${data.completed ? "Hoàn thành" : "Chưa hoàn thành"}`);
    return data;
  });

  const todos = await Promise.all(fetchPromises);
  console.log(`[Bài 22] Đã nhận đủ kết quả của ${todos.length} yêu cầu API.`);
  return todos;
}

// --- BÀI 23 ---
// Đề bài: Write an async function that fetches a list of todos and filters out those that are not completed.
export async function ex23_fetchAndFilterCompletedTodos(): Promise<Todo[]> {
  const url = "https://jsonplaceholder.typicode.com/todos";
  console.log(`[Bài 23] Đang tải toàn bộ danh sách Todos từ API...`);

  const response = await fetch(url);
  const allTodos = (await response.json()) as Todo[];

  // Lọc ra các công việc đã hoàn thành (completed === true)
  const completedTodos = allTodos.filter((t) => t.completed === true);

  console.log(`[Bài 23] Tổng số Todos tải về: ${allTodos.length}`);
  console.log(`[Bài 23] Số Todos đã hoàn thành (completed: true): ${completedTodos.length}`);
  console.log("  Mẫu 3 công việc hoàn thành đầu tiên:");
  completedTodos.slice(0, 3).forEach((t) => {
    console.log(`    ✓ [ID: ${t.id}] ${t.title}`);
  });

  return completedTodos;
}

// --- BÀI 24 ---
// Đề bài: Write an async function postData() that sends a POST request to a test API.
export async function ex24_postData(): Promise<PostResponse> {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const newPost: PostRequest = {
    title: "Bài tập TypeScript Async HaChiThanh",
    body: "Thực hành lập trình bất đồng bộ chuyên sâu trong TypeScript và Node.js.",
    userId: 23702221
  };

  console.log(`[Bài 24] Đang gửi POST request tới: ${url}`);
  console.log("  Payload:", JSON.stringify(newPost));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(newPost)
  });

  const createdData = (await response.json()) as PostResponse;
  console.log(`[Bài 24] Phản hồi từ server (Status: ${response.status} Created):`);
  console.log(`  - New Record ID: ${createdData.id}`);
  console.log(`  - Title: "${createdData.title}"`);
  console.log(`  - User ID: ${createdData.userId}`);
  return createdData;
}

// --- BÀI 25 ---
// Đề bài: Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.
export async function ex25_downloadFile(fileName: string = "document_android_async.pdf"): Promise<string> {
  console.log(`[Bài 25] Bắt đầu tải tệp: "${fileName}"...`);
  console.log("  [Tiến trình] 0% ... Đang thiết lập kết nối socket");
  
  await delay(1000);
  console.log("  [Tiến trình] 33% ... Đã nhận 1.5MB / 4.5MB");

  await delay(1000);
  console.log("  [Tiến trình] 67% ... Đã nhận 3.0MB / 4.5MB");

  await delay(1000);
  console.log("  [Tiến trình] 100% ... Tải tệp thành công!");

  const message = `Tải hoàn tất tệp "${fileName}" trong 3 giây.`;
  console.log(`[Bài 25] Log: ${message}`);
  return message;
}

// --- BÀI 26 ---
// Đề bài: Use async/await with setTimeout to simulate a 5-second wait.
export async function ex26_simulateFiveSecondWait(): Promise<void> {
  console.log("[Bài 26] Bắt đầu đếm ngược thời gian chờ 5 giây...");
  const start = Date.now();

  // Mô phỏng 5 giây bằng Promise wrap setTimeout
  await new Promise<void>((resolve) => setTimeout(resolve, 5000));

  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  console.log(`[Bài 26] Đã hoàn thành thời gian chờ sau ${elapsed} giây!`);
}

// --- BÀI 27 ---
// Đề bài: Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.
export async function ex27_fetchWithRetry(url: string, maxRetries: number = 3): Promise<any> {
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      console.log(`[Bài 27] Lần thử ${attempt}/${maxRetries}: Gửi yêu cầu tới ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Mã phản hồi HTTP không hợp lệ: ${response.status}`);
      }
      const data = await response.json();
      console.log(`[Bài 27] Yêu cầu thành công ở lần thử thứ ${attempt}!`);
      return data;
    } catch (error: any) {
      console.log(`  ✗ Lần thử ${attempt} thất bại: ${error.message}`);
      if (attempt >= maxRetries) {
        throw new Error(`Yêu cầu thất bại hoàn toàn sau ${maxRetries} lần thử lại! Chi tiết: ${error.message}`);
      }
      // Chờ một khoảng ngắn trước khi thử lại (Exponential Backoff mô phỏng)
      const backoffMs = attempt * 600;
      console.log(`  > Chờ ${backoffMs}ms trước khi thử lại...`);
      await delay(backoffMs);
    }
  }
}

// Chạy thử Bài 27 với cả URL hợp lệ và URL lỗi để minh họa retry
export async function ex27_demonstrateRetry(): Promise<void> {
  // Thử nghiệm với endpoint lỗi để chứng minh cơ chế retry 3 lần
  console.log("[Bài 27] --- Thử nghiệm cơ chế retry với endpoint giả định bị lỗi ---");
  try {
    await ex27_fetchWithRetry("https://jsonplaceholder.typicode.com/invalid-route-404", 3);
  } catch (err: any) {
    console.log(`[Bài 27] Kết quả cuối cùng: ${err.message}`);
  }
}

// --- BÀI 28 ---
// Đề bài: Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).
export async function ex28_batchProcess(): Promise<string[]> {
  console.log("[Bài 28] Bắt đầu xử lý hàng loạt 5 tác vụ bất đồng bộ đồng thời (Batch Process):");
  const startTime = Date.now();

  const taskList = [
    delay(400).then(() => "Batch 1: Xử lý tệp hình ảnh user_avatar.jpg"),
    delay(600).then(() => "Batch 2: Nén video demo_presentation.mp4"),
    delay(500).then(() => "Batch 3: Gửi email thông báo đơn hàng"),
    delay(700).then(() => "Batch 4: Tạo tệp PDF báo cáo thống kê"),
    delay(300).then(() => "Batch 5: Cập nhật chỉ mục Elasticsearch")
  ];

  const results = await Promise.all(taskList);
  const duration = Date.now() - startTime;

  console.log(`[Bài 28] Đã xử lý xong toàn bộ 5 tác vụ trong đợt (Batch) sau ${duration}ms:`);
  results.forEach((r) => console.log(`  ✓ ${r}`));

  return results;
}

// --- BÀI 29 ---
// Đề bài: Write an async function queueProcess() that processes tasks sequentially in a queue.
export async function ex29_queueProcess(): Promise<void> {
  console.log("[Bài 29] Khởi động hàng đợi xử lý tác vụ tuần tự (FIFO Queue):");
  
  type QueueTask = () => Promise<string>;
  const queue: { id: number; name: string; task: QueueTask }[] = [
    { id: 1, name: "Giao dịch thanh toán A101", task: async () => { await delay(400); return "Xác thực thẻ thành công"; } },
    { id: 2, name: "Giao dịch thanh toán A102", task: async () => { await delay(500); return "Trừ tiền tài khoản thành công"; } },
    { id: 3, name: "Giao dịch thanh toán A103", task: async () => { await delay(300); return "In hóa đơn điện tử thành công"; } },
    { id: 4, name: "Giao dịch thanh toán A104", task: async () => { await delay(450); return "Gửi mã OTP xác nhận đơn"; } }
  ];

  let step = 1;
  for (const item of queue) {
    console.log(`  [Queue] Đang dequeue & thực thi tác vụ #${step}: ${item.name}...`);
    const result = await item.task();
    console.log(`    ↳ Hoàn tất: ${result}`);
    step++;
  }

  console.log("[Bài 29] Toàn bộ hàng đợi đã được xử lý tuần tự thành công (0 xung đột).");
}

// --- BÀI 30 ---
// Đề bài: Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.
export async function ex30_handleAllSettled(): Promise<void> {
  console.log("[Bài 30] Đang gọi các API calls hỗn hợp và theo dõi qua Promise.allSettled()...");

  const endpoints = [
    { label: "API 1 (Todo 1 - Hợp lệ)", url: "https://jsonplaceholder.typicode.com/todos/1" },
    { label: "API 2 (Todo 2 - Hợp lệ)", url: "https://jsonplaceholder.typicode.com/todos/2" },
    { label: "API 3 (Endpoint lỗi 404)", url: "https://jsonplaceholder.typicode.com/non-existent-api" },
    { label: "API 4 (Post 1 - Hợp lệ)", url: "https://jsonplaceholder.typicode.com/posts/1" }
  ];

  const requests = endpoints.map(async (ep) => {
    const res = await fetch(ep.url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} (${res.statusText})`);
    }
    return res.json();
  });

  const results = await Promise.allSettled(requests);

  console.log("[Bài 30] Bảng tổng hợp trạng thái các API (Promise.allSettled):");
  results.forEach((res, index) => {
    const ep = endpoints[index];
    if (res.status === "fulfilled") {
      console.log(`  [✓ Fulfilled] ${ep.label} -> Thành công! Nhận dữ liệu ID: ${res.value.id || 'N/A'}`);
    } else {
      console.log(`  [✗ Rejected]  ${ep.label} -> Thất bại! Nguyên nhân: ${res.reason?.message || res.reason}`);
    }
  });
}
