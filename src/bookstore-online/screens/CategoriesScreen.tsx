// ============================================================================
// GIỜ 5: MÀN HÌNH DANH MỤC (CATEGORIES SCREEN) — TAB DANH MỤC
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CategoryChips } from '../components/CategoryChips';
import { BookGrid } from '../components/BookGrid';
import { BottomTabBar, TabKey } from '../components/BottomTabBar';
import { BOOKS, Book } from '../data';

interface CategoriesScreenProps {
  currentTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
  cartCount?: number;
  onSelectBook?: (book: Book) => void;
}

export function CategoriesScreen({
  currentTab = 'categories',
  onSelectTab = () => {},
  cartCount = 0,
  onSelectBook,
}: CategoriesScreenProps) {
  const [selectedCat, setSelectedCat] = useState<string>('Văn học');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📑 Phân loại theo Danh mục</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subTitle}>Chọn thể loại sách bạn quan tâm:</Text>
        <CategoryChips onSelectCategory={(cat) => setSelectedCat(cat)} />

        <View style={styles.resultBar}>
          <Text style={styles.resultText}>Thể loại: <Text style={styles.boldText}>{selectedCat}</Text></Text>
          <Text style={styles.resultCount}>{BOOKS.length} cuốn</Text>
        </View>

        <BookGrid
          books={BOOKS}
          onPressBook={(id) => {
            const b = BOOKS.find((item) => item.id === id);
            if (b && onSelectBook) onSelectBook(b);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 56,
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  resultBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultText: {
    fontSize: 14,
    color: '#475569',
  },
  boldText: {
    fontWeight: '700',
    color: '#4338CA',
  },
  resultCount: {
    fontSize: 12,
    color: '#64748B',
  },
});
