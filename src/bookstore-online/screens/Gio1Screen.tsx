// ============================================================================
// GIỜ 1: Nền tảng Flexbox & Layout đơn giản
// Kết hợp: Bài 1 (Header) + Bài 2 (BookRowCard)
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { BookRowCard } from '../components/BookRowCard';
import { BOOKS } from '../data';

export function Gio1Screen() {
  const [alignMode, setAlignMode] = useState<'flex-start' | 'center'>('flex-start');

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header title="📚 BookStore (Giờ 1)" />

      {/* Thanh điều khiển để so sánh 2 cách căn alignItems của Card theo đề bài */}
      <View style={styles.toggleBar}>
        <Text style={styles.toggleLabel}>Thử nghiệm alignItems của Card:</Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[styles.btn, alignMode === 'flex-start' && styles.btnActive]}
            onPress={() => setAlignMode('flex-start')}
          >
            <Text style={[styles.btnText, alignMode === 'flex-start' && styles.btnTextActive]}>
              flex-start
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, alignMode === 'center' && styles.btnActive]}
            onPress={() => setAlignMode('center')}
          >
            <Text style={[styles.btnText, alignMode === 'center' && styles.btnTextActive]}>
              center
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. ScrollView danh sách thẻ sách dạng hàng xếp theo cột */}
      <ScrollView contentContainerStyle={styles.list}>
        {BOOKS.map((book) => (
          <BookRowCard
            key={book.id}
            book={book}
            alignItemsMode={alignMode}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  toggleBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#EEF2FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7FF',
  },
  toggleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3730A3',
  },
  toggleGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  btnActive: {
    backgroundColor: '#4338CA',
    borderColor: '#4338CA',
  },
  btnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4338CA',
  },
  btnTextActive: {
    color: '#FFFFFF',
  },
  list: {
    padding: 16,
    gap: 12,
  },
});
