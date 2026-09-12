// ============================================================================
// GIỜ 3 — BÀI TẬP 1: Badge giảm giá / Nhãn 'Mới' trên bìa sách
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Kỹ thuật Flexbox / Positioning:
// View cha bọc ảnh có position: 'relative' làm containing block;
// Badge có position: 'absolute', top: 6, left: 6 neo chính xác vào góc trên-trái.
// ============================================================================
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DiscountBadgeProps {
  discountPercent?: number;
  isNew?: boolean;
}

export function DiscountBadge({ discountPercent, isNew }: DiscountBadgeProps) {
  // Nếu sách thông thường (không giảm giá và không phải sách mới) -> không render
  if (!discountPercent && !isNew) {
    return null;
  }

  return (
    // Badge thoát khỏi luồng bố cục bình thường, neo theo góc trên-trái của View cha
    <View style={[styles.badge, isNew && styles.badgeNew]}>
      <Text style={styles.badgeText}>
        {isNew ? 'Mới' : `-${discountPercent}%`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute', // Định vị tuyệt đối theo containing block cha
    top: 6,
    left: 6, // Neo góc trên-trái
    backgroundColor: '#DC2626', // Màu đỏ nổi bật cho giảm giá
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 10,
    elevation: 3,
  },
  badgeNew: {
    backgroundColor: '#F97316', // Màu cam nổi bật cho nhãn sách Mới
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
