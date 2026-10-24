import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.center}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.title}>Đã có lỗi xảy ra</Text>
        <Text style={styles.msg}>{message}</Text>
        {onRetry && (
          <Pressable style={styles.btn} onPress={onRetry}>
            <Text style={styles.btnText}>THỬ LẠI</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    fontSize: 36,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#991B1B",
    marginBottom: 6,
  },
  msg: {
    fontSize: 13,
    color: "#7F1D1D",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },
  btn: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
