// ============================================================================
// GIỜ 2 — BÀI TẬP 1: Danh sách danh mục dạng chip (Category Chips)
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// Kỹ thuật Flexbox: flexDirection: 'row', flexWrap: 'wrap', gap: 8,
// mỗi chip có width: 'auto' tự ôm theo nội dung, bo tròn dạng pill.
// ============================================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data';

interface CategoryChipsProps {
  categories?: string[];
  onSelectCategory?: (category: string) => void;
  alignContentMode?: 'flex-start' | 'stretch' | 'center';
}

export function CategoryChips({
  categories = CATEGORIES,
  onSelectCategory,
  alignContentMode = 'flex-start',
}: CategoryChipsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');

  const handlePress = (cat: string) => {
    setSelectedCategory(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    // Container bao ngoài: xếp ngang và tự wrap xuống dòng khi tràn màn hình
    <View style={[styles.wrap, { alignContent: alignContentMode }]}>
      {categories.map((name) => {
        const isSelected = selectedCategory === name;
        return (
          <TouchableOpacity
            key={name}
            activeOpacity={0.7}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => handlePress(name)}
          >
            {/* Không set width cố định để chip tự động co giãn theo độ dài tên */}
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', // Trục chính xếp ngang
    flexWrap: 'wrap', // Tự động ngắt dòng khi tổng độ rộng các chip vượt màn hình
    gap: 8, // Khoảng cách đều giữa các chip theo cả 2 chiều ngang và dọc
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999, // Bo tròn cực đại tạo hình dáng viên thuốc (pill badge)
    borderWidth: 1,
    borderColor: '#6366F1', // Viền màu indigo theo chuẩn bài tập
    backgroundColor: '#EEF2FF',
  },
  chipSelected: {
    backgroundColor: '#4338CA',
    borderColor: '#4338CA',
  },
  chipText: {
    color: '#4338CA',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
