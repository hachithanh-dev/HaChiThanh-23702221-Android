// ============================================================================
// GIỜ 3: Position, AlignSelf và các lớp phủ (Overlay)
// Kết hợp: Bài 1 (DiscountBadge absolute) + Bài 2 (FloatingCartButton absolute lồng nhau)
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { BookGrid } from '../components/BookGrid';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { BOOKS } from '../data';

export function Gio3Screen() {
  const [cartCount, setCartCount] = useState<number>(3);

  return (
    <View style={styles.screen}>
      <Header title="📚 BookStore (Giờ 3)" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.instruction}>
          💡 Chạm vào từng cuốn sách để tăng số lượng giỏ hàng, quan sát Badge giảm giá (-20%, -15%) và nhãn "Mới" neo cố định ở góc ảnh sách.
        </Text>

        <BookGrid
          books={BOOKS}
          onPressBook={() => setCartCount((prev) => prev + 1)}
        />
      </ScrollView>

      {/* Nút giỏ hàng nổi neo ngoài ScrollView, luôn cố định ở góc dưới-phải màn hình */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((prev) => prev + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative', // Containing block chuẩn cho nút giỏ hàng nổi
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Đệm đáy để nút giỏ hàng không che item sách cuối cùng
  },
  instruction: {
    fontSize: 12,
    color: '#475569',
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
    lineHeight: 18,
  },
});
