// ============================================================================
// GIỜ 5: MÀN HÌNH TÀI KHOẢN (PROFILE SCREEN) — TAB TÀI KHOẢN
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BottomTabBar, TabKey } from '../components/BottomTabBar';

interface ProfileScreenProps {
  currentTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
  cartCount?: number;
}

export function ProfileScreen({
  currentTab = 'profile',
  onSelectTab = () => {},
  cartCount = 0,
}: ProfileScreenProps) {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Thông tin tài khoản</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>HT</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Hà Chí Thanh</Text>
            <Text style={styles.userMSSV}>MSSV: 23702221</Text>
            <Text style={styles.userRole}>Thành viên Kim Cương 💎</Text>
          </View>
        </View>

        {/* Thống kê mua hàng */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>35</Text>
            <Text style={styles.statLabel}>Cuốn sách</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>4.8k</Text>
            <Text style={styles.statLabel}>Điểm thưởng</Text>
          </View>
        </View>

        {/* Menu cài đặt */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuIcon}>📦</Text>
            <Text style={styles.menuLabel}>Lịch sử mua hàng</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuIcon}>❤️</Text>
            <Text style={styles.menuLabel}>Danh sách sách yêu thích</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuIcon}>📍</Text>
            <Text style={styles.menuLabel}>Địa chỉ nhận hàng</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuRow}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuLabel}>Cài đặt ứng dụng</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Thông tin học phần */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>📚 BookStore Online App</Text>
          <Text style={styles.aboutText}>
            Học phần: Thực hành Lập trình Thiết bị Di động (Android / React Native)
          </Text>
          <Text style={styles.aboutText}>
            Chủ đề: Layout Flexbox tuần 4 (Giờ 4: ScrollView, SafeAreaView | Giờ 5: Bottom Tab Bar)
          </Text>
          <Text style={styles.aboutText}>
            Sinh viên: Hà Chí Thanh — MSSV: 23702221
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 56,
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4338CA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  userMSSV: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4338CA',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  menuArrow: {
    fontSize: 18,
    color: '#94A3B8',
  },
  aboutCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  aboutTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#312E81',
    marginBottom: 6,
  },
  aboutText: {
    fontSize: 12,
    color: '#4338CA',
    lineHeight: 18,
    marginBottom: 3,
  },
});
