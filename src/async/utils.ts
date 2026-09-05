/**
 * Các hàm tiện ích dùng chung cho các bài tập Async TypeScript
 */

/**
 * Hàm trì hoãn thời gian thực thi (mô phỏng delay không đồng bộ)
 * @param ms Thời gian chờ tính bằng milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hàm mô phỏng thực hiện một tác vụ sau khoảng thời gian xác định (Bài 5)
 * @param time Thời gian chạy tác vụ (ms)
 * @param taskName Tên tác vụ mô phỏng (tùy chọn)
 * @returns Promise trả về thông báo "Task done" hoặc kèm tên tác vụ
 */
export function simulateTask(time: number, taskName?: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = taskName ? `Task [${taskName}] done in ${time}ms` : "Task done";
      resolve(message);
    }, time);
  });
}

/**
 * Hàm in thông tin kèm dấu mốc thời gian phục vụ debug
 */
export function logTimestamp(message: string): void {
  const now = new Date();
  const timeStr = now.toTimeString().split(" ")[0];
  console.log(`[${timeStr}] ${message}`);
}
