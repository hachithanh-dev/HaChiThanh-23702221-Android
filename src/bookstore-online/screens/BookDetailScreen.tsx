// ============================================================================
// GIỜ 4 — BÀI TẬP 2: MÀN HÌNH CHI TIẾT SÁCH (BOOK DETAIL SCREEN)
// Đề bài: Dựng màn hình chi tiết 1 cuốn sách: ảnh bìa lớn phía trên (căn giữa),
// tên sách + tác giả + giá + mô tả dài phía dưới (cuộn được),
// thanh 'Thêm vào giỏ' cố định dưới cùng màn hình.
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
} from 'react-native';
import { Book, BOOKS } from '../data';
import { DiscountBadge } from '../components/DiscountBadge';

interface BookDetailScreenProps {
  book?: Book;
  onBack?: () => void;
  onAddToCart?: (book: Book, quantity: number) => void;
}

export function BookDetailScreen({
  book = BOOKS[0],
  onBack,
  onAddToCart,
}: BookDetailScreenProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = (window.location.search + window.location.hash).toLowerCase();
      if (q.includes('scroll')) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({ y: 360, animated: false });
        }, 300);
      }
    }
  }, []);

  // Tính giá sau giảm nếu có
  const discountedPrice = book.discountPercent
    ? Math.round(book.price * (1 - book.discountPercent / 100))
    : book.price;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(book, quantity);
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header phụ cố định trên cùng — Có nút Back quay lại */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>
          Chi tiết sách
        </Text>
        <View style={styles.sharePlaceholder}>
          <Text style={styles.shareIcon}>🔗</Text>
        </View>
      </View>

      {/* Thông báo toast khi thêm vào giỏ thành công */}
      {addedToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>
            ✓ Đã thêm {quantity} cuốn vào giỏ hàng thành công!
          </Text>
        </View>
      )}

      {/* 2. ScrollView riêng (flex: 1) — Chứa ảnh bìa lớn & toàn bộ nội dung mô tả dài */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Khung ảnh bìa lớn: alignSelf: 'center', width theo %, aspectRatio giữ tỉ lệ */}
        <View style={styles.coverWrapper}>
          <Image
            source={{ uri: book.cover }}
            style={styles.largeCover}
            resizeMode="cover"
          />
          {/* Badge giảm giá hoặc nhãn Mới đè lên góc ảnh */}
          <DiscountBadge
            discountPercent={book.discountPercent}
            isNew={book.isNew}
          />
        </View>

        {/* Thông tin chính sách: Tên, Tác giả, Đánh giá */}
        <View style={styles.infoCard}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>Tác giả: {book.author}</Text>

          {/* Đánh giá sao & Thống kê */}
          <View style={styles.ratingRow}>
            <View style={styles.starsWrap}>
              <Text style={styles.starText}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.ratingScore}>4.9/5</Text>
            </View>
            <Text style={styles.soldCount}>Đã bán: 1.2k cuốn</Text>
          </View>

          {/* Khối giá tiền */}
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              {discountedPrice.toLocaleString('vi-VN')} đ
            </Text>
            {book.discountPercent ? (
              <View style={styles.oldPriceWrap}>
                <Text style={styles.originalPrice}>
                  {book.price.toLocaleString('vi-VN')} đ
                </Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>
                    -{book.discountPercent}%
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        {/* Thông số chi tiết sách (Metadata Grid) */}
        <View style={styles.specsCard}>
          <Text style={styles.sectionHeading}>Thông tin chi tiết</Text>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Nhà xuất bản:</Text>
            <Text style={styles.specValue}>NXB Văn Học</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Hình thức bìa:</Text>
            <Text style={styles.specValue}>Bìa mềm cao cấp</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Kích thước:</Text>
            <Text style={styles.specValue}>14 x 20.5 cm</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Ngôn ngữ:</Text>
            <Text style={styles.specValue}>Tiếng Việt</Text>
          </View>
        </View>

        {/* Khối mô tả dài cuộn được */}
        <View style={styles.descCard}>
          <Text style={styles.sectionHeading}>Mô tả nội dung</Text>
          <Text style={styles.descParagraph}>{book.description}</Text>
          <Text style={styles.descParagraph}>
            Tác phẩm mang lại góc nhìn đa chiều về cuộc sống và giá trị nhân văn sâu sắc.
            Từng trang sách mở ra những bài học quý giá, giúp người đọc đúc kết triết lý
            sống tích cực, rèn luyện tư duy và tinh thần vượt khó.
          </Text>
          <Text style={styles.descParagraph}>
            Phù hợp cho mọi độc giả yêu thích văn học, triết học và phát triển bản thân.
            Sách được in trên giấy chống lóa cao cấp, bảo vệ thị lực và lưu giữ được lâu bền.
          </Text>
        </View>
      </ScrollView>

      {/* 3. Thanh 'Thêm vào giỏ' CỐ ĐỊNH dưới cùng màn hình (NGOÀI ScrollView)
             flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' */}
      <View style={styles.bottomBar}>
        {/* Bộ chọn số lượng */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Số lượng:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyNumber}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nút 'Thêm vào giỏ' lớn */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>🛒 Thêm vào giỏ</Text>
          <Text style={styles.addToCartSub}>
            {(discountedPrice * quantity).toLocaleString('vi-VN')} đ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#1E1B4B',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  backText: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '600',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sharePlaceholder: {
    padding: 4,
  },
  shareIcon: {
    fontSize: 16,
  },
  toast: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  // ScrollView riêng cho toàn bộ nội dung dài
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  // Ảnh bìa lớn: alignSelf: 'center', width theo %, aspectRatio giữ tỉ lệ
  coverWrapper: {
    alignSelf: 'center',
    width: '65%',
    maxWidth: 260,
    aspectRatio: 3 / 4,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
    // Đổ bóng nổi khối cho bìa sách
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  largeCover: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: 26,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
  },
  starsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starText: {
    fontSize: 13,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  soldCount: {
    fontSize: 12,
    color: '#64748B',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currentPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#DC2626',
  },
  oldPriceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  originalPrice: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  discountTag: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountTagText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '700',
  },
  specsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  specLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  specValue: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
  },
  descCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  descParagraph: {
    fontSize: 13.5,
    lineHeight: 21,
    color: '#334155',
    marginBottom: 10,
  },
  // 3. Thanh 'Thêm vào giỏ' CỐ ĐỊNH dưới cùng màn hình (NGOÀI ScrollView)
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 72,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  quantitySection: {
    flexDirection: 'column',
    gap: 4,
  },
  quantityLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  qtyNumber: {
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  addToCartBtn: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: '#4338CA',
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 3,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  addToCartSub: {
    color: '#C7D2FE',
    fontSize: 12,
    fontWeight: '600',
  },
});
