// ============================================================================
// GIỜ 2: Kích thước, Wrap và Lưới sản phẩm (Grid)
// Kết hợp: Bài 1 (CategoryChips flexWrap) + Bài 2 (BookGrid 2 cột) + Thử thách 3 cột
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { CategoryChips } from '../components/CategoryChips';
import { BookGrid } from '../components/BookGrid';
import { BOOKS } from '../data';

export function Gio2Screen() {
  const [useGap, setUseGap] = useState<boolean>(false);

  return (
    <View style={styles.screen}>
      <Header title="📚 BookStore (Giờ 2)" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Phần 1: Category Chips dạng wrap */}
        <Text style={styles.sectionTitle}>1. Danh mục sách (flexWrap & pill chips)</Text>
        <CategoryChips />

        {/* Thanh chuyển đổi thử thách Giờ 2: 2 cột vs 3 cột */}
        <View style={styles.challengeBox}>
          <Text style={styles.challengeText}>
            Bố cục lưới: {useGap ? '3 cột (dùng gap)' : '2 cột (dùng % & space-between)'}
          </Text>
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setUseGap(!useGap)}
          >
            <Text style={styles.toggleBtnText}>
              Chuyển sang {useGap ? '2 cột' : '3 cột'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phần 2: Lưới sách BookGrid */}
        <Text style={styles.sectionTitle}>2. Lưới sản phẩm (Book Grid)</Text>
        <BookGrid
          books={BOOKS}
          useGapLayout={useGap}
          onPressBook={(id) => console.log('Mở sách ID:', id)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    marginBottom: 10,
  },
  challengeBox: {
    marginTop: 16,
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3730A3',
  },
  toggleBtn: {
    backgroundColor: '#4338CA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
