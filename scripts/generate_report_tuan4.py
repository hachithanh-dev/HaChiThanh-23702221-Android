# -*- coding: utf-8 -*-
"""
Script tạo file Báo cáo Word Tuần 4 cho sinh viên Hà Chí Thanh (MSSV: 23702221)
Cấu trúc và định dạng chuẩn xác 100% theo mẫu của Tuần 2 & Tuần 3:
- Font chữ: Arial & Consolas
- Bảng màu: Navy (#1E3A8A), Slate (#475569), Dark (#0F172A), Teal (#0E7490), Border (#E2E8F0)
- Table 0: Info Summary Box với nền Ice Blue (#EFF6FF)
- Code Box: Bảng 1 cell với nền xám sáng (#F8FAFC), viền mỏng (#E2E8F0), font Consolas 9.5pt
- Bullet points: List Bullet với cụm từ khóa in đậm và giải thích chi tiết Flexbox
- Ảnh chụp giao diện: Chèn ảnh sắc nét kèm kích thước tối ưu
"""

import os
import sys
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

sys.stdout.reconfigure(encoding='utf-8')

def set_cell_background(cell, color_hex):
    """Thiết lập màu nền cho ô bảng."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    """Thiết lập padding cho ô bảng (đơn vị dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}>'
                      f'<w:top w:w="{top}" w:type="dxa"/>'
                      f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
                      f'<w:left w:w="{left}" w:type="dxa"/>'
                      f'<w:right w:w="{right}" w:type="dxa"/>'
                      f'</w:tcMar>')
    tcPr.append(tcMar)

def set_cell_border(cell, color="E2E8F0", sz="4"):
    """Thiết lập viền mỏng cho ô bảng."""
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}>'
                        f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                        f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                        f'<w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                        f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                        f'</w:tcBorders>')
    tcPr.append(borders)

def add_code_box(doc, code_text):
    """Thêm một Code Box chuẩn đẹp: Table 1x1, nền #F8FAFC, viền #E2E8F0, font Consolas 9.5pt."""
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(6.8)
    
    cell = table.rows[0].cells[0]
    cell.width = Inches(6.8)
    set_cell_background(cell, "F8FAFC")
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    set_cell_border(cell, color="CBD5E1", sz="6")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    
    # Giới hạn số dòng hiển thị nếu code quá dài để văn bản không bị quá loãng nhưng vẫn đầy đủ cấu trúc
    lines = code_text.strip().split('\n')
    for i, line in enumerate(lines):
        if i > 0:
            p = cell.add_paragraph()
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.15
        run = p.add_run(line)
        run.font.name = 'Consolas'
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)

def add_bullet_point(doc, bold_prefix, text_content):
    """Thêm bullet point với cụm từ in đậm và nội dung giải thích."""
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.2
    
    run_bold = p.add_run(bold_prefix)
    run_bold.font.name = 'Arial'
    run_bold.font.size = Pt(10.0)
    run_bold.font.bold = True
    run_bold.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    
    run_text = p.add_run(text_content)
    run_text.font.name = 'Arial'
    run_text.font.size = Pt(10.0)
    run_text.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)

def add_image_safe(doc, img_path, width_in=3.6, caption=None):
    """Chèn ảnh vào tài liệu kèm canh giữa và ghi chú nếu có."""
    if os.path.exists(img_path):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run()
        run.add_picture(img_path, width=Inches(width_in))
        
        if caption:
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cap.paragraph_format.space_before = Pt(2)
            p_cap.paragraph_format.space_after = Pt(6)
            run_cap = p_cap.add_run(caption)
            run_cap.font.name = 'Arial'
            run_cap.font.size = Pt(9.0)
            run_cap.font.italic = True
            run_cap.font.color.rgb = RGBColor(0x64, 0x74, 0x8B)
    else:
        print(f"Warning: Image not found: {img_path}")

