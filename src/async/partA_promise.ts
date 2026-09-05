import { simulateTask } from "./utils";

/**
 * ============================================================================
 * PHẦN A: BASICS WITH PROMISE (BÀI 1 -> BÀI 10)
 * ============================================================================
 */

// --- BÀI 1 ---
// Đề bài: Create a Promise that returns the string "Hello Async" after 2 seconds.
export function ex1_createHelloAsyncPromise(): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

// --- BÀI 2 ---
// Đề bài: Write a function that returns a Promise resolving with the number 10 after 1 second.
export function ex2_resolveNumber10(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

// --- BÀI 3 ---
// Đề bài: Write a function that rejects a Promise with the error "Something went wrong" after 1 second.
export function ex3_rejectWithError(): Promise<string> {
  return new Promise<string>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

// --- BÀI 4 ---
// Đề bài: Use .then() and .catch() to handle a Promise that returns a random number.
export function ex4_handleRandomNumberPromise(): Promise<void> {
  const randomPromise = new Promise<number>((resolve, reject) => {
    const num = Math.random();
    if (num >= 0.5) {
      resolve(num);
    } else {
      reject(new Error(`Số ngẫu nhiên quá nhỏ: ${num.toFixed(4)} (< 0.5)`));
    }
  });

  return randomPromise
    .then((result) => {
      console.log(`[Bài 4] Thành công! Số ngẫu nhiên nhận được: ${result.toFixed(4)}`);
    })
    .catch((error: Error) => {
      console.log(`[Bài 4] Bị từ chối (Rejection): ${error.message}`);
    });
}

// --- BÀI 5 ---
// Đề bài: Create a function simulateTask(time) that returns a Promise resolving with "Task done" after time ms.
export function ex5_simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

// --- BÀI 6 ---
// Đề bài: Use Promise.all() to run 3 simulated Promises in parallel and print the result.
export function ex6_runParallelTasks(): Promise<string[]> {
  const task1 = simulateTask(500, "Tác vụ 1");
  const task2 = simulateTask(1000, "Tác vụ 2");
  const task3 = simulateTask(1500, "Tác vụ 3");

  return Promise.all([task1, task2, task3]).then((results) => {
    console.log("[Bài 6] Kết quả hoàn thành của 3 tác vụ chạy song song:");
    results.forEach((res, idx) => console.log(`  - Kết quả ${idx + 1}: ${res}`));
    return results;
  });
}

// --- BÀI 7 ---
// Đề bài: Use Promise.race() to return whichever Promise resolves first.
export function ex7_racePromises(): Promise<string> {
  const slowTask = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Tác vụ chậm (1500ms) về đích"), 1500)
  );
  const fastTask = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Tác vụ nhanh (300ms) về đích đầu tiên!"), 300)
  );
  const mediumTask = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Tác vụ vừa (800ms) về đích"), 800)
  );

  return Promise.race([slowTask, fastTask, mediumTask]).then((winner) => {
    console.log(`[Bài 7] Người chiến thắng trong Promise.race(): ${winner}`);
    return winner;
  });
}

// --- BÀI 8 ---
// Đề bài: Create a Promise chain: square the number 2, then double it, then add 5.
export function ex8_promiseChain(initialValue: number = 2): Promise<number> {
  return Promise.resolve(initialValue)
    .then((num) => {
      const squared = num * num;
      console.log(`  Bước 1: Bình phương ${num} = ${squared}`);
      return squared;
    })
    .then((squared) => {
      const doubled = squared * 2;
      console.log(`  Bước 2: Nhân đôi ${squared} = ${doubled}`);
      return doubled;
    })
    .then((doubled) => {
      const finalResult = doubled + 5;
      console.log(`  Bước 3: Cộng 5 vào ${doubled} = ${finalResult}`);
      return finalResult;
    });
}

// --- BÀI 9 ---
// Đề bài: Write a Promise that reads an array after 1 second and filters even numbers.
export function ex9_filterEvenNumbers(numbers: number[]): Promise<number[]> {
  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const evens = numbers.filter((n) => n % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}

// --- BÀI 10 ---
// Đề bài: Use .finally() to log "Done" when a Promise finishes (success or failure).
export function ex10_promiseWithFinally(shouldFail: boolean = false): Promise<void> {
  const promise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (!shouldFail) {
        resolve("Thực thi thành công tác vụ chính");
      } else {
        reject(new Error("Xảy ra lỗi trong quá trình thực thi"));
      }
    }, 500);
  });

  return promise
    .then((msg) => {
      console.log(`[Bài 10] [Resolved]: ${msg}`);
    })
    .catch((err: Error) => {
      console.log(`[Bài 10] [Rejected]: ${err.message}`);
    })
    .finally(() => {
      console.log("[Bài 10] Done");
    });
}
