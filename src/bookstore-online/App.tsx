// ============================================================================
// BÀI TẬP THỰC HÀNH REACT NATIVE — TUẦN 4
// Chủ đề: LAYOUT với Flexbox — Ứng dụng BookStore Online Toàn Diện
// Giờ 4: Layout toàn màn hình: ScrollView & SafeAreaView
// Giờ 5: Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { CartScreen } from './screens/CartScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { Gio4Screen } from './screens/Gio4Screen';
import { Gio5Screen } from './screens/Gio5Screen';
import { BottomTabBar, TabKey } from './components/BottomTabBar';
import { Book, BOOKS } from './data';

type MainViewMode = 'full_app' | 'gio4' | 'gio5';

function getInitialState() {
  if (typeof window !== 'undefined') {
    const q = (window.location.search + window.location.hash).toLowerCase();
    if (q.includes('gio4')) {
      return { mode: 'gio4' as MainViewMode, tab: 'home' as TabKey, book: null };
    }
    if (q.includes('gio5')) {
      return { mode: 'gio5' as MainViewMode, tab: 'home' as TabKey, book: null };
    }
    if (q.includes('categories')) {
      return { mode: 'full_app' as MainViewMode, tab: 'categories' as TabKey, book: null };
    }
    if (q.includes('cart')) {
      return { mode: 'full_app' as MainViewMode, tab: 'cart' as TabKey, book: null };
    }
    if (q.includes('profile')) {
      return { mode: 'full_app' as MainViewMode, tab: 'profile' as TabKey, book: null };
    }
    if (q.includes('detail')) {
      return { mode: 'full_app' as MainViewMode, tab: 'home' as TabKey, book: BOOKS[0] };
    }
  }
  return { mode: 'full_app' as MainViewMode, tab: 'home' as TabKey, book: null };
}

export default function App() {
  const init = getInitialState();
  const [viewMode, setViewMode] = useState<MainViewMode>(init.mode);
  const [currentTab, setCurrentTab] = useState<TabKey>(init.tab);
  const [cartCount, setCartCount] = useState<number>(3);
  const [selectedBook, setSelectedBook] = useState<Book | null>(init.book);

  // Mở chi tiết sách
  const handleOpenDetail = (book: Book) => {
    setSelectedBook(book);
  };

  // Đóng chi tiết sách
  const handleBackFromDetail = () => {
    setSelectedBook(null);
  };

  // Thêm sách vào giỏ
  const handleAddToCart = (_book: Book, qty: number) => {
    setCartCount((c) => c + qty);
  };

  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== 'undefined') {
        const q = (window.location.search + window.location.hash).toLowerCase();
        if (q.includes('gio4')) {
          setViewMode('gio4');
          setSelectedBook(null);
        } else if (q.includes('gio5')) {
          setViewMode('gio5');
          setSelectedBook(null);
        } else if (q.includes('categories')) {
          setViewMode('full_app');
          setCurrentTab('categories');
          setSelectedBook(null);
        } else if (q.includes('cart')) {
          setViewMode('full_app');
          setCurrentTab('cart');
          setSelectedBook(null);
        } else if (q.includes('profile')) {
          setViewMode('full_app');
          setCurrentTab('profile');
          setSelectedBook(null);
        } else if (q.includes('detail')) {
          setViewMode('full_app');
          setSelectedBook(BOOKS[0]);
        } else if (q.includes('home') || q.includes('full_app')) {
          setViewMode('full_app');
          setCurrentTab('home');
          setSelectedBook(null);
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleUrlChange);
      window.addEventListener('popstate', handleUrlChange);
      return () => {
        window.removeEventListener('hashchange', handleUrlChange);
        window.removeEventListener('popstate', handleUrlChange);
      };
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Thanh công cụ chuyển đổi chế độ kiểm tra bài tập phía trên */}
      <View style={styles.topControlBar}>
        <TouchableOpacity
          style={[styles.controlTab, viewMode === 'full_app' && styles.controlTabActive]}
          onPress={() => {
            setViewMode('full_app');
            setSelectedBook(null);
          }}
        >
          <Text style={[styles.controlText, viewMode === 'full_app' && styles.controlTextActive]}>
            🌟 Ứng dụng Tổng hợp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlTab, viewMode === 'gio4' && styles.controlTabActive]}
          onPress={() => setViewMode('gio4')}
        >
          <Text style={[styles.controlText, viewMode === 'gio4' && styles.controlTextActive]}>
            ⏱️ Giờ 4 (Home & Detail)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlTab, viewMode === 'gio5' && styles.controlTabActive]}
          onPress={() => setViewMode('gio5')}
        >
          <Text style={[styles.controlText, viewMode === 'gio5' && styles.controlTextActive]}>
            ⏱️ Giờ 5 (Tab Bar & Cart)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vùng hiển thị nội dung chính */}
      <View style={styles.contentArea}>
        {viewMode === 'gio4' && <Gio4Screen />}
        {viewMode === 'gio5' && <Gio5Screen />}

        {viewMode === 'full_app' && (
          selectedBook ? (
            <BookDetailScreen
              book={selectedBook}
              onBack={handleBackFromDetail}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <View style={styles.fullAppContainer}>
              {/* Nội dung theo từng Tab */}
              <View style={styles.tabContentArea}>
                {currentTab === 'home' && (
                  <HomeScreen
                    cartCount={cartCount}
                    onCartPress={() => setCurrentTab('cart')}
                    onSelectBook={handleOpenDetail}
                  />
                )}
                {currentTab === 'categories' && (
                  <CategoriesScreen
                    currentTab={currentTab}
                    onSelectTab={setCurrentTab}
                    cartCount={cartCount}
                    onSelectBook={handleOpenDetail}
                  />
                )}
                {currentTab === 'cart' && (
                  <CartScreen
                    currentTab={currentTab}
                    onSelectTab={setCurrentTab}
                    onCheckoutSuccess={() => setCurrentTab('home')}
                  />
                )}
                {currentTab === 'profile' && (
                  <ProfileScreen
                    currentTab={currentTab}
                    onSelectTab={setCurrentTab}
                    cartCount={cartCount}
                  />
                )}
              </View>

              {/* Bottom Tab Bar chung cho màn hình Home, Categories, Profile */}
              {currentTab !== 'cart' && (
                <BottomTabBar
                  currentTab={currentTab}
                  onSelectTab={setCurrentTab}
                  cartCount={cartCount}
                  positionMode="fixed"
                />
              )}
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  topControlBar: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    gap: 6,
  },
  controlTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1E293B',
  },
  controlTabActive: {
    backgroundColor: '#4338CA',
  },
  controlText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#94A3B8',
  },
  controlTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  fullAppContainer: {
    flex: 1,
  },
  tabContentArea: {
    flex: 1,
  },
});
