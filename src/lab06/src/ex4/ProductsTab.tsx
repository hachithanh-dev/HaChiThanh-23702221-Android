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
import { Stars } from "../components/Stars";
import { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  const { has } = useFavorites();

  const renderItem = ({ item }: { item: Phone }) => {
    const isFav = has(item.id);

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
          <View style={styles.row}>
            <Stars value={item.rating} size={14} />
            <Text style={styles.review}>({item.reviewCount})</Text>
          </View>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.supplier}>Cung cấp bởi: {item.supplier}</Text>
        </View>

        <View style={styles.favIndicator}>
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={22}
            color={isFav ? colors.red : colors.muted}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
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
    position: "relative",
  },
  thumb: {
    width: 80,
    height: 90,
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
    lineHeight: 18,
    marginBottom: 4,
    paddingRight: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  review: {
    fontSize: 12,
    color: colors.muted,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 2,
  },
  supplier: {
    fontSize: 12,
    color: colors.muted,
  },
  favIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
  },
});
