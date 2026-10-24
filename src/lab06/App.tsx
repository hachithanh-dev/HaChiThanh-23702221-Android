import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { PHONES } from "./src/data/phones";
import { colors } from "./src/theme";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

export default function App() {
  const [selectedEx, setSelectedEx] = useState<number>(1);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP MENU SELECTION BAR */}
      <View style={styles.menuBar}>
        <Text style={styles.menuTitle}>LAB 06: NAVIGATION</Text>
        <View style={styles.buttonRow}>
          {[1, 2, 3, 4, 5].map((num) => {
            const isActive = selectedEx === num;
            return (
              <Pressable
                key={num}
                style={[styles.menuBtn, isActive && styles.menuBtnActive]}
                onPress={() => setSelectedEx(num)}
              >
                <Text
                  style={[
                    styles.menuBtnText,
                    isActive && styles.menuBtnTextActive,
                  ]}
                >
                  Bài {num}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* RENDER EXERCISE VIEW */}
      <View style={styles.content}>
        {selectedEx === 1 && <SelectPhoneApp phone={PHONES[0]} />}
        {selectedEx === 2 && <SelectPhoneApi />}
        {selectedEx === 3 && <BottomTabApp />}
        {selectedEx === 4 && <StackTabApp />}
        {selectedEx === 5 && <DrawerApp />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  menuBar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.navy,
    letterSpacing: 0.8,
    marginBottom: 8,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  menuBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  menuBtnActive: {
    backgroundColor: colors.navy,
  },
  menuBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },
  menuBtnTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
});
