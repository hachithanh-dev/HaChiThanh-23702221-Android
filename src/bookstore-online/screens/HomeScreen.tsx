// ============================================================================
// GIỜ 4 — BÀI TẬP 1: MÀN HÌNH TRANG CHỦ BOOKSTORE HOÀN CHỈNH
// Đề bài: Ghép Header (Giờ 1), Category Chips (Giờ 2), Book Grid (Giờ 3) và
// Floating Cart Button (Giờ 4) thành 1 màn hình Home hoàn chỉnh có thể cuộn được.
// Yêu cầu kỹ thuật:
// - SafeAreaView (flex: 1) > Header (cố định ngoài ScrollView) >
//   ScrollView (flex: 1, showsVerticalScrollIndicator={false}, paddingBottom đủ lớn)
//   > Floating Cart Button (absolute, cùng cấp ScrollView, nằm ngoài).
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '../components/Header';
import { CategoryChips } from '../components/CategoryChips';
import { BookGrid } from '../components/BookGrid';
import { FloatingCartButton } from '../components/FloatingCartButton';
import { Book, BOOKS } from '../data';

interface HomeScreenProps {
  cartCount?: number;
  onCartPress?: () => void;
  onSelectBook?: (book: Book) => void;
}

export function HomeScreen({
  cartCount: externalCartCount,
  onCartPress,
  onSelectBook,
}: HomeScreenProps) {
  const [internalCartCount, setInternalCartCount] = useState<number>(3);
  const [selectedCat, setSelectedCat] = useState<string>('Văn học');

  const cartCount = externalCartCount !== undefined ? externalCartCount : internalCartCount;
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = (window.location.search + window.location.hash).toLowerCase();
      if (q.includes('scroll')) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({ y: 400, animated: false });
        }, 300);
      }
    }
  }, []);

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else {
      setInternalCartCount((prev) => prev + 1);
    }
  };

  const handleBookPress = (id: number) => {
    const foundBook = BOOKS.find((b) => b.id === id);
    if (onSelectBook && foundBook) {
      onSelectBook(foundBook);
    } else {
      setInternalCartCount((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* 1. Header cố định trên cùng — NGOÀI ScrollView */}
        <Header
          title="📚 BookStore"
          onCartPress={handleCartPress}
        />

        {/* 2. ScrollView (flex: 1) chứa Chips + Grid
               showsVerticalScrollIndicator={false}
               contentContainerStyle có paddingBottom đủ lớn (110) để Grid
               không bị nút giỏ hàng che mất phần tử cuối */}
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner chào mừng */}
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>🎉 Chào mừng bạn đến BookStore Online</Text>
            <Text style={styles.bannerSubtitle}>
              Học phần Thực hành Lập trình Thiết bị Di động — Tuần 4: Layout Flexbox Toàn Diện
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
            onPressBook={handleBookPress}
          />
        </ScrollView>

        {/* 3. Nút giỏ nổi — NGOÀI ScrollView (cùng cấp), neo absolute cố định ở góc dưới phải */}
        <FloatingCartButton
          count={cartCount}
          onPress={handleCartPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1B4B',
  },
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
    paddingBottom: 110, // Đệm đáy đảm bảo không bị nút giỏ hàng che phần tử cuối
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
