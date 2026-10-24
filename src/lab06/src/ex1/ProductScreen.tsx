import React from "react";
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
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";

export type SelectPhoneParamList = {
  Product: { color?: ColorKey } | undefined;
  ChooseColor: { color?: ColorKey } | undefined;
};

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  // Lấy màu được truyền về từ màn hình ChooseColor qua route.params
  const picked = route.params?.color;
  // Nếu chưa chọn màu mới, dùng defaultColor của điện thoại (xanh)
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      {/* 1. KHU VỰC ẢNH SẢN PHẨM */}
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* 2. KHU VỰC THÔNG TIN SẢN PHẨM */}
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.rowRating}>
          <Stars value={phone.rating} size={18} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.rowPrice}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.rowBadge}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.questionCircle}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>

        {/* TODO 1: Nút chọn màu / chọn loại theo trạng thái picked */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>›</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút CHỌN MUA nằm sát đáy màn hình */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.buyBtn}
          onPress={() => alert(`Đặt mua thành công sản phẩm: ${phone.name} (Màu: ${PHONE_COLORS[shown].label})`)}
        >
          <Text style={styles.buyBtnText}>CHỌN MUA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: "85%",
    height: "100%",
    maxHeight: 340,
  },
  info: {
    paddingBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  rowRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  review: {
    fontSize: 13,
    color: colors.muted,
  },
  rowPrice: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
    gap: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  oldPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  rowBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
  },
  questionCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.text,
  },
  chooseBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    height: 44,
    backgroundColor: "#FFFFFF",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chooseBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    letterSpacing: 0.5,
  },
  arrowIcon: {
    position: "absolute",
    right: 14,
    fontSize: 22,
    fontWeight: "600",
    color: colors.text,
  },
  bottomBar: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  buyBtn: {
    backgroundColor: colors.red,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
