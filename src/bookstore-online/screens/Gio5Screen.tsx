// ============================================================================
// BÀI TẬP THỰC HÀNH GIỜ 5 — BOTTOM TAB LAYOUT & HOÀN THIỆN ỨNG DỤNG
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Bao gồm:
// - Bài 1: Thanh Tab Bar dưới cùng (flexDirection: row, flex: 1, so sánh fixed vs absolute)
// - Bài 2: Màn hình Giỏ hàng (Cart Screen: 3 vùng không chồng lấp)
// ============================================================================
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BottomTabBar, TabKey } from '../components/BottomTabBar';
import { CartScreen } from './CartScreen';

export function Gio5Screen() {
  const [subExercise, setSubExercise] = useState<'ex1' | 'ex2'>(() => {
    if (typeof window !== 'undefined') {
      const q = (window.location.search + window.location.hash).toLowerCase();
      if (q.includes('ex2') || q.includes('cart')) {
        return 'ex2';
      }
    }
    return 'ex1';
  });
  const [currentTab, setCurrentTab] = useState<TabKey>('home');
  const [positionMode, setPositionMode] = useState<'fixed' | 'absolute'>('fixed');

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== 'undefined') {
        const q = (window.location.search + window.location.hash).toLowerCase();
        if (q.includes('ex2') || q.includes('cart')) {
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
      {/* Thanh chọn bài tập Giờ 5 */}
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
            Bài 1: Tab Bar tĩnh
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
            Bài 2: Màn hình Giỏ hàng
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vùng nội dung */}
      <View style={styles.content}>
        {subExercise === 'ex1' ? (
          <View style={styles.ex1Wrapper}>
            {/* Phần giải thích & thử nghiệm chế độ position */}
            <ScrollView
              style={styles.ex1Scroll}
              contentContainerStyle={[
                styles.ex1Content,
                positionMode === 'absolute' && { paddingBottom: 80 },
              ]}
            >
              <View style={styles.panel}>
                <Text style={styles.panelTitle}>
                  📌 Thử nghiệm Bottom Tab Bar (Giờ 5 - Bài 1)
                </Text>
                <Text style={styles.panelDesc}>
                  Thanh tab bar chia đều 4 mục bằng `flex: 1`, mỗi mục dùng `flexDirection: 'column'`
                  căn giữa icon và chữ. Tab đang chọn: <Text style={styles.highlight}>{currentTab.toUpperCase()}</Text>
                </Text>

                <View style={styles.modeRow}>
                  <Text style={styles.modeLabel}>Chế độ định vị:</Text>
                  <TouchableOpacity
                    style={[
                      styles.modeBtn,
                      positionMode === 'fixed' && styles.modeBtnActive,
                    ]}
                    onPress={() => setPositionMode('fixed')}
                  >
                    <Text
                      style={[
                        styles.modeBtnText,
                        positionMode === 'fixed' && styles.modeBtnTextActive,
                      ]}
                    >
                      1. Cố định ngoài Scroll (Fixed)
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.modeBtn,
                      positionMode === 'absolute' && styles.modeBtnActive,
                    ]}
                    onPress={() => setPositionMode('absolute')}
                  >
                    <Text
                      style={[
                        styles.modeBtnText,
                        positionMode === 'absolute' && styles.modeBtnTextActive,
                      ]}
                    >
                      2. Tuyệt đối đáy (Absolute)
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Bảng so sánh 2 cách đặt Tab Bar */}
                <View style={styles.compareCard}>
                  <Text style={styles.compareTitle}>
                    ⚖️ So sánh: position: 'fixed' vs position: 'absolute'
                  </Text>
                  <View style={styles.compareRow}>
                    <Text style={styles.comparePoint}>
                      • <Text style={styles.bold}>Cách 1 (Cố định ngoài ScrollView / Fixed in Normal Flow)</Text>:
                      Tab bar nằm độc lập ngay sau ScrollView (`flex: 1`). Không bao giờ đè lên nội dung
                      bên trong, không cần tính toán thủ công `paddingBottom`. Thích hợp nhất cho đa số
                      màn hình ứng dụng thông thường.
                    </Text>
                  </View>
                  <View style={styles.compareRow}>
                    <Text style={styles.comparePoint}>
                      • <Text style={styles.bold}>Cách 2 (Tuyệt đối đáy / position: 'absolute')</Text>:
                      Tab bar neo ở `bottom: 0, left: 0, right: 0`, nổi đè lên trên nội dung. Bắt buộc
                      ScrollView phải có contentContainerStyle paddingBottom: 70 để không bị che
                      phần tử cuối. Phù hợp khi muốn hiệu ứng Tab bar trong suốt hoặc cuộn mờ (blur / glassmorphism).
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Thanh Tab Bar theo chế độ đã chọn */}
            <BottomTabBar
              currentTab={currentTab}
              onSelectTab={(tab) => setCurrentTab(tab)}
              cartCount={3}
              positionMode={positionMode}
            />
          </View>
        ) : (
          <CartScreen
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
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
  ex1Wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  ex1Scroll: {
    flex: 1,
  },
  ex1Content: {
    padding: 16,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  panelDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 14,
  },
  highlight: {
    fontWeight: '700',
    color: '#4338CA',
  },
  modeRow: {
    gap: 8,
    marginBottom: 16,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
  },
  modeLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  modeBtn: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  modeBtnActive: {
    backgroundColor: '#4338CA',
  },
  modeBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  modeBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  compareCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  compareTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#312E81',
    marginBottom: 8,
  },
  compareRow: {
    marginBottom: 8,
  },
  comparePoint: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#334155',
  },
  bold: {
    fontWeight: '700',
    color: '#1E1B4B',
  },
});
