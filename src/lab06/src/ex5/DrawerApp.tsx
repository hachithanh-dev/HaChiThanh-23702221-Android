import React, { createContext, useContext, useState } from "react";
import { View, Text, Switch, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (NÂNG CAO): Quản lý cài đặt giao diện tập trung qua ThemeContext
interface AppSettingsContextType {
  notify: boolean;
  setNotify: (val: boolean) => void;
  dark: boolean;
  setDark: (val: boolean) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType>({
  notify: true,
  setNotify: () => {},
  dark: false,
  setDark: () => {},
});

// ============================================================================
// 1. MÀN HÌNH TRANG CHỦ (HOME SCREEN)
// ============================================================================
function HomeScreen() {
  const { dark } = useContext(AppSettingsContext);
  return (
    <SafeAreaView style={[styles.center, dark && styles.darkBg]}>
      <Text style={styles.welcomeEmoji}>👋</Text>
      <Text style={[styles.bigTitle, dark && styles.darkText]}>
        Xin chào sinh viên IUH!
      </Text>
      <Text style={[styles.subtitle, dark && styles.darkMuted]}>
        Ứng dụng thực hành React Native Navigation — Lab 06
      </Text>
      <View style={[styles.card, dark && styles.darkCard]}>
        <Text style={[styles.cardTitle, dark && styles.darkText]}>
          Hướng dẫn thao tác:
        </Text>
        <Text style={[styles.cardItem, dark && styles.darkMuted]}>
          • Vuốt từ cạnh trái màn hình sang phải hoặc bấm biểu tượng ☰ trên góc trái thanh header để mở Drawer Menu.
        </Text>
        <Text style={[styles.cardItem, dark && styles.darkMuted]}>
          • Chọn các mục để điều hướng: Trang chủ, Hồ sơ cá nhân, Cài đặt hệ thống.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ============================================================================
// 2. MÀN HÌNH HỒ SƠ (PROFILE SCREEN)
// ============================================================================
function ProfileScreen() {
  const { dark } = useContext(AppSettingsContext);
  return (
    <SafeAreaView style={[styles.center, dark && styles.darkBg]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>HT</Text>
      </View>
      <Text style={[styles.profileName, dark && styles.darkText]}>
        Hà Chí Thanh
      </Text>
      <Text style={styles.profileMssv}>MSSV: 23702221</Text>
      <Text style={[styles.subtitle, dark && styles.darkMuted]}>
        hachithanh.dev@gmail.com
      </Text>

      <View style={[styles.card, dark && styles.darkCard, { width: "90%", marginTop: 24 }]}>
        <View style={styles.rowInfo}>
          <Text style={[styles.infoKey, dark && styles.darkText]}>Trường đào tạo:</Text>
          <Text style={[styles.infoVal, dark && styles.darkMuted]}>ĐH Công Nghiệp TP.HCM</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={[styles.infoKey, dark && styles.darkText]}>Chuyên ngành:</Text>
          <Text style={[styles.infoVal, dark && styles.darkMuted]}>Kỹ thuật Phần mềm</Text>
        </View>
        <View style={styles.rowInfo}>
          <Text style={[styles.infoKey, dark && styles.darkText]}>Trạng thái:</Text>
          <Text style={{ color: "#16A34A", fontWeight: "bold" }}>Sinh viên chính quy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ============================================================================
// 3. MÀN HÌNH CÀI ĐẶT (SETTINGS SCREEN) - TODO 1
// ============================================================================
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useContext(AppSettingsContext);

  return (
    <SafeAreaView style={[styles.container, dark && styles.darkBg]}>
      <Text style={[styles.sectionTitle, dark && styles.darkText]}>
        Tùy chọn hệ thống
      </Text>

      <View style={[styles.settingsCard, dark && styles.darkCard]}>
        {/* Switch 1: Nhận thông báo */}
        <View style={styles.switchRow}>
          <View style={styles.switchLabelWrap}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={dark ? "#94A3B8" : colors.text}
            />
            <Text style={[styles.switchText, dark && styles.darkText]}>
              Nhận thông báo
            </Text>
          </View>
          <Switch
            value={notify}
            onValueChange={setNotify}
            trackColor={{ false: "#CBD5E1", true: colors.red }}
            thumbColor={"#FFFFFF"}
          />
        </View>

        <View style={[styles.divider, dark && styles.darkDivider]} />

        {/* Switch 2: Giao diện tối (Dark mode) */}
        <View style={styles.switchRow}>
          <View style={styles.switchLabelWrap}>
            <Ionicons
              name="moon-outline"
              size={22}
              color={dark ? "#94A3B8" : colors.text}
            />
            <Text style={[styles.switchText, dark && styles.darkText]}>
              Chế độ giao diện tối
            </Text>
          </View>
          <Switch
            value={dark}
            onValueChange={setDark}
            trackColor={{ false: "#CBD5E1", true: colors.blue }}
            thumbColor={"#FFFFFF"}
          />
        </View>
      </View>

      {/* Dòng trạng thái tổng hợp */}
      <View style={[styles.statusBox, dark && styles.darkStatusBox]}>
        <Text style={[styles.statusText, dark && styles.darkText]}>
          Thông báo:{" "}
          <Text style={{ fontWeight: "bold", color: notify ? "#16A34A" : colors.red }}>
            {notify ? "BẬT" : "TẮT"}
          </Text>
          {" · "}
          Giao diện:{" "}
          <Text style={{ fontWeight: "bold", color: dark ? colors.blue : "#D97706" }}>
            {dark ? "tối" : "sáng"}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ============================================================================
// 4. MAIN DRAWER APP - TODO 2
// ============================================================================
export function DrawerApp() {
  const [notify, setNotify] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(false);

  return (
    <AppSettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <NavigationContainer independent={true}>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerInactiveTintColor: dark ? "#94A3B8" : colors.muted,
            drawerStyle: {
              backgroundColor: dark ? "#0F172A" : "#FFFFFF",
              width: 270,
            },
            headerStyle: {
              backgroundColor: dark ? "#1E293B" : "#FFFFFF",
            },
            headerTintColor: dark ? "#F8FAFC" : colors.text,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            drawerIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Trang chủ" }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Hồ sơ cá nhân" }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Cài đặt hệ thống" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppSettingsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },
  darkBg: {
    backgroundColor: "#0F172A",
  },
  bigTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  welcomeEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
  },
  darkText: {
    color: "#F8FAFC",
  },
  darkMuted: {
    color: "#94A3B8",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  darkCard: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  cardItem: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.navy,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 2,
  },
  profileMssv: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.blue,
    marginBottom: 4,
  },
  rowInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoKey: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
  },
  infoVal: {
    fontSize: 13,
    color: colors.muted,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  switchLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  switchText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  darkDivider: {
    backgroundColor: "#334155",
  },
  statusBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  darkStatusBox: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  statusText: {
    fontSize: 14,
    color: colors.text,
  },
});
