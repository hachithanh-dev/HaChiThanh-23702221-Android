// ============================================================================
// BÀI TẬP THỰC HÀNH REACT NATIVE — TUẦN 3
// Chủ đề: LAYOUT với Flexbox — Ứng dụng BookStore Online
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { Gio1Screen } from './screens/Gio1Screen';
import { Gio2Screen } from './screens/Gio2Screen';
import { Gio3Screen } from './screens/Gio3Screen';

type TabType = 'home' | 'gio1' | 'gio2' | 'gio3';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Thanh chuyển đổi chế độ xem nhanh giữa các Bài tập Giờ 1, 2, 3 và Trang chủ Tổng hợp */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navTab, activeTab === 'home' && styles.navTabActive]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
            🏠 Tổng hợp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTab, activeTab === 'gio1' && styles.navTabActive]}
          onPress={() => setActiveTab('gio1')}
        >
          <Text style={[styles.navText, activeTab === 'gio1' && styles.navTextActive]}>
            ⏱️ Giờ 1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTab, activeTab === 'gio2' && styles.navTabActive]}
          onPress={() => setActiveTab('gio2')}
        >
          <Text style={[styles.navText, activeTab === 'gio2' && styles.navTextActive]}>
            ⏱️ Giờ 2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navTab, activeTab === 'gio3' && styles.navTabActive]}
          onPress={() => setActiveTab('gio3')}
        >
          <Text style={[styles.navText, activeTab === 'gio3' && styles.navTextActive]}>
            ⏱️ Giờ 3
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vùng hiển thị màn hình được chọn */}
      <View style={styles.contentContainer}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'gio1' && <Gio1Screen />}
        {activeTab === 'gio2' && <Gio2Screen />}
        {activeTab === 'gio3' && <Gio3Screen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    gap: 6,
  },
  navTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1E293B',
  },
  navTabActive: {
    backgroundColor: '#4338CA',
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
