import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids, toggle } = useFavorites();

  const favoritePhones = PHONES.filter((p) => ids.includes(p.id));

  if (favoritePhones.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Ionicons name="heart-dislike-outline" size={64} color={colors.line} />
        <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
        <Text style={styles.emptySubtitle}>
          Hãy bấm biểu tượng ♡ ở màn hình chi tiết sản phẩm để lưu lại những mẫu điện thoại bạn yêu thích nhé!
        </Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: Phone }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
      >
        <Image
          source={PHONE_COLORS[item.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.supplier}>Cung cấp: {item.supplier}</Text>
        </View>

        <Pressable
          style={styles.removeBtn}
          onPress={() => toggle(item.id)}
          hitSlop={10}
        >
          <Ionicons name="trash-outline" size={20} color={colors.muted} />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={favoritePhones}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
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
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: {
    width: 70,
    height: 80,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 2,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
  },
  removeBtn: {
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
  },
});
