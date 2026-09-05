import {
  ex1_createHelloAsyncPromise,
  ex2_resolveNumber10,
  ex3_rejectWithError,
  ex4_handleRandomNumberPromise,
  ex5_simulateTask,
  ex6_runParallelTasks,
  ex7_racePromises,
  ex8_promiseChain,
  ex9_filterEvenNumbers,
  ex10_promiseWithFinally
} from "./partA_promise";

import {
  ex11_getHelloAsyncAwait,
  ex12_callSimulateTask,
  ex13_handleErrorWithTryCatch,
  ex14_multiplyByThree,
  ex15_callSequentially,
  ex16_callInParallel,
  ex17_forAwaitOf,
  ex18_fetchUser,
  ex19_fetchUsers,
  ex20_demonstrateTimeout
} from "./partB_async_await";

import {
  ex21_fetchTodo,
  ex22_fetchMultipleTodos,
  ex23_fetchAndFilterCompletedTodos,
  ex24_postData,
  ex25_downloadFile,
  ex26_simulateFiveSecondWait,
  ex27_demonstrateRetry,
  ex28_batchProcess,
  ex29_queueProcess,
  ex30_handleAllSettled
} from "./partC_fetch_io";

/**
 * Bản đồ ánh xạ 30 bài tập Async TypeScript
 */
const exerciseMap: Record<number, { title: string; runner: () => Promise<any> }> = {
  1: {
    title: "Tạo Promise trả về 'Hello Async' sau 2 giây",
    runner: async () => {
      const res = await ex1_createHelloAsyncPromise();
      console.log(`[Bài 1] Kết quả sau 2s: "${res}"`);
    }
  },
  2: {
    title: "Hàm trả về Promise resolve với số 10 sau 1 giây",
    runner: async () => {
      const res = await ex2_resolveNumber10();
      console.log(`[Bài 2] Kết quả resolve sau 1s: ${res}`);
    }
  },
  3: {
    title: "Hàm reject Promise với lỗi 'Something went wrong' sau 1 giây",
    runner: async () => {
      try {
        await ex3_rejectWithError();
      } catch (err: any) {
        console.log(`[Bài 3] Đã bắt được lỗi: "${err.message}"`);
      }
    }
  },
  4: {
    title: "Xử lý Promise trả về số ngẫu nhiên bằng .then() và .catch()",
    runner: async () => {
      await ex4_handleRandomNumberPromise();
    }
  },
  5: {
    title: "Hàm simulateTask(time) trả về 'Task done' sau time ms",
    runner: async () => {
      const res = await ex5_simulateTask(1000);
      console.log(`[Bài 5] simulateTask(1000) hoàn thành: "${res}"`);
    }
  },
  6: {
    title: "Dùng Promise.all() chạy 3 Promise song song",
    runner: async () => {
      await ex6_runParallelTasks();
    }
  },
  7: {
    title: "Dùng Promise.race() lấy kết quả Promise về đích sớm nhất",
    runner: async () => {
      await ex7_racePromises();
    }
  },
  8: {
    title: "Promise chain: bình phương 2 -> nhân đôi -> cộng 5",
    runner: async () => {
      const finalResult = await ex8_promiseChain(2);
      console.log(`[Bài 8] Kết quả cuối cùng của chuỗi chain: ${finalResult}`);
    }
  },
  9: {
    title: "Promise đọc mảng sau 1 giây và lọc số chẵn",
    runner: async () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const evens = await ex9_filterEvenNumbers(arr);
      console.log(`[Bài 9] Mảng gốc: [${arr.join(", ")}]`);
      console.log(`[Bài 9] Mảng số chẵn sau khi lọc: [${evens.join(", ")}]`);
    }
  },
  10: {
    title: "Dùng .finally() để log 'Done' khi Promise kết thúc",
    runner: async () => {
      await ex10_promiseWithFinally(false);
    }
  },
  11: {
    title: "Chuyển đổi Bài 1 sang cú pháp async/await",
    runner: async () => {
      await ex11_getHelloAsyncAwait();
    }
  },
  12: {
    title: "Hàm async gọi simulateTask(2000) và log kết quả",
    runner: async () => {
      await ex12_callSimulateTask();
    }
  },
  13: {
    title: "Xử lý lỗi bằng try/catch trong async/await",
    runner: async () => {
      await ex13_handleErrorWithTryCatch();
    }
  },
  14: {
    title: "Hàm async nhận số, đợi 1s và trả về số * 3",
    runner: async () => {
      await ex14_multiplyByThree(7);
    }
  },
  15: {
    title: "Gọi nhiều hàm async tuần tự bằng await",
    runner: async () => {
      await ex15_callSequentially();
    }
  },
  16: {
    title: "Gọi nhiều hàm async song song bằng Promise.all()",
    runner: async () => {
      await ex16_callInParallel();
    }
  },
  17: {
    title: "Duyệt qua mảng Promises bằng vòng lặp for await...of",
    runner: async () => {
      await ex17_forAwaitOf();
    }
  },
  18: {
    title: "Hàm async fetchUser(id) mô phỏng API trả về User sau 1s",
    runner: async () => {
      await ex18_fetchUser(1);
    }
  },
  19: {
    title: "Hàm async fetchUsers(ids) gọi fetchUser cho từng ID",
    runner: async () => {
      await ex19_fetchUsers([1, 2, 3]);
    }
  },
  20: {
    title: "Thêm timeout: nếu API mất hơn 2 giây thì ném lỗi",
    runner: async () => {
      await ex20_demonstrateTimeout();
    }
  },
  21: {
    title: "Dùng fetch lấy dữ liệu từ API công khai",
    runner: async () => {
      await ex21_fetchTodo();
    }
  },
  22: {
    title: "Gọi API nhiều lần và in danh sách kết quả",
    runner: async () => {
      await ex22_fetchMultipleTodos([1, 2, 3]);
    }
  },
  23: {
    title: "Tải danh sách Todos và lọc các mục đã hoàn thành",
    runner: async () => {
      await ex23_fetchAndFilterCompletedTodos();
    }
  },
  24: {
    title: "Hàm async postData() gửi POST request kèm JSON body",
    runner: async () => {
      await ex24_postData();
    }
  },
  25: {
    title: "Hàm downloadFile mô phỏng tải file trong 3 giây",
    runner: async () => {
      await ex25_downloadFile("document_android_async.pdf");
    }
  },
  26: {
    title: "Dùng async/await và setTimeout mô phỏng thời gian chờ 5 giây",
    runner: async () => {
      await ex26_simulateFiveSecondWait();
    }
  },
  27: {
    title: "Hàm fetchWithRetry tự động thử lại khi API thất bại",
    runner: async () => {
      await ex27_demonstrateRetry();
    }
  },
  28: {
    title: "Hàm batchProcess() xử lý đồng thời 5 tác vụ qua Promise.all",
    runner: async () => {
      await ex28_batchProcess();
    }
  },
  29: {
    title: "Hàm queueProcess() xử lý tác vụ tuần tự trong hàng đợi FIFO",
    runner: async () => {
      await ex29_queueProcess();
    }
  },
  30: {
    title: "Dùng Promise.allSettled() hiển thị trạng thái fulfilled/rejected",
    runner: async () => {
      await ex30_handleAllSettled();
    }
  }
};

