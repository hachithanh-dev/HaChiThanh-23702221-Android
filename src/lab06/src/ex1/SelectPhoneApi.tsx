import React, { useState, useEffect, useCallback } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const load = useCallback(async () => {
    // TODO 1: Reset lỗi, dữ liệu cũ và bật trạng thái tải
    setError(null);
    setPhone(null);
    setLoading(true);

    // TODO 2: Gọi API fetchPhone("1") và xử lý bắt lỗi
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: any) {
      setError(e.message || "Không thể kết nối đến máy chủ API");
    } finally {
      setLoading(false);
    }
  }, []);

  // TODO 3: useEffect gọi load() khi màn hình mở lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4: Nếu có lỗi → hiển thị ErrorBox với nút THỬ LẠI
  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  // TODO 5: Nếu đang tải hoặc chưa có phone → hiển thị Loading
  if (loading || !phone) {
    return <Loading message="Đang tải dữ liệu sản phẩm từ API..." />;
  }

  // TODO 6: Dữ liệu tải thành công → render SelectPhoneApp dùng lại Bài 1
  return <SelectPhoneApp phone={phone} />;
}
