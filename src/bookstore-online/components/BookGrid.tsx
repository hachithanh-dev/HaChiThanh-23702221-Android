// ============================================================================
// GIỜ 2 — BÀI TẬP 2: Lưới sản phẩm 2 cột (Book Grid)
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Kỹ thuật Flexbox: flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
// Mỗi item width: '48%', ảnh bìa aspectRatio: 3/4 giữ nguyên tỉ lệ ảnh khi co giãn theo %.
// Tích hợp DiscountBadge (Giờ 3) neo absolute trên bìa sách.
// ============================================================================
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../data';
import { DiscountBadge } from './DiscountBadge';

interface BookGridProps {
  books: Book[];
  onPressBook?: (id: number) => void;
  useGapLayout?: boolean; // false: 2 cột qua space-between | true: 3 cột qua gap
}

export function BookGrid({ books, onPressBook, useGapLayout = false }: BookGridProps) {
  const itemWidth = useGapLayout ? '30.5%' : '48%';

  return (
    <View
      style={[
        styles.grid,
        useGapLayout ? { gap: 12 } : { justifyContent: 'space-between' },
      ]}
    >
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          activeOpacity={0.85}
          style={[styles.item, { width: itemWidth }]}
          onPress={() => onPressBook && onPressBook(book.id)}
        >
          {/* View bọc ảnh: position: 'relative' để làm containing block cho DiscountBadge */}
          <View style={styles.coverWrap}>
            <Image
              source={{ uri: book.cover }}
              style={styles.cover}
              resizeMode="cover"
            />
            {/* Badge giảm giá hoặc nhãn Mới định vị absolute ở góc trên-trái */}
            <DiscountBadge
              discountPercent={book.discountPercent}
              isNew={book.isNew}
            />
          </View>

          {/* Tiêu đề sách: giới hạn tối đa 2 dòng */}
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>

          {/* Giá tiền */}
          <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row', // Sắp xếp các item theo luồng hàng ngang
    flexWrap: 'wrap', // Tự động xuống dòng khi đầy hàng để tạo thành lưới
  },
  item: {
    marginBottom: 16, // Khoảng cách giữa các hàng trong lưới sách
  },
  coverWrap: {
    position: 'relative', // Containing block chuẩn cho phần tử absolute bên trong
    width: '100%',
    aspectRatio: 3 / 4, // Giữ tỉ lệ chuẩn 3:4 của bìa sách thay vì cố định chiều cao px
    maxHeight: 240, // Đảm bảo tỉ lệ bìa sách cân đối, không bị kéo quá dài trên màn hình rộng
    borderRadius: 10,
    overflow: 'hidden', // Bo tròn góc ảnh và clip nội dung badge nếu chạm mép
    backgroundColor: '#EEF2F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 18,
  },
  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B4B',
  },
});
