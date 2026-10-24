import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { RootProps } from "./types";
import { useFavorites } from "./FavoritesContext";

export function ProductDetailsScreen({
  route,
  navigation,
}: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const { has, toggle } = useFavorites();

  const phone = PHONES.find((p) => p.id === id);

  if (!phone) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.notFound}>Không tìm thấy sản phẩm #{id}</Text>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Quay lại danh sách</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const isFav = has(phone.id);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* KHU VỰC ẢNH SẢN PHẨM */}
        <View style={styles.imageWrap}>
          <Image
            source={PHONE_COLORS[phone.defaultColor].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* THÔNG TIN CHI TIẾT */}
        <View style={styles.info}>
          <Text style={styles.name}>{phone.name}</Text>

          <View style={styles.row}>
            <Stars value={phone.rating} size={18} />
            <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá thực tế)</Text>
          </View>

          <View style={styles.rowPrice}>
            <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          </View>

          <View style={styles.badgeRow}>
            <Text style={styles.badge}>{phone.badge}</Text>
          </View>

          <View style={styles.supplierCard}>
            <Text style={styles.supplierTitle}>Thông tin phân phối & bảo hành</Text>
            <Text style={styles.supplierItem}>• Cung cấp bởi: <Text style={styles.bold}>{phone.supplier}</Text></Text>
            <Text style={styles.supplierItem}>• Bảo hành: <Text style={styles.bold}>18 tháng chính hãng</Text></Text>
            <Text style={styles.supplierItem}>• Đổi trả: <Text style={styles.bold}>1 đổi 1 trong 30 ngày nếu có lỗi</Text></Text>
          </View>

          {/* NÚT LƯU YÊU THÍCH / BỎ LƯU */}
          <Pressable
            style={[styles.favBtn, isFav && styles.favBtnActive]}
            onPress={() => toggle(phone.id)}
          >
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={22}
              color={isFav ? "#FFFFFF" : colors.red}
            />
            <Text style={[styles.favBtnText, isFav && styles.favBtnTextActive]}>
              {isFav ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    padding: 20,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFound: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  imageWrap: {
    width: "100%",
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    width: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    lineHeight: 24,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  review: {
    fontSize: 13,
    color: colors.muted,
  },
  rowPrice: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.red,
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badgeRow: {
    marginBottom: 16,
  },
  badge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.red,
    backgroundColor: "#FEE2E2",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  supplierCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 6,
  },
  supplierTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  supplierItem: {
    fontSize: 13,
    color: colors.text,
  },
  bold: {
    fontWeight: "bold",
  },
  favBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.red,
    backgroundColor: "#FFFFFF",
    gap: 10,
  },
  favBtnActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },
  favBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
  },
  favBtnTextActive: {
    color: "#FFFFFF",
  },
});
