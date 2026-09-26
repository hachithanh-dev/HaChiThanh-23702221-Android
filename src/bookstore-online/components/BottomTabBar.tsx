// ============================================================================
// GIỜ 5 — BÀI TẬP 1: THANH TAB BAR DƯỚI CÙNG (BOTTOM TAB BAR)
// Đề bài: Dựng thanh tab bar cố định ở đáy màn hình gồm 4 mục:
// Trang chủ, Danh mục, Giỏ hàng, Tài khoản — icon phía trên, chữ phía dưới,
// mục đang chọn có màu nổi bật.
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type TabKey = 'home' | 'categories' | 'cart' | 'profile';

export interface TabItem {
  key: TabKey;
  label: string;
  icon: string;
  badge?: number;
}

export const TABS: TabItem[] = [
  { key: 'home', label: 'Trang chủ', icon: '🏠' },
  { key: 'categories', label: 'Danh mục', icon: '📑' },
  { key: 'cart', label: 'Giỏ hàng', icon: '🛒' },
  { key: 'profile', label: 'Tài khoản', icon: '👤' },
];

interface BottomTabBarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  cartCount?: number;
  /**
   * Chế độ định vị:
   * - 'fixed': Đặt cố định trong luồng layout cha (ngoài ScrollView, dưới đáy container flex: 1)
   * - 'absolute': Đặt position: 'absolute', bottom: 0, left: 0, right: 0
   */
  positionMode?: 'fixed' | 'absolute';
}

export function BottomTabBar({
  currentTab,
  onSelectTab,
  cartCount = 0,
  positionMode = 'fixed',
}: BottomTabBarProps) {
  return (
    <View
      style={[
        styles.container,
        positionMode === 'absolute' && styles.containerAbsolute,
      ]}
    >
      {TABS.map((tab) => {
        const isActive = currentTab === tab.key;
        const badgeValue = tab.key === 'cart' ? cartCount : tab.badge;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => onSelectTab(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            {/* Vùng icon phía trên kèm badge giỏ hàng nếu có */}
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, isActive && styles.iconActive]}>
                {tab.icon}
              </Text>

              {badgeValue !== undefined && badgeValue > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {badgeValue > 99 ? '99+' : badgeValue}
                  </Text>
                </View>
              )}
            </View>

            {/* Chữ mô tả tab phía dưới */}
            <Text
              style={[
                styles.labelText,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>

            {/* Dấu chấm/vạch chỉ báo tab đang chọn */}
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container tab bar: flexDirection: 'row' chia đều các tab ngang đáy
  container: {
    flexDirection: 'row',
    height: 62,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6,
    // Đổ bóng tinh tế
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 900,
  },
  // Chế độ position: 'absolute' ở đáy màn hình
  containerAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  // Mỗi mục tab: flex: 1 để chia đều 4 phần bằng nhau;
  // flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 28,
  },
  iconText: {
    fontSize: 20,
  },
  iconActive: {
    transform: [{ scale: 1.1 }],
  },
  // Badge số lượng trên icon tab
  badge: {
    position: 'absolute',
    top: -3,
    right: -8,
    backgroundColor: '#EF4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  // Nhãn chữ phía dưới
  labelText: {
    fontSize: 11,
    marginTop: 2,
  },
  labelInactive: {
    color: '#64748B',
    fontWeight: '500',
  },
  labelActive: {
    color: '#4338CA', // Indigo nổi bật cho tab đang chọn
    fontWeight: '700',
  },
  // Thanh chỉ báo active nhỏ xinh phía dưới
  activeIndicator: {
    position: 'absolute',
    bottom: 1,
    width: 20,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#4338CA',
  },
});
