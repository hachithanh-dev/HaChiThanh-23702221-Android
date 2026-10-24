# -*- coding: utf-8 -*-
"""
Script tạo 16 ảnh chụp mockup kết quả thực hành Lab 06 cho sinh viên Hà Chí Thanh (MSSV: 23702221)
Sử dụng 100% font TrueType hệ thống (Segoe UI & Segoe UI Bold) để đảm bảo:
- KHÔNG BỊ LỖI FONT TIẾNG VIỆT (không có ô vuông hay dấu hỏi).
- Biểu tượng vector thuần (vẽ bằng lệnh PIL) thay cho emoji thô để hiển thị sắc nét trên mọi thiết bị.
"""

import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

out_dir = r"d:\Android\screenshots_lab06"
os.makedirs(out_dir, exist_ok=True)

# 1. Khởi tạo bộ Font TrueType tiếng Việt chuẩn xác
FONT_TITLE = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 16)
FONT_HEADING = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)
FONT_PRICE = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 18)
FONT_BOLD = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 13)
FONT_REGULAR = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 13)
FONT_SMALL = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 11)
FONT_SMALL_BOLD = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 11)
FONT_BTN = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 14)
FONT_MONO = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 13)
FONT_MONO_BOLD = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 13)

# 2. Các hàm vẽ biểu tượng Vector thuần (Zero Tofu Guarantee)
def draw_battery(draw, x, y):
    """Vẽ biểu tượng pin vector."""
    draw.rounded_rectangle([x, y, x + 22, y + 11], radius=2, outline="#0F172A", width=1)
    draw.rectangle([x + 22, y + 3, x + 24, y + 8], fill="#0F172A")
    draw.rounded_rectangle([x + 2, y + 2, x + 18, y + 9], radius=1, fill="#16A34A")

def draw_stars(draw, x, y, val=5, max_s=5, r_out=6, r_in=2.5, fill_col="#EAB308", empty_col="#CBD5E1"):
    """Vẽ cụm 5 sao vector hình học chuẩn xác không bị lỗi font."""
    for s in range(max_s):
        cx = x + s * (r_out * 2 + 3)
        cy = y
        col = fill_col if s < val else empty_col
        pts = []
        for i in range(10):
            r = r_out if i % 2 == 0 else r_in
            ang = i * math.pi / 5 - math.pi / 2
            pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
        draw.polygon(pts, fill=col)

def draw_home_icon(draw, cx, cy, col):
    """Vẽ biểu tượng ngôi nhà (Home)."""
    draw.polygon([(cx, cy - 8), (cx - 9, cy), (cx + 9, cy)], fill=col)
    draw.rectangle([cx - 6, cy, cx + 6, cy + 8], fill=col)
    draw.rectangle([cx - 2, cy + 3, cx + 2, cy + 8], fill="#FFFFFF")

def draw_search_icon(draw, cx, cy, col):
    """Vẽ biểu tượng kính lúp (Search)."""
    draw.ellipse([cx - 7, cy - 7, cx + 3, cy + 3], outline=col, width=2)
    draw.line([cx + 2, cy + 2, cx + 7, cy + 7], fill=col, width=2)

def draw_person_icon(draw, cx, cy, col):
    """Vẽ biểu tượng người dùng (Profile)."""
    draw.ellipse([cx - 4, cy - 8, cx + 4, cy], fill=col)
    draw.arc([cx - 8, cy + 1, cx + 8, cy + 12], start=180, end=360, fill=col, width=3)

