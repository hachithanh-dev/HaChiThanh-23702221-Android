// ============================================================================
// GIỜ 1 — BÀI TẬP 2: Thẻ sách (Book Card) đơn dạng HÀNG (row)
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Kỹ thuật Flexbox: ảnh bìa cố định bên trái + cột thông tin flex: 1 bên phải,
// giá tiền neo đáy cột bằng justifyContent: 'space-between' trên trục dọc.
// ============================================================================
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../data';

interface BookRowCardProps {
  book: Book;
  onPress?: (id: number) => void;
  alignItemsMode?: 'flex-start' | 'center';
}

const COVER_WIDTH = 80;
const COVER_HEIGHT = 110;

export function BookRowCard({
  book,
  onPress,
  alignItemsMode = 'flex-start',
}: BookRowCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { alignItems: alignItemsMode }]}
      onPress={() => onPress && onPress(book.id)}
    >
      {/* 1. Ảnh bìa bên trái kích thước cố định, có bo góc */}
      <Image
        source={{ uri: book.cover }}
        style={styles.cover}
        resizeMode="cover"
      />

      {/* 2. Cột thông tin bên phải: flex: 1 để chiếm toàn bộ không gian còn lại */}
      <View style={styles.info}>
        <View>
          {/* numberOfLines={2} ngăn tên sách quá dài làm lệch cấu trúc card */}
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>

        {/* Giá tiền được neo sát dưới cùng nhờ justifyContent: 'space-between' */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
          {book.discountPercent ? (
            <Text style={styles.discountTag}>-{book.discountPercent}%</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Sắp xếp ảnh bìa và cột thông tin theo chiều ngang
    padding: 12,
    gap: 12, // Khoảng cách giữa ảnh bìa và khối thông tin
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cover: {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#EEF2F7',
  },
  info: {
    flex: 1, // Chiếm trọn không gian chiều rộng còn lại của card
    height: COVER_HEIGHT, // Chiều cao bằng ảnh bìa để trục dọc có không gian dãn
    flexDirection: 'column', // Trục chính theo chiều dọc
    justifyContent: 'space-between', // Đẩy phần tiêu đề lên trên, giá tiền xuống đáy
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 20,
  },
  author: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  discountTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
