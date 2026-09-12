// ============================================================================
// GIỜ 3 — BÀI TẬP 2: Nút giỏ hàng nổi (Floating Cart Button)
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Kỹ thuật Flexbox / Positioning:
// Cơ chế Containing Block LỒNG NHAU:
// - Nút tròn chính định vị absolute neo theo toàn màn hình (bottom: 24, right: 20).
// - Badge số lượng định vị absolute neo theo chính nút tròn (top: -4, right: -4).
// ============================================================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FloatingCartButtonProps {
  count: number;
  onPress: () => void;
}

const BUTTON_SIZE = 56;

export function FloatingCartButton({ count, onPress }: FloatingCartButtonProps) {
  return (
    // Nút tròn chính: absolute, neo theo góc dưới-phải màn hình cha
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.button}
      onPress={onPress}
      accessibilityLabel="Giỏ hàng"
      accessibilityRole="button"
    >
      <Text style={styles.buttonIcon}>🛒</Text>

      {/* Badge số lượng: absolute lần 2, neo theo góc trên-phải của chính nút tròn */}
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute', // Định vị tuyệt đối trên toàn màn hình
    bottom: 24, // Cách đáy màn hình 24px
    right: 20, // Cách mép phải 20px
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2, // width = height và borderRadius = 1/2 -> tạo hình tròn
    backgroundColor: '#4338CA', // Màu indigo nổi bật
    alignItems: 'center', // Căn giữa icon giỏ hàng theo chiều ngang
    justifyContent: 'center', // Căn giữa icon theo chiều dọc
    elevation: 6, // Đổ bóng nổi trên Android
    shadowColor: '#000000', // Đổ bóng trên iOS/Web
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 999, // Luôn nổi trên mọi nội dung cuộn bên dưới
  },
  buttonIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute', // Neo tuyệt đối theo nút tròn
    top: -4, // Đẩy tràn nhẹ ra góc trên
    right: -4, // Đẩy tràn nhẹ ra góc phải
    minWidth: 22,
    height: 22,
    borderRadius: 11, // Bo tròn dạng viên thuốc nhỏ
    backgroundColor: '#DC2626', // Màu đỏ báo số lượng
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF', // Viền trắng phân cách nút tròn
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
