// ============================================================================
// GIỜ 5 — BÀI TẬP 2: MÀN HÌNH GIỎ HÀNG (CART SCREEN)
// Đề bài: Dựng màn hình giỏ hàng: danh sách các sản phẩm đã thêm (ảnh nhỏ -
// tên - số lượng - giá, mỗi dòng dạng row), phần tổng tiền + nút 'Thanh toán'
// cố định phía dưới, phía dưới cùng có Tab Bar của Bài tập 1.
// Sinh viên: Hà Chí Thanh — MSSV: 23702221
// ============================================================================
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { CART_ITEMS, CartItem } from '../data';
import { BottomTabBar, TabKey } from '../components/BottomTabBar';

interface CartScreenProps {
  currentTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
  onCheckoutSuccess?: () => void;
}

export function CartScreen({
  currentTab = 'cart',
  onSelectTab = () => {},
  onCheckoutSuccess,
}: CartScreenProps) {
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);
  const [checkoutModal, setCheckoutModal] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const q = (window.location.search + window.location.hash).toLowerCase();
      if (q.includes('checkout')) return true;
    }
    return false;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = (window.location.search + window.location.hash).toLowerCase();
      if (q.includes('checkout')) setCheckoutModal(true);
    }
  }, []);

  // Cập nhật số lượng
  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Tính tổng số lượng & tổng tiền
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.book.discountPercent
      ? Math.round(item.book.price * (1 - item.book.discountPercent / 100))
      : item.book.price;
    return sum + unitPrice * item.quantity;
  }, 0);
  const shippingFee = subtotal > 200000 || subtotal === 0 ? 0 : 25000;
  const grandTotal = subtotal + shippingFee;

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    setCheckoutModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header giỏ hàng cố định trên cùng */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Giỏ hàng của bạn</Text>
        <Text style={styles.headerSubtitle}>
          {totalQuantity} sản phẩm trong giỏ
        </Text>
      </View>

      {/* Modal xác nhận thanh toán mô phỏng */}
      {checkoutModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🎉 Đặt hàng thành công!</Text>
            <Text style={styles.modalDesc}>
              Cảm ơn bạn đã mua hàng tại BookStore Online. Đơn hàng trị giá{' '}
              <Text style={styles.modalHighlight}>
                {grandTotal.toLocaleString('vi-VN')} đ
              </Text>{' '}
              đang được chuẩn bị giao đến bạn!
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setCheckoutModal(false);
                if (onCheckoutSuccess) onCheckoutSuccess();
              }}
            >
              <Text style={styles.modalBtnText}>Tiếp tục mua sách</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 2. VÙNG 1: Danh sách sản phẩm CUỘN ĐƯỢC (ScrollView flex: 1) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛍️</Text>
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => onSelectTab('home')}
            >
              <Text style={styles.emptyBtnText}>Khám phá sách ngay</Text>
            </TouchableOpacity>
          </View>
        ) : (
          items.map((item) => {
            const unitPrice = item.book.discountPercent
              ? Math.round(
                  item.book.price * (1 - item.book.discountPercent / 100)
                )
              : item.book.price;
            const lineTotal = unitPrice * item.quantity;

            return (
              // Mỗi dòng sản phẩm: flexDirection: 'row', alignItems: 'center'
              <View key={item.book.id} style={styles.itemRow}>
                {/* 2.1. Ảnh bìa nhỏ cố định width/height */}
                <Image
                  source={{ uri: item.book.cover }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />

                {/* 2.2. Khối thông tin giữa: flex: 1 chiếm không gian còn lại */}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.book.title}
                  </Text>
                  <Text style={styles.itemAuthor} numberOfLines={1}>
                    Tác giả: {item.book.author}
                  </Text>
                  <Text style={styles.itemUnitPrice}>
                    {unitPrice.toLocaleString('vi-VN')} đ
                  </Text>
                </View>

                {/* 2.3. Cột số lượng & giá thành tiền: width cố định */}
                <View style={styles.itemActions}>
                  <Text style={styles.itemLineTotal}>
                    {lineTotal.toLocaleString('vi-VN')} đ
                  </Text>
                  <View style={styles.qtyControl}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.book.id, -1)}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.book.id, 1)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Thông tin ưu đãi / Voucher đệm trong danh sách cuộn */}
        {items.length > 0 && (
          <View style={styles.couponCard}>
            <Text style={styles.couponTitle}>🎟️ Mã giảm giá BookStore</Text>
            <Text style={styles.couponSub}>
              Đơn hàng trên 200.000 đ được Miễn phí giao hàng toàn quốc!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 3. VÙNG 2: Thanh tổng tiền + Nút 'Thanh toán' CỐ ĐỊNH phía dưới (KHÔNG cuộn, ngay trên Tab Bar) */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryDetails}>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Tạm tính:</Text>
            <Text style={styles.summaryValue}>
              {subtotal.toLocaleString('vi-VN')} đ
            </Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Vận chuyển:</Text>
            <Text
              style={[
                styles.summaryValue,
                shippingFee === 0 && styles.freeShipping,
              ]}
            >
              {shippingFee === 0
                ? 'Miễn phí'
                : `${shippingFee.toLocaleString('vi-VN')} đ`}
            </Text>
          </View>
          <View style={styles.grandTotalLine}>
            <Text style={styles.grandTotalLabel}>Tổng cộng:</Text>
            <Text style={styles.grandTotalValue}>
              {grandTotal.toLocaleString('vi-VN')} đ
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.checkoutBtn, items.length === 0 && styles.checkoutDisabled]}
          activeOpacity={0.85}
          onPress={handleCheckout}
          disabled={items.length === 0}
        >
          <Text style={styles.checkoutBtnText}>THANH TOÁN NGAY</Text>
          <Text style={styles.checkoutBtnSub}>
            ({totalQuantity} sản phẩm)
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. VÙNG 3: Tab Bar của Bài tập 1 nằm ở đáy màn hình (cố định) */}
      <BottomTabBar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        cartCount={totalQuantity}
        positionMode="fixed"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 56,
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#312E81',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#C7D2FE',
    fontWeight: '500',
  },
  // Vùng 1: Nội dung cuộn ở giữa
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 54,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 16,
    fontWeight: '500',
  },
  emptyBtn: {
    backgroundColor: '#4338CA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  // Mỗi dòng sản phẩm: flexDirection: 'row', alignItems: 'center'
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  // Ảnh cố định 64 x 84
  itemImage: {
    width: 64,
    height: 84,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  // Cột thông tin ở giữa: flex: 1 để giãn đều
  itemInfo: {
    flex: 1,
    marginHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemAuthor: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  itemUnitPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4338CA',
  },
  // Cột số lượng & thành tiền: width cố định ~100px
  itemActions: {
    width: 95,
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemLineTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 26,
    height: 26,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  qtyValue: {
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  couponCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  couponTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#312E81',
    marginBottom: 2,
  },
  couponSub: {
    fontSize: 11.5,
    color: '#4338CA',
  },
  // Vùng 2: Thanh tổng tiền CỐ ĐỊNH phía dưới (ngay trên Tab Bar)
  summaryBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 4,
  },
  summaryDetails: {
    marginBottom: 8,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '600',
  },
  freeShipping: {
    color: '#059669',
    fontWeight: '700',
  },
  grandTotalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 2,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
  },
  checkoutBtn: {
    backgroundColor: '#059669', // Xanh lá thanh toán nổi bật hoặc indigo
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  checkoutDisabled: {
    backgroundColor: '#94A3B8',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  checkoutBtnSub: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
  },
  // Modal thông báo thành công
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 10,
  },
  modalDesc: {
    fontSize: 13.5,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  modalHighlight: {
    fontWeight: '700',
    color: '#DC2626',
  },
  modalBtn: {
    backgroundColor: '#4338CA',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
