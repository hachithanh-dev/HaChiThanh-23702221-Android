// ============================================================================
// BÀI TẬP THỰC HÀNH GIỜ 4 — SCROLLVIEW & SAFEARIAVIEW
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Bao gồm:
// - Bài 1: Màn hình Trang chủ BookStore hoàn chỉnh (ScrollView + Header cố định + Floating Cart)
// - Bài 2: Màn hình Chi tiết sách (Book Detail: Ảnh lớn căn giữa, mô tả cuộn, thanh giỏ cố định)
// ============================================================================
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeScreen } from './HomeScreen';
import { BookDetailScreen } from './BookDetailScreen';
import { Book, BOOKS } from '../data';

export function Gio4Screen() {
  const [subExercise, setSubExercise] = useState<'ex1' | 'ex2'>(() => {
    if (typeof window !== 'undefined') {
      const q = (window.location.search + window.location.hash).toLowerCase();
      if (q.includes('ex2') || q.includes('detail')) {
        return 'ex2';
      }
    }
    return 'ex1';
  });
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[0]);
  const [cartCount, setCartCount] = useState<number>(3);

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== 'undefined') {
        const q = (window.location.search + window.location.hash).toLowerCase();
        if (q.includes('ex2') || q.includes('detail')) {
          setSubExercise('ex2');
        } else if (q.includes('ex1')) {
          setSubExercise('ex1');
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', checkHash);
      window.addEventListener('popstate', checkHash);
      return () => {
        window.removeEventListener('hashchange', checkHash);
        window.removeEventListener('popstate', checkHash);
      };
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Thanh chọn bài tập Giờ 4 */}
      <View style={styles.subBar}>
        <TouchableOpacity
          style={[styles.subTab, subExercise === 'ex1' && styles.subTabActive]}
          onPress={() => setSubExercise('ex1')}
        >
          <Text
            style={[
              styles.subTabText,
              subExercise === 'ex1' && styles.subTabTextActive,
            ]}
          >
            Bài 1: Trang chủ hoàn chỉnh
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.subTab, subExercise === 'ex2' && styles.subTabActive]}
          onPress={() => setSubExercise('ex2')}
        >
          <Text
            style={[
              styles.subTabText,
              subExercise === 'ex2' && styles.subTabTextActive,
            ]}
          >
            Bài 2: Chi tiết sách
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị màn hình tương ứng */}
      <View style={styles.content}>
        {subExercise === 'ex1' ? (
          <HomeScreen
            cartCount={cartCount}
            onCartPress={() => setCartCount((c) => c + 1)}
            onSelectBook={(book) => {
              setSelectedBook(book);
              setSubExercise('ex2');
            }}
          />
        ) : (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSubExercise('ex1')}
            onAddToCart={() => setCartCount((c) => c + 1)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  subBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 6,
    gap: 8,
  },
  subTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#334155',
  },
  subTabActive: {
    backgroundColor: '#4F46E5',
  },
  subTabText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  subTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