/**
 * Hàm điều phối chính
 */
async function main() {
  const arg = process.argv[2];

  if (arg && !isNaN(Number(arg))) {
    const exId = Number(arg);
    const item = exerciseMap[exId];
    if (item) {
      console.log(`================================================================`);
      console.log(`🚀 BÀI ${exId}: ${item.title}`);
      console.log(`================================================================`);
      await item.runner();
      console.log(`================================================================\n`);
    } else {
      console.error(`Không tìm thấy bài tập có số thứ tự: ${exId} (1 -> 30)`);
    }
    return;
  }

  console.log("========================================================================");
  console.log("🌟 KHỞI CHẠY TỔNG HỢP 30 BÀI TẬP ASYNC TYPESCRIPT - HÀ CHÍ THANH - 23702221");
  console.log("========================================================================\n");

  for (let id = 1; id <= 30; id++) {
    const item = exerciseMap[id];
    console.log(`--- [Bài ${id}/30] ${item.title} ---`);
    await item.runner();
    console.log("");
  }

  console.log("========================================================================");
  console.log("🎉 ĐÃ HOÀN THÀNH TOÀN BỘ 30/30 BÀI TẬP ASYNC TYPESCRIPT THÀNH CÔNG!");
  console.log("========================================================================");
}

main().catch((err) => {
  console.error("Lỗi khi chạy chương trình:", err);
});