def build_report():
    doc = Document()
    
    # 1. Cấu hình lề trang 57.6pt (0.8 inch)
    for section in doc.sections:
        section.top_margin = Pt(57.6)
        section.bottom_margin = Pt(57.6)
        section.left_margin = Pt(57.6)
        section.right_margin = Pt(57.6)
        
    # =========================================================================
    # HEADER PHẦN ĐẦU TÀI LIỆU
    # =========================================================================
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(4)
    run_title = p_title.add_run("BÁO CÁO THỰC HÀNH REACT NATIVE — TUẦN 4")
    run_title.font.name = 'Arial'
    run_title.font.size = Pt(22.0)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(6)
    run_sub = p_sub.add_run("Chủ đề: LAYOUT với Flexbox — Ứng dụng BookStore Online (Giờ 4: ScrollView & SafeAreaView, Giờ 5: Bottom Tab Layout & Hoàn thiện ứng dụng)")
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(12.0)
    run_sub.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    
    # Họ tên & MSSV
    p_info1 = doc.add_paragraph()
    p_info1.paragraph_format.space_before = Pt(0)
    p_info1.paragraph_format.space_after = Pt(2)
    run_name = p_info1.add_run("Họ và tên : Hà Chí Thanh")
    run_name.font.name = 'Arial'
    run_name.font.size = Pt(11.0)
    run_name.font.bold = True
    run_name.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)
    
    p_info2 = doc.add_paragraph()
    p_info2.paragraph_format.space_before = Pt(0)
    p_info2.paragraph_format.space_after = Pt(2)
    run_mssv = p_info2.add_run("MSSV: 23702221")
    run_mssv.font.name = 'Arial'
    run_mssv.font.size = Pt(11.0)
    run_mssv.font.bold = True
    run_mssv.font.color.rgb = RGBColor(0x0F, 0x17, 0x2A)
    
    p_info3 = doc.add_paragraph()
    p_info3.paragraph_format.space_before = Pt(0)
    p_info3.paragraph_format.space_after = Pt(12)
    run_gh_label = p_info3.add_run("Link Github: ")
    run_gh_label.font.name = 'Arial'
    run_gh_label.font.size = Pt(10.5)
    run_gh_label.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    run_gh_url = p_info3.add_run("https://github.com/hachithanh-dev/HaChiThanh-23702221-Android")
    run_gh_url.font.name = 'Arial'
    run_gh_url.font.size = Pt(10.5)
    run_gh_url.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    # =========================================================================
    # TABLE 0: BẢNG TỔNG QUAN KỸ THUẬT & MÔI TRƯỜNG DỰ ÁN
    # =========================================================================
    table0 = doc.add_table(rows=1, cols=1)
    table0.alignment = WD_TABLE_ALIGNMENT.CENTER
    table0.autofit = False
    table0.columns[0].width = Inches(6.8)
    cell0 = table0.rows[0].cells[0]
    cell0.width = Inches(6.8)
    set_cell_background(cell0, "EFF6FF")
    set_cell_margins(cell0, top=140, bottom=140, left=180, right=180)
    set_cell_border(cell0, color="BFDBFE", sz="6")
    
    summary_lines = [
        "📌 Ngôn ngữ & Công nghệ: TypeScript 5.x | React Native 0.81.x | Expo SDK 54.x | React 19.x",
        "📁 Cấu trúc dự án: src/bookstore-online/ (Header, BookRowCard, CategoryChips, BookGrid, DiscountBadge, FloatingCartButton, BottomTabBar, BookDetailScreen, CartScreen, CategoriesScreen, ProfileScreen, HomeScreen, App.tsx, data.ts)",
        "⚡ Lệnh kiểm thử & thực thi: npx tsc --noEmit (0 lỗi hoàn hảo) | npx expo start --web / android",
        "🎯 Kết quả thực hành: Hoàn thành 100% tất cả các bài tập Giờ 4 & Giờ 5 (SafeAreaView, ScrollView lồng ghép, Fixed Bottom Action Bar, Bottom Tab Bar chia đều flex:1, Cart Screen 3 vùng không chồng lấp, và Tích hợp ứng dụng hoàn chỉnh)."
    ]
    for i, line in enumerate(summary_lines):
        p_c = cell0.paragraphs[0] if i == 0 else cell0.add_paragraph()
        p_c.paragraph_format.space_before = Pt(2)
        p_c.paragraph_format.space_after = Pt(2)
        p_c.paragraph_format.line_spacing = 1.15
        run_c = p_c.add_run(line)
        run_c.font.name = 'Arial'
        run_c.font.size = Pt(10.0)
        run_c.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
        
    p_sep = doc.add_paragraph()
    p_sep.paragraph_format.space_before = Pt(8)
    p_sep.paragraph_format.space_after = Pt(8)
    run_sep = p_sep.add_run("—" * 60)
    run_sep.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # Đọc code thực tế từ src/bookstore-online
    def read_code_file(rel_path):
        p = os.path.join(r"D:\Android", rel_path)
        if os.path.exists(p):
            with open(p, 'r', encoding='utf-8') as f:
                return f.read()
        return "// Code not found: " + rel_path

    code_home = read_code_file("src/bookstore-online/screens/HomeScreen.tsx")
    code_detail = read_code_file("src/bookstore-online/screens/BookDetailScreen.tsx")
    code_tabbar = read_code_file("src/bookstore-online/components/BottomTabBar.tsx")
    code_cart = read_code_file("src/bookstore-online/screens/CartScreen.tsx")
    code_app = read_code_file("src/bookstore-online/App.tsx")

    # =========================================================================
    # BÀI 1: MÀN HÌNH TRANG CHỦ HOÀN CHỈNH (GIỜ 4 - BÀI TẬP 1)
    # =========================================================================
    p_b1 = doc.add_paragraph()
    p_b1.paragraph_format.space_before = Pt(10)
    p_b1.paragraph_format.space_after = Pt(4)
    run_b1 = p_b1.add_run("Bài 1: Màn hình Trang chủ BookStore hoàn chỉnh (Giờ 4 - Bài tập 1)")
    run_b1.font.name = 'Arial'
    run_b1.font.size = Pt(14.0)
    run_b1.font.bold = True
    run_b1.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
    
    p_req1 = doc.add_paragraph()
    p_req1.paragraph_format.space_before = Pt(2)
    p_req1.paragraph_format.space_after = Pt(4)
    p_req1.paragraph_format.line_spacing = 1.15
    run_req1_tag = p_req1.add_run("Đề bài (Gốc): ")
    run_req1_tag.font.name = 'Arial'
    run_req1_tag.font.size = Pt(10.0)
    run_req1_tag.font.bold = True
    run_req1_tag.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    run_req1_txt = p_req1.add_run(
        "Ghép Header (Giờ 1), Category Chips (Giờ 2), Book Grid (Giờ 3) và Floating Cart Button (Giờ 4) "
        "thành 1 màn hình Home hoàn chỉnh có thể cuộn được.\n"
        "Yêu cầu kỹ thuật: Cấu trúc: SafeAreaView (flex: 1) > Header (cố định, không nằm trong ScrollView) > "
        "ScrollView (flex: 1, chứa Chips + Grid) > Floating Cart Button (absolute, nằm ngoài ScrollView cùng cấp). "
        "ScrollView cần showsVerticalScrollIndicator={false} và contentContainerStyle có paddingBottom đủ lớn "
        "để Grid không bị nút giỏ hàng che mất phần tử cuối. "
        "Gợi ý: Nút nổi phải là con của View ngoài cùng (song song với ScrollView), không đặt bên trong ScrollView, "
        "nếu không nó sẽ cuộn theo nội dung."
    )
    run_req1_txt.font.name = 'Arial'
    run_req1_txt.font.size = Pt(10.0)
    run_req1_txt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    
    p_file1 = doc.add_paragraph()
    p_file1.paragraph_format.space_before = Pt(2)
    p_file1.paragraph_format.space_after = Pt(6)
    r_f1_tag = p_file1.add_run("📁 File component: ")
    r_f1_tag.font.name = 'Arial'
    r_f1_tag.font.size = Pt(9.5)
    r_f1_tag.font.bold = True
    r_f1_tag.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    r_f1_path = p_file1.add_run("src/bookstore-online/screens/HomeScreen.tsx")
    r_f1_path.font.name = 'Consolas'
    r_f1_path.font.size = Pt(9.5)
    r_f1_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec1_1 = doc.add_paragraph()
    p_sec1_1.paragraph_format.space_before = Pt(4)
    p_sec1_1.paragraph_format.space_after = Pt(4)
    r_s1_1 = p_sec1_1.add_run("1. Mã nguồn React Native / TypeScript:")
    r_s1_1.font.name = 'Arial'
    r_s1_1.font.size = Pt(11.0)
    r_s1_1.font.bold = True
    r_s1_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_home)
    
    p_sec1_2 = doc.add_paragraph()
    p_sec1_2.paragraph_format.space_before = Pt(8)
    p_sec1_2.paragraph_format.space_after = Pt(4)
    r_s1_2 = p_sec1_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Flexbox:")
    r_s1_2.font.name = 'Arial'
    r_s1_2.font.size = Pt(11.0)
    r_s1_2.font.bold = True
    r_s1_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Cấu trúc phân cấp 3 tầng độc lập: ", "Màn hình Home được xây dựng với SafeAreaView (flex: 1) bao bọc toàn bộ khung nhìn giúp chống tràn tai thỏ và thanh trạng thái; Header được đặt ở tầng cố định bên ngoài ScrollView; ScrollView (flex: 1) chứa phần nội dung cuộn; và FloatingCartButton neo absolute cùng cấp bên ngoài ScrollView.")
    add_bullet_point(doc, "Header cố định không bị trôi khi cuộn: ", "Bằng việc đặt thẻ <Header /> nằm ngoài <ScrollView>, Header không chịu tác động của thao tác cuộn trên trục dọc. Khi người dùng vuốt danh sách sách, ScrollView tự cuộn nội dung bên trong nó trong khi Header luôn đứng yên trên đỉnh.")
    add_bullet_point(doc, "Nút giỏ hàng nổi ngoài ScrollView (Sibling Absolute): ", "<FloatingCartButton /> là con trực tiếp của View ngoài cùng (cùng cấp với ScrollView) mang position: 'absolute', bottom: 24, right: 20. Nếu đặt nút này bên trong ScrollView, nó sẽ bị cuộn trôi theo nội dung danh sách thay vì ghim cố định ở góc dưới-phải màn hình.")
    add_bullet_point(doc, "Khoảng đệm an toàn paddingBottom: 110: ", "ScrollView sử dụng contentContainerStyle với paddingBottom: 110, tạo khoảng đệm đáy vừa đủ để cuốn sách cuối cùng trong lưới BookGrid có thể cuộn lên cao hoàn toàn mà không bị nút giỏ hàng tròn che lấp mất thông tin hay giá tiền.")
    add_bullet_point(doc, "Thuộc tính showsVerticalScrollIndicator={false}: ", "Ẩn thanh trượt cuộn dọc mặc định của hệ thống, mang lại trải nghiệm thị giác gọn gàng, liền mạch và chuyên nghiệp như các ứng dụng mua sắm hàng đầu hiện nay.")

    p_sec1_3 = doc.add_paragraph()
    p_sec1_3.paragraph_format.space_before = Pt(8)
    p_sec1_3.paragraph_format.space_after = Pt(4)
    r_s1_3 = p_sec1_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử:")
    r_s1_3.font.name = 'Arial'
    r_s1_3.font.size = Pt(11.0)
    r_s1_3.font.bold = True
    r_s1_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_1_gio4_ex1_home.png", width_in=3.6, caption="Hình 1.1: Giao diện Trang chủ hoàn chỉnh ở đỉnh màn hình (Header cố định, Chips, Grid và Nút giỏ nổi)")
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_2_gio4_ex1_scroll.png", width_in=3.6, caption="Hình 1.2: Giao diện khi cuộn xuống dưới: Header & Nút giỏ hàng đứng yên, nội dung sách cuộn mượt mà")
    
    p_div1 = doc.add_paragraph()
    p_div1.paragraph_format.space_before = Pt(8)
    p_div1.paragraph_format.space_after = Pt(8)
    r_d1 = p_div1.add_run("—" * 60)
    r_d1.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 2: MÀN HÌNH CHI TIẾT SÁCH (GIỜ 4 - BÀI TẬP 2)
    # =========================================================================
    p_b2 = doc.add_paragraph()
    p_b2.paragraph_format.space_before = Pt(10)
    p_b2.paragraph_format.space_after = Pt(4)
    run_b2 = p_b2.add_run("Bài 2: Màn hình Chi tiết sách (Book Detail) (Giờ 4 - Bài tập 2)")
    run_b2.font.name = 'Arial'
    run_b2.font.size = Pt(14.0)
    run_b2.font.bold = True
    run_b2.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
    
    p_req2 = doc.add_paragraph()
    p_req2.paragraph_format.space_before = Pt(2)
    p_req2.paragraph_format.space_after = Pt(4)
    p_req2.paragraph_format.line_spacing = 1.15
    run_req2_tag = p_req2.add_run("Đề bài (Gốc): ")
    run_req2_tag.font.name = 'Arial'
    run_req2_tag.font.size = Pt(10.0)
    run_req2_tag.font.bold = True
    run_req2_tag.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    run_req2_txt = p_req2.add_run(
        "Dựng màn hình chi tiết 1 cuốn sách: ảnh bìa lớn phía trên (căn giữa), tên sách + tác giả + giá + mô tả dài phía dưới (cuộn được), "
        "thanh 'Thêm vào giỏ' cố định dưới cùng màn hình.\n"
        "Yêu cầu kỹ thuật: Ảnh bìa lớn: alignSelf: 'center', width cố định hoặc theo %, aspectRatio giữ tỉ lệ. "
        "Phần mô tả dài đặt trong ScrollView riêng (flex: 1) để không đẩy tràn thanh 'Thêm vào giỏ' cố định phía dưới. "
        "Thanh dưới cùng: flexDirection: 'row', justifyContent: 'space-between', không nằm trong ScrollView. "
        "Gợi ý: Cấu trúc tổng thể tương tự bài tập 1: phần cố định (đầu/cuối) nằm ngoài ScrollView, phần nội dung dài nằm trong ScrollView ở giữa."
    )
    run_req2_txt.font.name = 'Arial'
    run_req2_txt.font.size = Pt(10.0)
    run_req2_txt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    
    p_file2 = doc.add_paragraph()
    p_file2.paragraph_format.space_before = Pt(2)
    p_file2.paragraph_format.space_after = Pt(6)
    r_f2_tag = p_file2.add_run("📁 File component: ")
    r_f2_tag.font.name = 'Arial'
    r_f2_tag.font.size = Pt(9.5)
    r_f2_tag.font.bold = True
    r_f2_tag.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    r_f2_path = p_file2.add_run("src/bookstore-online/screens/BookDetailScreen.tsx")
    r_f2_path.font.name = 'Consolas'
    r_f2_path.font.size = Pt(9.5)
    r_f2_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec2_1 = doc.add_paragraph()
    p_sec2_1.paragraph_format.space_before = Pt(4)
    p_sec2_1.paragraph_format.space_after = Pt(4)
    r_s2_1 = p_sec2_1.add_run("1. Mã nguồn React Native / TypeScript:")
    r_s2_1.font.name = 'Arial'
    r_s2_1.font.size = Pt(11.0)
    r_s2_1.font.bold = True
    r_s2_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_detail)
    
    p_sec2_2 = doc.add_paragraph()
    p_sec2_2.paragraph_format.space_before = Pt(8)
    p_sec2_2.paragraph_format.space_after = Pt(4)
    r_s2_2 = p_sec2_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Flexbox:")
    r_s2_2.font.name = 'Arial'
    r_s2_2.font.size = Pt(11.0)
    r_s2_2.font.bold = True
    r_s2_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Căn giữa ảnh bìa lớn bằng alignSelf 'center': ", "Khung chứa ảnh bìa lớn mang thuộc tính width: '65%' kết hợp alignSelf: 'center', giúp ảnh tự căn chính giữa trục ngang (Cross Axis) của container cha một cách cân đối tuyệt đối.")
    add_bullet_point(doc, "Duy trì tỉ lệ vàng của bìa sách với aspectRatio 3/4: ", "Sử dụng aspectRatio: 3/4 thay vì ép chiều cao height cứng, đảm bảo ảnh bìa luôn co giãn tỷ lệ thuận theo độ rộng màn hình của từng thiết bị, tránh hoàn toàn tình trạng méo hình hay vỡ ảnh.")
    add_bullet_point(doc, "ScrollView riêng (flex: 1) cho phần nội dung dài: ", "Toàn bộ thông tin sách (tiêu đề, tác giả, giá tiền, đánh giá, bảng thông số kỹ thuật và mô tả nội dung nhiều đoạn dài) được đặt trong một ScrollView riêng mang thuộc tính flex: 1. Nhờ đó, người dùng có thể cuộn đọc thỏa thích mà không đẩy tràn hay che khuất thanh 'Thêm vào giỏ' ở dưới.")
    add_bullet_point(doc, "Thanh 'Thêm vào giỏ' cố định dưới cùng (Fixed Bottom Bar): ", "Thanh hành động đáy được đặt bên ngoài ScrollView ở cuối container SafeAreaView. Sử dụng flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' để xếp bộ điều khiển số lượng [-] [1] [+] bên trái và nút bấm lớn [🛒 Thêm vào giỏ] bên phải.")
    add_bullet_point(doc, "Xử lý tương tác & Phản hồi trực quan: ", "Tích hợp tính năng tăng giảm số lượng mua linh hoạt, cập nhật tổng số tiền theo thời gian thực và hiển thị Toast thông báo màu xanh lá '✓ Đã thêm vào giỏ hàng thành công' tự động biến mất sau 2 giây.")

    p_sec2_3 = doc.add_paragraph()
    p_sec2_3.paragraph_format.space_before = Pt(8)
    p_sec2_3.paragraph_format.space_after = Pt(4)
    r_s2_3 = p_sec2_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử:")
    r_s2_3.font.name = 'Arial'
    r_s2_3.font.size = Pt(11.0)
    r_s2_3.font.bold = True
    r_s2_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_3_gio4_ex2_detail.png", width_in=3.6, caption="Hình 2.1: Màn hình Chi tiết sách (Ảnh bìa lớn căn giữa aspectRatio 3/4, thông tin & thanh cố định)")
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_4_gio4_ex2_detail_scroll.png", width_in=3.6, caption="Hình 2.2: Khi cuộn sâu xuống mô tả dài: Nội dung cuộn trơn tru, thanh Thêm vào giỏ đứng yên ở đáy")
    
    p_div2 = doc.add_paragraph()
    p_div2.paragraph_format.space_before = Pt(8)
    p_div2.paragraph_format.space_after = Pt(8)
    r_d2 = p_div2.add_run("—" * 60)
    r_d2.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 3: THANH TAB BAR DƯỚI CÙNG (GIỜ 5 - BÀI TẬP 1)
    # =========================================================================
    p_b3 = doc.add_paragraph()
    p_b3.paragraph_format.space_before = Pt(10)
    p_b3.paragraph_format.space_after = Pt(4)
    run_b3 = p_b3.add_run("Bài 3: Thanh Tab Bar dưới cùng (giao diện tĩnh) (Giờ 5 - Bài tập 1)")
    run_b3.font.name = 'Arial'
    run_b3.font.size = Pt(14.0)
    run_b3.font.bold = True
    run_b3.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
    
    p_req3 = doc.add_paragraph()
    p_req3.paragraph_format.space_before = Pt(2)
    p_req3.paragraph_format.space_after = Pt(4)
    p_req3.paragraph_format.line_spacing = 1.15
    run_req3_tag = p_req3.add_run("Đề bài (Gốc): ")
    run_req3_tag.font.name = 'Arial'
    run_req3_tag.font.size = Pt(10.0)
    run_req3_tag.font.bold = True
    run_req3_tag.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    run_req3_txt = p_req3.add_run(
        "Dựng thanh tab bar cố định ở đáy màn hình gồm 4 mục: Trang chủ, Danh mục, Giỏ hàng, Tài khoản — icon phía trên, chữ phía dưới, "
        "mục đang chọn có màu nổi bật.\n"
        "Yêu cầu kỹ thuật: Container tab bar: flexDirection: 'row', mỗi mục flex: 1 để chia đều 4 phần bằng nhau. "
        "Mỗi mục: flexDirection: 'column', alignItems: 'center', justifyContent: 'center'. "
        "Tab bar đặt position: 'absolute' ở đáy màn hình HOẶC đặt cố định ngoài ScrollView (so sánh 2 cách và nêu khi nào dùng cách nào). "
        "Gợi ý: Nếu dùng absolute cho tab bar, nhớ chừa paddingBottom cho nội dung phía trên để không bị tab bar che mất phần tử cuối."
    )
    run_req3_txt.font.name = 'Arial'
    run_req3_txt.font.size = Pt(10.0)
    run_req3_txt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    
    p_file3 = doc.add_paragraph()
    p_file3.paragraph_format.space_before = Pt(2)
    p_file3.paragraph_format.space_after = Pt(6)
    r_f3_tag = p_file3.add_run("📁 File component: ")
    r_f3_tag.font.name = 'Arial'
    r_f3_tag.font.size = Pt(9.5)
    r_f3_tag.font.bold = True
    r_f3_tag.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    r_f3_path = p_file3.add_run("src/bookstore-online/components/BottomTabBar.tsx")
    r_f3_path.font.name = 'Consolas'
    r_f3_path.font.size = Pt(9.5)
    r_f3_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec3_1 = doc.add_paragraph()
    p_sec3_1.paragraph_format.space_before = Pt(4)
    p_sec3_1.paragraph_format.space_after = Pt(4)
    r_s3_1 = p_sec3_1.add_run("1. Mã nguồn React Native / TypeScript:")
    r_s3_1.font.name = 'Arial'
    r_s3_1.font.size = Pt(11.0)
    r_s3_1.font.bold = True
    r_s3_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_tabbar)
    
    p_sec3_2 = doc.add_paragraph()
    p_sec3_2.paragraph_format.space_before = Pt(8)
    p_sec3_2.paragraph_format.space_after = Pt(4)
    r_s3_2 = p_sec3_2.add_run("2. Giải thích chi tiết mã nguồn & So sánh kỹ thuật 2 cách định vị:")
    r_s3_2.font.name = 'Arial'
    r_s3_2.font.size = Pt(11.0)
    r_s3_2.font.bold = True
    r_s3_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Phân bổ 4 mục bằng flex: 1: ", "Container Tab Bar thiết lập flexDirection: 'row', chiều cao 62px. Mỗi tab con mang flex: 1 giúp tự động chia đều chiều rộng màn hình thành 4 phần chính xác 25% mà không cần tính toán tọa độ pixel thủ công.")
    add_bullet_point(doc, "Bố cục cột thẳng hàng (flexDirection 'column'): ", "Bên trong mỗi tab, các phần tử xếp theo chiều dọc với flexDirection: 'column', alignItems: 'center', justifyContent: 'center'. Icon nằm trên và nhãn chữ nằm dưới, tạo sự đối xứng chuẩn thiết kế di động.")
    add_bullet_point(doc, "Điểm nhấn trạng thái kích hoạt (Active State): ", "Tab đang chọn được hiển thị với màu thương hiệu Indigo #4338CA, chữ in đậm (fontWeight: '700'), icon phóng to nhẹ và có vạch chỉ báo activeIndicator (rộng 20px, cao 2.5px) ở đáy. Tab chưa chọn có màu xám Slate #64748B.")
    add_bullet_point(doc, "Tích hợp Badge giỏ hàng nổi (Nested Absolute): ", "Icon giỏ hàng có badge tròn đỏ (#EF4444) mang position: 'absolute', top: -3, right: -8, tự động hiển thị số lượng sản phẩm có trong giỏ hàng.")
    add_bullet_point(doc, "So sánh Cách 1 — Đặt cố định ngoài ScrollView (Fixed in Normal Flow): ", "Tab bar là phần tử độc lập nằm sau ScrollView (flex: 1). Không bao giờ đè lên nội dung bên trong, không cần chừa paddingBottom thủ công. Khuyên dùng cho hầu hết các màn hình tiêu chuẩn có nền đục.")
    add_bullet_point(doc, "So sánh Cách 2 — Đặt tuyệt đối ở đáy (position: 'absolute'): ", "Tab bar neo ở bottom: 0, left: 0, right: 0 và nổi đè lên trên nội dung. Bắt buộc ScrollView phải có contentContainerStyle paddingBottom: 70 để không bị che khuất nội dung cuối. Thích hợp khi làm Tab bar trong suốt hoặc có hiệu ứng kính mờ (blur / glassmorphism).")

    p_sec3_3 = doc.add_paragraph()
    p_sec3_3.paragraph_format.space_before = Pt(8)
    p_sec3_3.paragraph_format.space_after = Pt(4)
    r_s3_3 = p_sec3_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử:")
    r_s3_3.font.name = 'Arial'
    r_s3_3.font.size = Pt(11.0)
    r_s3_3.font.bold = True
    r_s3_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_5_gio5_ex1_tabbar.png", width_in=3.6, caption="Hình 3.1: Giao diện thử nghiệm Tab Bar tĩnh 4 mục, toggle chuyển đổi chế độ & phân tích so sánh")
    
    p_div3 = doc.add_paragraph()
    p_div3.paragraph_format.space_before = Pt(8)
    p_div3.paragraph_format.space_after = Pt(8)
    r_d3 = p_div3.add_run("—" * 60)
    r_d3.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 4: MÀN HÌNH GIỎ HÀNG (GIỜ 5 - BÀI TẬP 2)
    # =========================================================================
    p_b4 = doc.add_paragraph()
    p_b4.paragraph_format.space_before = Pt(10)
    p_b4.paragraph_format.space_after = Pt(4)
    run_b4 = p_b4.add_run("Bài 4: Màn hình Giỏ hàng (Cart Screen) (Giờ 5 - Bài tập 2)")
    run_b4.font.name = 'Arial'
    run_b4.font.size = Pt(14.0)
    run_b4.font.bold = True
    run_b4.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
    
    p_req4 = doc.add_paragraph()
    p_req4.paragraph_format.space_before = Pt(2)
    p_req4.paragraph_format.space_after = Pt(4)
    p_req4.paragraph_format.line_spacing = 1.15
    run_req4_tag = p_req4.add_run("Đề bài (Gốc): ")
    run_req4_tag.font.name = 'Arial'
    run_req4_tag.font.size = Pt(10.0)
    run_req4_tag.font.bold = True
    run_req4_tag.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    run_req4_txt = p_req4.add_run(
        "Dựng màn hình giỏ hàng: danh sách các sản phẩm đã thêm (ảnh nhỏ - tên - số lượng - giá, mỗi dòng dạng row), "
        "phần tổng tiền + nút 'Thanh toán' cố định phía dưới, phía dưới có Tab Bar của Bài tập 1.\n"
        "Yêu cầu kỹ thuật: Mỗi dòng sản phẩm trong giỏ: flexDirection: 'row', alignItems: 'center', "
        "các phần tử con dùng flex để chia tỉ lệ hợp lý (ảnh cố định, tên flex:1, số lượng+giá width cố định). "
        "Danh sách sản phẩm cuộn được (ScrollView/flex:1), phần tổng tiền + nút thanh toán KHÔNG cuộn, nằm cố định ngay trên Tab Bar. "
        "Toàn màn hình phải xử lý đủ 3 vùng: nội dung cuộn ở giữa, thanh tổng tiền cố định, tab bar cố định — không vùng nào chồng lấp vùng nào. "
        "Gợi ý: Đây là bài tổng hợp toàn bộ 5 giờ: flex cơ bản, row/column, wrap, absolute, ScrollView kết hợp View cố định."
    )
    run_req4_txt.font.name = 'Arial'
    run_req4_txt.font.size = Pt(10.0)
    run_req4_txt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    
    p_file4 = doc.add_paragraph()
    p_file4.paragraph_format.space_before = Pt(2)
    p_file4.paragraph_format.space_after = Pt(6)
    r_f4_tag = p_file4.add_run("📁 File component: ")
    r_f4_tag.font.name = 'Arial'
    r_f4_tag.font.size = Pt(9.5)
    r_f4_tag.font.bold = True
    r_f4_tag.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    r_f4_path = p_file4.add_run("src/bookstore-online/screens/CartScreen.tsx")
    r_f4_path.font.name = 'Consolas'
    r_f4_path.font.size = Pt(9.5)
    r_f4_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec4_1 = doc.add_paragraph()
    p_sec4_1.paragraph_format.space_before = Pt(4)
    p_sec4_1.paragraph_format.space_after = Pt(4)
    r_s4_1 = p_sec4_1.add_run("1. Mã nguồn React Native / TypeScript:")
    r_s4_1.font.name = 'Arial'
    r_s4_1.font.size = Pt(11.0)
    r_s4_1.font.bold = True
    r_s4_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_cart)
    
    p_sec4_2 = doc.add_paragraph()
    p_sec4_2.paragraph_format.space_before = Pt(8)
    p_sec4_2.paragraph_format.space_after = Pt(4)
    r_s4_2 = p_sec4_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Flexbox 3 vùng độc lập:")
    r_s4_2.font.name = 'Arial'
    r_s4_2.font.size = Pt(11.0)
    r_s4_2.font.bold = True
    r_s4_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Kiến trúc 3 vùng không chồng lấp (Zero Overlap): ", "Màn hình phân định rõ 3 vùng độc lập theo trục dọc: Vùng 1 là ScrollView (flex: 1) chứa danh sách sản phẩm cuộn được; Vùng 2 là thanh summaryBar cố định hiển thị tạm tính, miễn phí ship và nút thanh toán; Vùng 3 là BottomTabBar cố định đáy. Cả 3 vùng xếp chồng theo thứ tự tự nhiên trong flex container cha mà không vùng nào bị lấn đè.")
    add_bullet_point(doc, "Bố cục dòng sản phẩm dạng Row chuẩn tỉ lệ: ", "Mỗi item card dùng flexDirection: 'row', alignItems: 'center'. Trong đó: Ảnh bìa nhỏ có kích thước cố định 64x84px; Khối tên sách & tác giả ở giữa mang flex: 1 để tự động chiếm toàn bộ khoảng trống còn lại; Cột số lượng và thành tiền mang width: 95px cố định căn lề phải.")
    add_bullet_point(doc, "Cắt tỉa văn bản dài với numberOfLines={2}: ", "Tên sách dài được bảo vệ bằng numberOfLines={2}, ngăn chặn hiện tượng văn bản quá dài đẩy vỡ khung chiều cao của card.")
    add_bullet_point(doc, "Thanh thanh toán cố định ngay trên Tab Bar: ", "Thanh summaryBar được đặt bên ngoài ScrollView và ngay phía trên BottomTabBar, có đổ bóng nhẹ shadowColor: '#000' ngược lên trên, tạo phân tách thị giác rõ rệt giữa vùng cuộn và vùng hành động.")
    add_bullet_point(doc, "Tương tác thời gian thực & Modal chúc mừng: ", "Người dùng có thể tăng/giảm số lượng từng cuốn sách, tổng tiền và phí vận chuyển tự động tính toán lại tức thì; khi bấm 'THANH TOÁN NGAY' sẽ kích hoạt Modal chúc mừng đặt hàng thành công đầy cuốn hút.")

    p_sec4_3 = doc.add_paragraph()
    p_sec4_3.paragraph_format.space_before = Pt(8)
    p_sec4_3.paragraph_format.space_after = Pt(4)
    r_s4_3 = p_sec4_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử:")
    r_s4_3.font.name = 'Arial'
    r_s4_3.font.size = Pt(11.0)
    r_s4_3.font.bold = True
    r_s4_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_6_gio5_ex2_cart.png", width_in=3.6, caption="Hình 4.1: Màn hình Giỏ hàng với 3 vùng tách biệt rõ ràng (Danh sách cuộn, Thanh thanh toán cố định, Tab Bar)")
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_7_gio5_ex2_checkout_success.png", width_in=3.6, caption="Hình 4.2: Modal thông báo xác nhận Đặt hàng thành công khi bấm Thanh toán ngay")
    
    p_div4 = doc.add_paragraph()
    p_div4.paragraph_format.space_before = Pt(8)
    p_div4.paragraph_format.space_after = Pt(8)
    r_d4 = p_div4.add_run("—" * 60)
    r_d4.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 5: TỔNG HỢP HOÀN THIỆN ỨNG DỤNG & KIỂM THỬ CHẤT LƯỢNG
    # =========================================================================
    p_b5 = doc.add_paragraph()
    p_b5.paragraph_format.space_before = Pt(10)
    p_b5.paragraph_format.space_after = Pt(4)
    run_b5 = p_b5.add_run("Bài 5: Ứng dụng BookStore Online hoàn thiện & Kiểm thử chất lượng (Giờ 4 + Giờ 5 Tổng hợp)")
    run_b5.font.name = 'Arial'
    run_b5.font.size = Pt(14.0)
    run_b5.font.bold = True
    run_b5.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
    
    p_req5 = doc.add_paragraph()
    p_req5.paragraph_format.space_before = Pt(2)
    p_req5.paragraph_format.space_after = Pt(4)
    p_req5.paragraph_format.line_spacing = 1.15
    run_req5_tag = p_req5.add_run("Đề bài (Gốc): ")
    run_req5_tag.font.name = 'Arial'
    run_req5_tag.font.size = Pt(10.0)
    run_req5_tag.font.bold = True
    run_req5_tag.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    run_req5_txt = p_req5.add_run(
        "Tích hợp toàn bộ hệ thống gồm Bottom Tab Bar điều hướng chuyển đổi tab giữa:\n"
        "• Tab 1: Trang chủ (Home) có Floating Cart Button và xem chi tiết sách\n"
        "• Tab 2: Danh mục (Categories) lọc và xem sách theo chip & grid\n"
        "• Tab 3: Giỏ hàng (Cart) với danh sách cuộn, tính tổng tiền, nút thanh toán cố định trên Bottom Tab\n"
        "• Tab 4: Tài khoản (Account/Profile) thông tin người dùng sinh viên Hà Chí Thanh\n"
        "Kiểm thử toàn bộ hệ thống bằng TypeScript Compiler (npx tsc --noEmit) đạt 0 lỗi hoàn hảo."
    )
    run_req5_txt.font.name = 'Arial'
    run_req5_txt.font.size = Pt(10.0)
    run_req5_txt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    
    p_file5 = doc.add_paragraph()
    p_file5.paragraph_format.space_before = Pt(2)
    p_file5.paragraph_format.space_after = Pt(6)
    r_f5_tag = p_file5.add_run("📁 File component: ")
    r_f5_tag.font.name = 'Arial'
    r_f5_tag.font.size = Pt(9.5)
    r_f5_tag.font.bold = True
    r_f5_tag.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    r_f5_path = p_file5.add_run("src/bookstore-online/App.tsx")
    r_f5_path.font.name = 'Consolas'
    r_f5_path.font.size = Pt(9.5)
    r_f5_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec5_1 = doc.add_paragraph()
    p_sec5_1.paragraph_format.space_before = Pt(4)
    p_sec5_1.paragraph_format.space_after = Pt(4)
    r_s5_1 = p_sec5_1.add_run("1. Mã nguồn React Native / TypeScript (App.tsx):")
    r_s5_1.font.name = 'Arial'
    r_s5_1.font.size = Pt(11.0)
    r_s5_1.font.bold = True
    r_s5_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_app)
    
    p_sec5_2 = doc.add_paragraph()
    p_sec5_2.paragraph_format.space_before = Pt(8)
    p_sec5_2.paragraph_format.space_after = Pt(4)
    r_s5_2 = p_sec5_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật điều phối ứng dụng:")
    r_s5_2.font.name = 'Arial'
    r_s5_2.font.size = Pt(11.0)
    r_s5_2.font.bold = True
    r_s5_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Quản lý trạng thái tập trung (Centralized State): ", "App.tsx đóng vai trò trung tâm điều phối, lưu trữ cartCount, currentTab và selectedBook. Khi thêm sách ở Home hoặc Chi tiết sách, số lượng giỏ hàng trên Header, Floating Cart Button và Tab Bar đều được cập nhật đồng bộ thời gian thực.")
    add_bullet_point(doc, "Điều hướng tĩnh thuần Flexbox (Zero External Library): ", "Không sử dụng thư viện navigation cồng kềnh, toàn bộ cơ chế chuyển đổi màn hình và chi tiết sản phẩm được thực hiện thuần túy bằng điều kiện rẽ nhánh View và Flexbox, bám sát trọng tâm học phần.")
    add_bullet_point(doc, "Màn hình Danh mục (Categories Screen): ", "Tích hợp hàng Category Chips tự động xuống dòng (flexWrap: 'wrap', gap: 8) và lưới sách 2 cột (width: '48%'), cho phép người dùng lọc và xem sách nhanh chóng theo thể loại.")
    add_bullet_point(doc, "Màn hình Tài khoản (Profile Screen): ", "Thiết kế thẻ hồ sơ sinh viên Hà Chí Thanh (MSSV: 23702221) với huy hiệu Thành viên Kim Cương, các thẻ thống kê số đơn hàng, số cuốn sách và danh mục cài đặt hệ thống chuyên nghiệp.")
    add_bullet_point(doc, "Kiểm thử TypeScript hoàn hảo 100%: ", "Thực thi lệnh kiểm tra npx tsc --noEmit trong thư mục dự án, kết quả vượt qua toàn bộ khâu thẩm định kiểu dữ liệu với ZERO errors (0 lỗi hoàn hảo).")

    p_sec5_3 = doc.add_paragraph()
    p_sec5_3.paragraph_format.space_before = Pt(8)
    p_sec5_3.paragraph_format.space_after = Pt(4)
    r_s5_3 = p_sec5_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử:")
    r_s5_3.font.name = 'Arial'
    r_s5_3.font.size = Pt(11.0)
    r_s5_3.font.bold = True
    r_s5_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_8_fullapp_categories.png", width_in=3.6, caption="Hình 5.1: Màn hình Danh mục sách (Tab Categories - Lọc sách theo Chip & Lưới sách 2 cột)")
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_9_fullapp_profile.png", width_in=3.6, caption="Hình 5.2: Màn hình Tài khoản (Tab Profile - Thông tin sinh viên Hà Chí Thanh, MSSV: 23702221)")
    add_image_safe(doc, r"D:\Android\screenshots_week4\shot_10_tsc_check.png", width_in=5.9, caption="Hình 5.3: Ảnh chụp màn hình Terminal xác minh biên dịch TypeScript (npx tsc --noEmit) 0 lỗi hoàn hảo")

    # Lưu tài liệu ra đường dẫn d:\Android\HaChiThanh_23702221_Tuan4.docx
    out_docx_path = r"D:\Android\HaChiThanh_23702221_Tuan4.docx"
    doc.save(out_docx_path)
    print(f"Báo cáo Word Tuần 4 đã được tạo thành công tại: {out_docx_path}")
    print(f"Kích thước tệp: {os.path.getsize(out_docx_path):,} bytes")

if __name__ == '__main__':
    build_report()
