// ============================================================================
// BÀI TẬP TỔNG HỢP: GIỜ 1 + GIỜ 2 + GIỜ 3
// Màn hình Trang chủ BookStore Online hoàn chỉnh
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Đúng 100% khung mẫu hướng dẫn trang 5 của Week_3_Layout_UI.pdf
// ============================================================================
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { CategoryChips } from '../components/CategoryChips';
import { BookGrid } from '../components/BookGrid';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { BOOKS } from '../data';

export function HomeScreen() {
  const [cartCount, setCartCount] = useState<number>(0);
  const [selectedCat, setSelectedCat] = useState<string>('Văn học');

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng ngoài ScrollView */}
      <Header
        title="📚 BookStore"
        onCartPress={() => setCartCount((prev) => prev + 1)}
      />

      {/* 2. ScrollView chứa Chips + Grid — paddingBottom đủ lớn để
             FloatingCartButton không che mất sách cuối cùng */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        {/* Banner giới thiệu */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>🎉 Chào mừng bạn đến BookStore Online</Text>
          <Text style={styles.bannerSubtitle}>
            Học phần Thực hành Lập trình Thiết bị di động — Bài tập Tuần 3: Layout Flexbox
          </Text>
        </View>

        {/* 2.1. Hàng Category Chips */}
        <Text style={styles.sectionHeader}>Danh mục nổi bật</Text>
        <CategoryChips onSelectCategory={(cat) => setSelectedCat(cat)} />

        {/* 2.2. Lưới sách 2 cột có gắn DiscountBadge */}
        <View style={styles.gridHeader}>
          <Text style={styles.sectionHeader}>Sách đề xuất ({selectedCat})</Text>
          <Text style={styles.bookCount}>{BOOKS.length} cuốn sách</Text>
        </View>
        <BookGrid
          books={BOOKS}
          onPressBook={(id) => {
            console.log(`Đã thêm sách ID #${id} vào giỏ hàng`);
            setCartCount((prev) => prev + 1);
          }}
        />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView, neo absolute cố định ở góc dưới phải */}
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
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 110, // Đệm đáy đảm bảo không bị che item cuối bởi nút giỏ hàng
  },
  banner: {
    backgroundColor: '#312E81',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#C7D2FE',
    fontSize: 12,
    lineHeight: 17,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    marginTop: 4,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
  },
  bookCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
