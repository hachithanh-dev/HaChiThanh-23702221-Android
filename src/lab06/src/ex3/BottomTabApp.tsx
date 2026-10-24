import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Cặp icon tương ứng cho trạng thái [khi chọn (filled), khi không chọn (outline)]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

// ============================================================================
// 1. TAB HOME (TRANG CHỦ)
// ============================================================================
function HomeTab() {
  const renderItem = ({ item }: { item: Phone }) => {
    return (
      <View style={styles.card}>
        <Image
          source={PHONE_COLORS[item.defaultColor].image}
          style={styles.cardThumb}
          resizeMode="contain"
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.row}>
            <Stars value={item.rating} size={14} />
            <Text style={styles.cardReview}>({item.reviewCount})</Text>
          </View>
          <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
          <View style={styles.badgeBox}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.tabRoot}>
      <FlatList
        data={PHONES}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ============================================================================
// 2. TAB SEARCH (TÌM KIẾM SẢN PHẨM) - TODO 1
// ============================================================================
function SearchTab() {
  const [keyword, setKeyword] = useState("");

  const filtered = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.tabRoot}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Nhập từ khóa tìm kiếm (ví dụ: joy, aris...)"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {keyword.trim() !== "" && filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>
            Không có kết quả cho “{keyword}”
          </Text>
          <Text style={styles.emptySubText}>
            Vui lòng thử lại với từ khóa khác (Joy, Live, Star, Aris...)
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={PHONE_COLORS[item.defaultColor].image}
                style={styles.cardThumb}
                resizeMode="contain"
              />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
                <Text style={styles.cardSupplier}>Cung cấp bởi: {item.supplier}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

// ============================================================================
// 3. TAB PROFILE (HỒ SƠ CÁ NHÂN) - TODO 2
// ============================================================================
function ProfileTab() {
  return (
    <SafeAreaView style={styles.tabRoot}>
      <View style={styles.profileWrap}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>HT</Text>
        </View>
        <Text style={styles.profileName}>Hà Chí Thanh</Text>
        <Text style={styles.profileMssv}>MSSV: 23702221</Text>
        <Text style={styles.profileEmail}>hachithanh.dev@gmail.com</Text>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={20} color={colors.blue} />
            <Text style={styles.infoLabel}>Trường ĐH Công Nghiệp TP.HCM (IUH)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="code-slash-outline" size={20} color={colors.blue} />
            <Text style={styles.infoLabel}>Khoa Công Nghệ Thông Tin</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="phone-portrait-outline" size={20} color={colors.blue} />
            <Text style={styles.infoLabel}>Học phần: Lập trình Di động (React Native)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#16A34A" />
            <Text style={styles.infoLabel}>Lab 06 — Navigation (Bottom Tab, Stack, Drawer)</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ============================================================================
// 4. MAIN BOTTOM TAB APP - TODO 3
// ============================================================================
export function BottomTabApp() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "bold", color: colors.text },
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
            backgroundColor: "#FFFFFF",
            borderTopColor: colors.line,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = ICONS[route.name][focused ? 0 : 1];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabRoot: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardThumb: {
    width: 80,
    height: 90,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  cardReview: {
    fontSize: 12,
    color: colors.muted,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 4,
  },
  cardSupplier: {
    fontSize: 12,
    color: colors.muted,
  },
  badgeBox: {
    alignSelf: "flex-start",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.red,
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
  },
  profileWrap: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.navy,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  profileMssv: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.blue,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 24,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
    flex: 1,
  },
});