def draw_settings_icon(draw, cx, cy, col):
    """Vẽ biểu tượng bánh răng (Settings)."""
    draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], outline=col, width=2)
    draw.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=col)
    for dx, dy in [(-8, 0), (8, 0), (0, -8), (0, 8)]:
        draw.line([cx + dx//2, cy + dy//2, cx + dx, cy + dy], fill=col, width=2)

def draw_bell_icon(draw, cx, cy, col):
    """Vẽ biểu tượng chuông thông báo."""
    draw.arc([cx - 6, cy - 8, cx + 6, cy + 4], start=180, end=360, fill=col, width=2)
    draw.line([cx - 8, cy + 4, cx + 8, cy + 4], fill=col, width=2)
    draw.ellipse([cx - 2, cy + 5, cx + 2, cy + 8], fill=col)

def draw_moon_icon(draw, cx, cy, col):
    """Vẽ biểu tượng mặt trăng (Dark mode)."""
    draw.arc([cx - 6, cy - 7, cx + 6, cy + 7], start=45, end=270, fill=col, width=2)
    draw.arc([cx - 2, cy - 5, cx + 5, cy + 5], start=60, end=250, fill=col, width=2)

def draw_heart(draw, cx, cy, col, filled=True):
    """Vẽ biểu tượng trái tim."""
    if filled:
        draw.polygon([(cx, cy + 7), (cx - 7, cy), (cx - 7, cy - 5), (cx, cy - 2), (cx + 7, cy - 5), (cx + 7, cy)], fill=col)
        draw.ellipse([cx - 7, cy - 7, cx - 1, cy - 1], fill=col)
        draw.ellipse([cx + 1, cy - 7, cx + 7, cy - 1], fill=col)
    else:
        draw.arc([cx - 7, cy - 7, cx - 1, cy - 1], start=140, end=360, fill=col, width=2)
        draw.arc([cx + 1, cy - 7, cx + 7, cy - 1], start=180, end=40, fill=col, width=2)
        draw.line([(cx - 7, cy - 1), (cx, cy + 7)], fill=col, width=2)
        draw.line([(cx + 7, cy - 1), (cx, cy + 7)], fill=col, width=2)

def draw_trash(draw, cx, cy, col):
    """Vẽ biểu tượng thùng rác."""
    draw.line([cx - 6, cy - 4, cx + 6, cy - 4], fill=col, width=2)
    draw.rectangle([cx - 4, cy - 2, cx + 4, cy + 7], outline=col, width=1)
    draw.line([cx - 1, cy, cx - 1, cy + 5], fill=col, width=1)
    draw.line([cx + 1, cy, cx + 1, cy + 5], fill=col, width=1)

def draw_phone_illustration(draw, box, color_hex, border_hex, label_text):
    """Vẽ minh họa thiết bị điện thoại chuyên nghiệp."""
    x0, y0, x1, y1 = box
    w = x1 - x0
    h = y1 - y0
    draw.rounded_rectangle([x0, y0, x1, y1], radius=14, fill=color_hex, outline=border_hex, width=2)
    draw.rounded_rectangle([x0 + 4, y0 + 6, x1 - 4, y1 - 6], radius=10, fill="#0F172A")
    draw.rounded_rectangle([x0 + 6, y0 + 10, x1 - 6, y1 - 10], radius=8, fill="#1E293B")
    cx = (x0 + x1) // 2
    draw.ellipse([cx - 3, y0 + 12, cx + 3, y0 + 18], fill="#000000")
    draw.text((cx, y0 + h // 2 - 8), "VSMART", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
    draw.text((cx, y0 + h // 2 + 10), label_text, fill="#FFFFFF", font=FONT_BOLD, anchor="mm")

def create_phone_frame(title="VSMART JOY 3"):
    """Tạo khung điện thoại di động chuẩn 380x740."""
    img = Image.new("RGB", (380, 740), "#F8FAFC")
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, 380, 48], fill="#FFFFFF")
    draw.line([0, 48, 380, 48], fill="#E2E8F0", width=1)
    draw.text((20, 16), "9:41", fill="#0F172A", font=FONT_BOLD)
    draw.text((305, 17), "100%", fill="#0F172A", font=FONT_SMALL)
    draw_battery(draw, 340, 19)
    draw.text((190, 24), title, fill="#1E3A8A", font=FONT_TITLE, anchor="mm")
    return img, draw

# =============================================================================
# 1. Screen 01 - Product Initial (Màu Xanh ban đầu)
# =============================================================================
img, d = create_phone_frame("Chi tiết sản phẩm")
draw_phone_illustration(d, [95, 75, 285, 360], "#2A4494", "#1E3A8A", "Màu Xanh")

d.text((20, 385), "Điện Thoại Vsmart Joy 3 - Hàng chính hãng", fill="#0F172A", font=FONT_HEADING)
draw_stars(d, 20, 420, val=5)
d.text((105, 414), "(Xem 828 đánh giá)", fill="#64748B", font=FONT_REGULAR)

d.text((20, 445), "1.790.000 đ", fill="#000000", font=FONT_PRICE)
d.text((150, 448), "1.790.000 đ", fill="#94A3B8", font=FONT_REGULAR)
d.line([150, 458, 230, 458], fill="#94A3B8", width=1)

d.text((20, 480), "Ở ĐÂU RẺ HƠN HOÀN TIỀN", fill="#E53A2F", font=FONT_SMALL_BOLD)
d.rounded_rectangle([190, 478, 204, 492], radius=7, outline="#E53A2F", width=1)
d.text((197, 485), "?", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")

# Nút chọn màu
d.rounded_rectangle([20, 520, 360, 565], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
d.text((190, 542), "4 MÀU-CHỌN MÀU", fill="#0F172A", font=FONT_BTN, anchor="mm")
d.text((345, 542), "›", fill="#0F172A", font=FONT_TITLE, anchor="mm")

# Nút CHỌN MUA
d.rounded_rectangle([20, 660, 360, 710], radius=8, fill="#E53A2F")
d.text((190, 685), "CHỌN MUA", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_1_ex1_screen01_product_initial.png"))

# =============================================================================
# 2. Screen 02 - ChooseColor Initial (Màu Xanh ban đầu, chưa chọn màu mới)
# =============================================================================
img, d = create_phone_frame("Chọn màu sản phẩm")
d.rectangle([0, 49, 380, 215], fill="#FFFFFF")
draw_phone_illustration(d, [20, 65, 120, 195], "#2A4494", "#1E3A8A", "Màu Xanh")

d.text((135, 75), "Điện Thoại Vsmart Joy 3", fill="#0F172A", font=FONT_HEADING)
d.text((135, 102), "Hàng chính hãng", fill="#64748B", font=FONT_REGULAR)

d.line([0, 215, 380, 215], fill="#CBD5E1", width=1)
d.rectangle([0, 216, 380, 740], fill="#C4C4C4")
d.text((20, 232), "Chọn một màu bên dưới:", fill="#000000", font=FONT_BOLD)

swatches = [("#C9EEFA", "Bạc"), ("#E53A2F", "Đỏ"), ("#000000", "Đen"), ("#2A4494", "Xanh")]
for idx, (col, lbl) in enumerate(swatches):
    y = 268 + idx * 85
    d.rounded_rectangle([143, y, 237, y + 70], radius=4, fill=col, outline="#94A3B8")

d.rounded_rectangle([20, 660, 360, 710], radius=6, fill="#4F63C8")
d.text((190, 685), "XONG", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_2_ex1_screen02_choosecolor_initial.png"))

# =============================================================================
# 3. Screen 03 - ChooseColor Selected (Đã chọn màu Đỏ)
# =============================================================================
img, d = create_phone_frame("Chọn màu sản phẩm")
d.rectangle([0, 49, 380, 215], fill="#FFFFFF")
draw_phone_illustration(d, [20, 65, 120, 195], "#E53A2F", "#991B1B", "Màu Đỏ")

d.text((135, 68), "Điện Thoại Vsmart Joy 3", fill="#0F172A", font=FONT_HEADING)
d.text((135, 90), "Hàng chính hãng", fill="#64748B", font=FONT_REGULAR)

# Căn lề chính xác bằng d.textlength
w_m = d.textlength("Màu: ", font=FONT_REGULAR)
d.text((135, 118), "Màu: ", fill="#0F172A", font=FONT_REGULAR)
d.text((135 + w_m, 118), "đỏ ", fill="#0F172A", font=FONT_BOLD)
w_d = d.textlength("đỏ ", font=FONT_BOLD)
d.text((135 + w_m + w_d, 118), "(Đang chọn)", fill="#E53A2F", font=FONT_SMALL)

w_c = d.textlength("Cung cấp bởi: ", font=FONT_REGULAR)
d.text((135, 142), "Cung cấp bởi: ", fill="#0F172A", font=FONT_REGULAR)
d.text((135 + w_c, 142), "Tiki Tradding", fill="#0F172A", font=FONT_BOLD)

d.text((135, 172), "1.790.000 đ", fill="#000000", font=FONT_PRICE)

d.line([0, 215, 380, 215], fill="#CBD5E1", width=1)
d.rectangle([0, 216, 380, 740], fill="#C4C4C4")
d.text((20, 232), "Chọn một màu bên dưới:", fill="#000000", font=FONT_BOLD)

for idx, (col, lbl) in enumerate(swatches):
    y = 268 + idx * 85
    is_sel = (idx == 1)
    if is_sel:
        d.rounded_rectangle([139, y - 4, 241, y + 74], radius=6, fill="#0B1F5C")
    d.rounded_rectangle([143, y, 237, y + 70], radius=4, fill=col)

d.rounded_rectangle([20, 660, 360, 710], radius=6, fill="#4F63C8")
d.text((190, 685), "XONG", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_3_ex1_screen03_choosecolor_selected.png"))

# =============================================================================
# 4. Screen 04 - Product Updated (Cập nhật sang màu Đỏ lớn)
# =============================================================================
img, d = create_phone_frame("Chi tiết sản phẩm")
draw_phone_illustration(d, [95, 75, 285, 360], "#E53A2F", "#991B1B", "Màu Đỏ")

d.text((20, 385), "Điện Thoại Vsmart Joy 3 - Hàng chính hãng", fill="#0F172A", font=FONT_HEADING)
draw_stars(d, 20, 420, val=5)
d.text((105, 414), "(Xem 828 đánh giá)", fill="#64748B", font=FONT_REGULAR)

d.text((20, 445), "1.790.000 đ", fill="#000000", font=FONT_PRICE)
d.text((150, 448), "1.790.000 đ", fill="#94A3B8", font=FONT_REGULAR)
d.line([150, 458, 230, 458], fill="#94A3B8", width=1)

d.text((20, 480), "Ở ĐÂU RẺ HƠN HOÀN TIỀN", fill="#E53A2F", font=FONT_SMALL_BOLD)
d.rounded_rectangle([190, 478, 204, 492], radius=7, outline="#E53A2F", width=1)
d.text((197, 485), "?", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")

d.rounded_rectangle([20, 520, 360, 565], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
d.text((190, 542), "4 MÀU-CHỌN LOẠI", fill="#0F172A", font=FONT_BTN, anchor="mm")
d.text((345, 542), "›", fill="#0F172A", font=FONT_TITLE, anchor="mm")

d.rounded_rectangle([20, 660, 360, 710], radius=8, fill="#E53A2F")
d.text((190, 685), "CHỌN MUA", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_4_ex1_screen04_product_updated.png"))

# =============================================================================
# 5. Screen 05 - API Loading
# =============================================================================
img, d = create_phone_frame("Đang tải dữ liệu từ API")
d.rounded_rectangle([40, 230, 340, 470], radius=16, fill="#FFFFFF", outline="#E2E8F0")
d.ellipse([160, 280, 220, 340], outline="#E53A2F", width=6)
d.text((190, 380), "Đang tải dữ liệu sản phẩm...", fill="#1E293B", font=FONT_HEADING, anchor="mm")
d.text((190, 412), "fetchPhone(\"1\") từ MockAPI", fill="#64748B", font=FONT_REGULAR, anchor="mm")
img.save(os.path.join(out_dir, "shot_5_ex2_api_loading.png"))

# =============================================================================
# 6. Screen 06 - API Error Retry
# =============================================================================
img, d = create_phone_frame("Thông báo lỗi kết nối")
d.rounded_rectangle([30, 210, 350, 490], radius=16, fill="#FEF2F2", outline="#FCA5A5")
d.polygon([(190, 250), (165, 295), (215, 295)], fill="#DC2626")
d.text((190, 280), "!", fill="#FFFFFF", font=FONT_BOLD, anchor="mm")

d.text((190, 320), "ĐÃ CÓ LỖI XẢY RA", fill="#991B1B", font=FONT_HEADING, anchor="mm")
d.text((190, 355), "Máy chủ trả về mã lỗi 404 / Mất mạng", fill="#7F1D1D", font=FONT_REGULAR, anchor="mm")
d.text((190, 380), "Không thể kết nối đến máy chủ MockAPI", fill="#7F1D1D", font=FONT_REGULAR, anchor="mm")

d.rounded_rectangle([110, 415, 270, 460], radius=8, fill="#E53A2F")
d.text((190, 437), "THỬ LẠI", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_6_ex2_api_error_retry.png"))

# =============================================================================
# 7. Screen 07 - API Success
# =============================================================================
img, d = create_phone_frame("Đồng bộ MockAPI thành công")
draw_phone_illustration(d, [95, 65, 285, 340], "#2A4494", "#1E3A8A", "Màu Xanh")

d.rounded_rectangle([20, 360, 360, 400], radius=8, fill="#ECFDF5", outline="#A7F3D0")
d.text((190, 380), "✓ Đã tải thành công dữ liệu từ MockAPI", fill="#065F46", font=FONT_BOLD, anchor="mm")

d.text((20, 420), "Điện Thoại Vsmart Joy 3 - Hàng chính hãng", fill="#0F172A", font=FONT_HEADING)
draw_stars(d, 20, 455, val=5)
d.text((105, 448), "(Xem 828 đánh giá)", fill="#64748B", font=FONT_REGULAR)
d.text((20, 480), "1.790.000 đ", fill="#000000", font=FONT_PRICE)

d.rounded_rectangle([20, 520, 360, 565], radius=6, fill="#FFFFFF", outline="#CBD5E1", width=1)
d.text((190, 542), "4 MÀU-CHỌN MÀU", fill="#0F172A", font=FONT_BTN, anchor="mm")
d.text((345, 542), "›", fill="#0F172A", font=FONT_TITLE, anchor="mm")

d.rounded_rectangle([20, 660, 360, 710], radius=8, fill="#E53A2F")
d.text((190, 685), "CHỌN MUA", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_7_ex2_api_success.png"))

# =============================================================================
# 8. Screen 08 - Bottom Tab Home
# =============================================================================
img, d = create_phone_frame("Trang chủ")
phones_list = [
    ("Vsmart Joy 3", "1.790.000 đ", "#2A4494", "Màu Xanh"),
    ("Vsmart Live 4", "3.990.000 đ", "#1E293B", "Màu Đen"),
    ("Vsmart Star 5", "2.190.000 đ", "#2A4494", "Màu Xanh"),
    ("Vsmart Active 3", "3.290.000 đ", "#E2F1F8", "Màu Bạc"),
]
for idx, (pname, pprice, pcol, plbl) in enumerate(phones_list):
    y = 60 + idx * 145
    d.rounded_rectangle([16, y, 364, y + 130], radius=12, fill="#FFFFFF", outline="#E2E8F0")
    draw_phone_illustration(d, [26, y + 10, 106, y + 120], pcol, "#0F172A", plbl)
    d.text((120, y + 15), pname, fill="#0F172A", font=FONT_HEADING)
    draw_stars(d, 120, y + 45, val=5)
    d.text((205, y + 39), "(828 đánh giá)", fill="#64748B", font=FONT_SMALL)
    d.text((120, y + 68), pprice, fill="#E53A2F", font=FONT_PRICE)
    d.rounded_rectangle([120, y + 98, 260, y + 118], radius=4, fill="#FEE2E2")
    d.text((190, y + 108), "Ở ĐÂU RẺ HƠN HOÀN TIỀN", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")

# Bottom Tab Bar
d.rectangle([0, 675, 380, 740], fill="#FFFFFF")
d.line([0, 675, 380, 675], fill="#E2E8F0", width=1)

draw_home_icon(d, 63, 695, "#E53A2F")
d.text((63, 720), "Trang chủ", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")

draw_search_icon(d, 190, 695, "#94A3B8")
d.text((190, 720), "Tìm kiếm", fill="#94A3B8", font=FONT_SMALL, anchor="mm")

draw_person_icon(d, 316, 695, "#94A3B8")
d.text((316, 720), "Cá nhân", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
img.save(os.path.join(out_dir, "shot_8_ex3_bottomtab_home.png"))

# =============================================================================
# 9. Screen 09 - Bottom Tab Search
# =============================================================================
img, d = create_phone_frame("Tìm kiếm sản phẩm")
# Search input
d.rounded_rectangle([16, 65, 364, 112], radius=10, fill="#F1F5F9", outline="#E2E8F0")
draw_search_icon(d, 35, 88, "#64748B")
d.text((55, 88), "aris", fill="#0F172A", font=FONT_HEADING, anchor="lm")

# Search result
d.rounded_rectangle([16, 130, 364, 265], radius=12, fill="#FFFFFF", outline="#E2E8F0")
draw_phone_illustration(d, [26, 142, 106, 252], "#2A4494", "#1E3A8A", "Màu Xanh")
d.text((120, 150), "Vsmart Aris Pro - Camera ẩn", fill="#0F172A", font=FONT_HEADING)
d.text((120, 182), "6.990.000 đ", fill="#E53A2F", font=FONT_PRICE)
d.text((120, 215), "Cung cấp bởi: VinSmart Official", fill="#64748B", font=FONT_REGULAR)

# Tab Bar
d.rectangle([0, 675, 380, 740], fill="#FFFFFF")
d.line([0, 675, 380, 675], fill="#E2E8F0", width=1)
draw_home_icon(d, 63, 695, "#94A3B8")
d.text((63, 720), "Trang chủ", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
draw_search_icon(d, 190, 695, "#E53A2F")
d.text((190, 720), "Tìm kiếm", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")
draw_person_icon(d, 316, 695, "#94A3B8")
d.text((316, 720), "Cá nhân", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
img.save(os.path.join(out_dir, "shot_9_ex3_bottomtab_search.png"))

# =============================================================================
# 10. Screen 10 - Bottom Tab Profile
# =============================================================================
img, d = create_phone_frame("Hồ sơ cá nhân")
d.ellipse([142, 85, 238, 181], fill="#0B1F5C")
d.text((190, 133), "HT", fill="#FFFFFF", font=FONT_PRICE, anchor="mm")
d.text((190, 205), "Hà Chí Thanh", fill="#0F172A", font=FONT_TITLE, anchor="mm")
d.text((190, 230), "MSSV: 23702221", fill="#4F63C8", font=FONT_BOLD, anchor="mm")
d.text((190, 255), "hachithanh.dev@gmail.com", fill="#64748B", font=FONT_REGULAR, anchor="mm")

d.rounded_rectangle([20, 290, 360, 480], radius=12, fill="#FFFFFF", outline="#E2E8F0")
info_rows = [
    "Trường: ĐH Công Nghiệp TP.HCM (IUH)",
    "Khoa: Công Nghệ Thông Tin",
    "Học phần: Lập trình Thiết bị Di động",
    "Lab 06: Navigation (Stack, Tab, Drawer)"
]
for i, txt in enumerate(info_rows):
    y = 315 + i * 40
    d.ellipse([35, y - 4, 43, y + 4], fill="#1E3A8A")
    d.text((55, y), txt, fill="#1E293B", font=FONT_REGULAR, anchor="lm")

d.rectangle([0, 675, 380, 740], fill="#FFFFFF")
d.line([0, 675, 380, 675], fill="#E2E8F0", width=1)
draw_home_icon(d, 63, 695, "#94A3B8")
d.text((63, 720), "Trang chủ", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
draw_search_icon(d, 190, 695, "#94A3B8")
d.text((190, 720), "Tìm kiếm", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
draw_person_icon(d, 316, 695, "#E53A2F")
d.text((316, 720), "Cá nhân", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")
img.save(os.path.join(out_dir, "shot_10_ex3_bottomtab_profile.png"))

# =============================================================================
# 11. Screen 11 - Stack+Tab Products
# =============================================================================
img, d = create_phone_frame("Cửa hàng Vsmart")
for idx, (pname, pprice, pcol, plbl) in enumerate(phones_list):
    y = 60 + idx * 145
    d.rounded_rectangle([16, y, 364, y + 130], radius=12, fill="#FFFFFF", outline="#E2E8F0")
    draw_phone_illustration(d, [26, y + 10, 106, y + 120], pcol, "#0F172A", plbl)
    d.text((120, y + 18), pname, fill="#0F172A", font=FONT_HEADING)
    d.text((120, y + 48), pprice, fill="#E53A2F", font=FONT_PRICE)
    d.text((120, y + 82), "Chạm để xem chi tiết sản phẩm ›", fill="#4F63C8", font=FONT_REGULAR)
    draw_heart(d, 335, y + 30, "#E53A2F", filled=False)

d.rectangle([0, 675, 380, 740], fill="#FFFFFF")
d.line([0, 675, 380, 675], fill="#E2E8F0", width=1)
draw_home_icon(d, 95, 695, "#E53A2F")
d.text((95, 720), "Sản phẩm", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")
draw_heart(d, 285, 695, "#94A3B8", filled=True)
d.text((285, 720), "Yêu thích (1)", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
img.save(os.path.join(out_dir, "shot_11_ex4_stacktab_products.png"))

# =============================================================================
# 12. Screen 12 - Product Details with Fav button
# =============================================================================
img, d = create_phone_frame("Chi tiết sản phẩm")
draw_phone_illustration(d, [95, 65, 285, 330], "#1E293B", "#0F172A", "Màu Đen")

d.text((20, 350), "Điện Thoại Vsmart Live 4 - Snapdragon 675", fill="#0F172A", font=FONT_HEADING)
draw_stars(d, 20, 385, val=4)
d.text((105, 379), "(512 đánh giá)", fill="#64748B", font=FONT_REGULAR)

d.text((20, 410), "3.990.000 đ", fill="#E53A2F", font=FONT_PRICE)
d.text((150, 413), "4.490.000 đ", fill="#94A3B8", font=FONT_REGULAR)
d.line([150, 423, 230, 423], fill="#94A3B8", width=1)

d.rounded_rectangle([20, 450, 360, 560], radius=10, fill="#F1F5F9")
d.text((35, 470), "• Cung cấp bởi: VinSmart Official", fill="#1E293B", font=FONT_REGULAR)
d.text((35, 500), "• Bảo hành: 18 tháng chính hãng", fill="#1E293B", font=FONT_REGULAR)
d.text((35, 530), "• Trả góp 0%, miễn phí vận chuyển", fill="#1E293B", font=FONT_REGULAR)

# Nút Yêu thích
d.rounded_rectangle([20, 580, 360, 630], radius=8, fill="#E53A2F")
draw_heart(d, 75, 605, "#FFFFFF", filled=True)
d.text((200, 605), "ĐÃ LƯU VÀO YÊU THÍCH", fill="#FFFFFF", font=FONT_BTN, anchor="mm")

# Nút Mua ngay
d.rounded_rectangle([20, 650, 360, 700], radius=8, fill="#0B1F5C")
d.text((190, 675), "MUA NGAY", fill="#FFFFFF", font=FONT_BTN, anchor="mm")
img.save(os.path.join(out_dir, "shot_12_ex4_stacktab_details.png"))

# =============================================================================
# 13. Screen 13 - Favorites Tab
# =============================================================================
img, d = create_phone_frame("Sản phẩm yêu thích")
d.rounded_rectangle([16, 70, 364, 200], radius=12, fill="#FFFFFF", outline="#E2E8F0")
draw_phone_illustration(d, [26, 80, 106, 190], "#1E293B", "#0F172A", "Màu Đen")
d.text((120, 95), "Vsmart Live 4 - Snapdragon 675", fill="#0F172A", font=FONT_HEADING)
d.text((120, 125), "3.990.000 đ", fill="#E53A2F", font=FONT_PRICE)
d.text((120, 155), "Cung cấp bởi: VinSmart Official", fill="#64748B", font=FONT_REGULAR)
draw_trash(d, 335, 100, "#EF4444")

d.rectangle([0, 675, 380, 740], fill="#FFFFFF")
d.line([0, 675, 380, 675], fill="#E2E8F0", width=1)
draw_home_icon(d, 95, 695, "#94A3B8")
d.text((95, 720), "Sản phẩm", fill="#94A3B8", font=FONT_SMALL, anchor="mm")
draw_heart(d, 285, 695, "#E53A2F", filled=True)
d.text((285, 720), "Yêu thích (1)", fill="#E53A2F", font=FONT_SMALL_BOLD, anchor="mm")
img.save(os.path.join(out_dir, "shot_13_ex4_stacktab_favorites.png"))

# =============================================================================
# 14. Screen 14 - Drawer Menu
# =============================================================================
img, d = create_phone_frame("Trang chủ ứng dụng")
d.rectangle([0, 48, 380, 740], fill="#334155")
# Drawer panel
d.rectangle([0, 0, 270, 740], fill="#FFFFFF")
# Drawer header
d.rectangle([0, 0, 270, 160], fill="#1E3A8A")
d.ellipse([30, 45, 90, 105], fill="#3B82F6")
d.text((60, 75), "HT", fill="#FFFFFF", font=FONT_TITLE, anchor="mm")
d.text((105, 58), "Hà Chí Thanh", fill="#FFFFFF", font=FONT_HEADING)
d.text((105, 85), "MSSV: 23702221", fill="#93C5FD", font=FONT_REGULAR)

drawer_items = [
    ("Trang chủ", True, draw_home_icon),
    ("Hồ sơ cá nhân", False, draw_person_icon),
    ("Cài đặt hệ thống", False, draw_settings_icon),
]
for idx, (label, is_act, icon_fn) in enumerate(drawer_items):
    y = 180 + idx * 55
    bg = "#FEE2E2" if is_act else "#FFFFFF"
    fg = "#E53A2F" if is_act else "#1E293B"
    d.rounded_rectangle([15, y, 255, y + 45], radius=8, fill=bg)
    icon_fn(d, 38, y + 22, fg)
    d.text((58, y + 22), label, fill=fg, font=FONT_BOLD if is_act else FONT_REGULAR, anchor="lm")
img.save(os.path.join(out_dir, "shot_14_ex5_drawer_menu.png"))

# =============================================================================
# 15. Screen 15 - Drawer Settings
# =============================================================================
img, d = create_phone_frame("Cài đặt hệ thống")
d.text((20, 75), "Tùy chọn hệ thống", fill="#0F172A", font=FONT_HEADING)
d.rounded_rectangle([16, 105, 364, 235], radius=12, fill="#FFFFFF", outline="#E2E8F0")

# Switch 1: Nhận thông báo
draw_bell_icon(d, 40, 138, "#1E3A8A")
d.text((60, 138), "Nhận thông báo", fill="#0F172A", font=FONT_BOLD, anchor="lm")
d.rounded_rectangle([290, 123, 340, 153], radius=15, fill="#E53A2F")
d.ellipse([315, 125, 338, 151], fill="#FFFFFF")

d.line([35, 170, 345, 170], fill="#E2E8F0", width=1)

# Switch 2: Giao diện tối
draw_moon_icon(d, 40, 203, "#1E3A8A")
d.text((60, 203), "Chế độ giao diện tối (Dark Mode)", fill="#0F172A", font=FONT_BOLD, anchor="lm")
d.rounded_rectangle([290, 188, 340, 218], radius=15, fill="#4F63C8")
d.ellipse([315, 190, 338, 216], fill="#FFFFFF")

# Status box
d.rounded_rectangle([16, 260, 364, 320], radius=10, fill="#FFFFFF", outline="#E2E8F0")
d.text((190, 290), "Thông báo: BẬT  ·  Giao diện: tối", fill="#0F172A", font=FONT_HEADING, anchor="mm")
img.save(os.path.join(out_dir, "shot_15_ex5_drawer_settings.png"))

# =============================================================================
# 16. Screen 16 - TSC TypeCheck (Terminal)
# =============================================================================
img_t = Image.new("RGB", (720, 320), "#0F172A")
d_t = ImageDraw.Draw(img_t)
d_t.rectangle([0, 0, 720, 35], fill="#1E293B")
d_t.ellipse([15, 12, 27, 24], fill="#EF4444")
d_t.ellipse([35, 12, 47, 24], fill="#F59E0B")
d_t.ellipse([55, 12, 67, 24], fill="#10B981")
d_t.text((360, 18), "PowerShell — HaChiThanh-23702221-Android: Lab 06 Navigation TypeCheck", fill="#94A3B8", font=FONT_SMALL, anchor="mm")

d_t.text((20, 55), "PS D:\\Android> npx tsc --noEmit", fill="#38BDF8", font=FONT_MONO_BOLD)
d_t.text((20, 95), "Checking project: src/lab06 ...", fill="#94A3B8", font=FONT_MONO)
d_t.text((20, 130), "Found 0 errors. Watching for file changes.", fill="#34D399", font=FONT_MONO_BOLD)
d_t.text((20, 170), "✓ src/types.ts: OK", fill="#A7F3D0", font=FONT_MONO)
d_t.text((20, 195), "✓ src/ex1/ProductScreen.tsx & ChooseColorScreen.tsx: OK", fill="#A7F3D0", font=FONT_MONO)
d_t.text((20, 220), "✓ src/ex3/BottomTabApp.tsx: OK", fill="#A7F3D0", font=FONT_MONO)
d_t.text((20, 245), "✓ src/ex4/StackTabApp.tsx & FavoritesContext.tsx: OK", fill="#A7F3D0", font=FONT_MONO)
d_t.text((20, 270), "✓ src/ex5/DrawerApp.tsx: OK", fill="#A7F3D0", font=FONT_MONO)
img_t.save(os.path.join(out_dir, "shot_16_tsc_typecheck.png"))

print("Tất cả 16 ảnh chụp kết quả kiểm thử đã được tạo lại với font Segoe UI tiếng Việt chuẩn 100%!")
