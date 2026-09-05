/**
 * Định nghĩa các kiểu dữ liệu và Interface dùng chung cho 30 bài tập Async TypeScript
 */

// Kiểu dữ liệu cho bài tập Fetch Todo (Bài 21, 22, 23)
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Kiểu dữ liệu cho bài tập Fetch User (Bài 18, 19, 20)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Kiểu dữ liệu cho bài tập POST Data (Bài 24)
export interface PostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponse extends PostRequest {
  id: number;
}

// Trạng thái kết quả thực thi Promise (Bài 30)
export interface SettledStatus<T> {
  index: number;
  status: "fulfilled" | "rejected";
  value?: T;
  reason?: string;
}
