// ============================================================================
// GIỜ 1 — BÀI TẬP 1: Header ứng dụng BookStore
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Kỹ thuật Flexbox: flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
// ============================================================================
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title?: string;
  onSearchPress?: () => void;
  onCartPress?: () => void;
}

export function Header({ title = '📚 BookStore', onSearchPress, onCartPress }: HeaderProps) {
  return (
    // Container header: xếp ngang (row), 2 đầu dãn cách xa nhất (space-between),
    // căn giữa theo chiều dọc trục chéo (center), padding ngang 16, chiều cao cố định 56.
    <View style={styles.header}>
      {/* Logo / Tên thương hiệu ứng dụng bên trái */}
      <Text style={styles.logo}>{title}</Text>

      {/* Nhóm 2 icon bên phải: View con xếp ngang với khoảng cách gap: 14 */}
      <View style={styles.iconGroup}>
        <TouchableOpacity activeOpacity={0.7} onPress={onSearchPress}>
          <Text style={styles.icon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onCartPress}>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Trục chính xếp ngang
    justifyContent: 'space-between', // Đẩy logo sang trái, iconGroup sang phải
    alignItems: 'center', // Căn giữa nội dung theo chiều dọc
    height: 56, // Chiều cao cố định theo yêu cầu
    paddingHorizontal: 16, // Khoảng cách đệm ngang 16
    backgroundColor: '#1E1B4B', // Màu navy/indigo chủ đạo của khóa học
    elevation: 4, // Đổ bóng nhẹ trên Android
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  iconGroup: {
    flexDirection: 'row', // Hai icon nằm cạnh nhau theo hàng ngang
    alignItems: 'center',
    gap: 14, // Khoảng cách đều giữa các icon
  },
  icon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
