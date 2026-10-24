import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { SelectPhoneParamList } from "./ProductScreen";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  // Khởi tạo state màu đã chọn từ route.params (nếu có)
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);

  // Tách tên thành 2 dòng: "Điện Thoại Vsmart Joy 3" và "Hàng chính hãng"
  const [line1, line2] = phone.name.split(" - ");

  // Xử lý khi nhấn nút XONG
  const handleDone = () => {
    // Truyền param color về lại màn hình Product với tùy chọn merge: true
    navigation.navigate("Product", { color: picked });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* 1. NỬA TRÊN: NỀN TRẮNG HIỂN THỊ THÔNG TIN TÓM TẮT */}
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.titleLine}>{line1}</Text>
          {line2 && <Text style={styles.subLine}>{line2}</Text>}

          {/* TODO 3: CHỈ KHI đã chọn màu (picked khác undefined) mới hiện thêm 3 dòng */}
          {picked !== undefined && (
            <View style={styles.selectedDetailBox}>
              <Text style={styles.detailText}>
                Màu:{" "}
                <Text style={styles.boldText}>
                  {PHONE_COLORS[picked].label}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Cung cấp bởi{" "}
                <Text style={styles.boldText}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceText}>{formatPrice(phone.price)}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 2. NỬA DƯỚI: NỀN XÁM CHỨA 4 Ô MÀU & NÚT XONG */}
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => {
            const isSelected = picked === key;
            return (
              <Pressable
                key={key}
                onPress={() => setPicked(key)}
                style={[
                  styles.swatch,
                  { backgroundColor: PHONE_COLORS[key].hex },
                  isSelected && styles.swatchOn,
                ]}
              />
            );
          })}
        </View>

        {/* TODO 4: Nút XONG nền colors.blue, bo góc 6, chữ trắng đậm */}
        <Pressable style={styles.doneBtn} onPress={handleDone}>
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  thumb: {
    width: 104,
    height: 124,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  titleLine: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    lineHeight: 20,
  },
  subLine: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 4,
  },
  selectedDetailBox: {
    marginTop: 4,
    gap: 2,
  },
  detailText: {
    fontSize: 13,
    color: colors.text,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000000",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 2,
  },
  body: {
    flex: 1,
    backgroundColor: colors.grey, // #C4C4C4
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  hint: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  swatches: {
    alignItems: "center",
    gap: 14,
    flex: 1,
    justifyContent: "center",
  },
  swatch: {
    width: 85,
    height: 80,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: "#0B1F5C", // Viền màu xanh đậm báo hiệu đang chọn
    transform: [{ scale: 1.05 }],
  },
  doneBtn: {
    backgroundColor: colors.blue, // #4F63C8
    height: 46,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  doneBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
