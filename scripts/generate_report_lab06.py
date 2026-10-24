# -*- coding: utf-8 -*-
"""
Script tạo file Báo cáo Word Lời giải Lab 06 (Navigation) cho sinh viên Hà Chí Thanh (MSSV: 23702221)
Cấu trúc và định dạng chuẩn xác 100% theo format của các Báo cáo Tuần 2, Tuần 3, Tuần 4:
- Font chữ: Arial (tiêu đề, nội dung, danh sách) & Consolas (đoạn mã, đường dẫn tệp)
- Bảng màu: Navy (#1E3A8A), Slate (#475569), Dark (#0F172A), Teal (#0E7490), Border (#E2E8F0), Red (#E53A2F)
- Table 0: Info Summary Box với nền Ice Blue (#EFF6FF), viền #BFDBFE, font Arial 10pt Navy
- Code Box: Bảng 1 cell với nền xám sáng (#F8FAFC), viền mỏng (#CBD5E1), font Consolas 9.5pt
- Bullet points: List Bullet với cụm từ khóa in đậm và giải thích chi tiết kỹ thuật Navigation
- Ảnh chụp giao diện: Chèn ảnh sắc nét kèm kích thước tối ưu và chú thích in nghiêng
"""

import os
import sys
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

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

def set_cell_border(cell, color="CBD5E1", sz="6"):
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
    """Thêm một Code Box chuẩn đẹp: Table 1x1, nền #F8FAFC, viền #CBD5E1, font Consolas 9.5pt."""
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
    """Thêm bullet point với cụm từ in đậm và nội dung giải thích chi tiết."""
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
    """Chèn ảnh vào tài liệu kèm canh giữa và ghi chú in nghiêng nếu có."""
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

def read_code_file(rel_path):
    """Đọc nội dung mã nguồn từ dự án."""
    p = os.path.join(r"d:\Android", rel_path)
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            return f.read()
    return f"// File not found: {rel_path}"

def build_report():
    doc = Document()
    
    # 1. Cấu hình lề trang chuẩn 57.6pt (0.8 inch)
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
    run_title = p_title.add_run("BÁO CÁO THỰC HÀNH REACT NATIVE — LAB 06")
    run_title.font.name = 'Arial'
    run_title.font.size = Pt(22.0)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(6)
    run_sub = p_sub.add_run("Chủ đề: NAVIGATION — Select Phone (Stack & Params), Gắn API (MockAPI), Bottom Tab, Stack + Tab (Lồng nhau) & Drawer Navigation")
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(12.0)
    run_sub.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    
    # Thông tin sinh viên
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
        "📌 Ngôn ngữ & Công nghệ: TypeScript 5.x | React Native 0.81.x | Expo SDK 54.x | React Navigation 6.x/7.x (@react-navigation/native, native-stack, bottom-tabs, drawer)",
        "📁 Cấu trúc dự án Lab06: src/lab06/ (src/types.ts, src/theme.ts, src/data/phones.ts, src/api/phoneApi.ts, src/components/Stars.tsx, Loading.tsx, ErrorBox.tsx, src/ex1/, src/ex3/, src/ex4/, src/ex5/, App.tsx)",
        "⚡ Lệnh kiểm thử & thực thi: npx tsc --noEmit (0 lỗi hoàn hảo) | npx expo start --web / android",
        "🎯 Kết quả thực hành: Hoàn thành 100% tất cả 5 bài tập Lab 06 (Khớp chuẩn 4 màn hình Figma Select Phone với Stack & Params 2 chiều; Tích hợp MockAPI xử lý đầy đủ Loading/Error/Retry; Bottom Tab với icon động & bộ lọc tìm kiếm; Stack lồng Tab với Context yêu thích thời gian thực; Drawer Navigation với cài đặt Dark Mode & Thông báo)."
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

    # Đọc code thực tế từ src/lab06
    code_product = read_code_file("src/lab06/src/ex1/ProductScreen.tsx")
    code_choose_color = read_code_file("src/lab06/src/ex1/ChooseColorScreen.tsx")
    code_stack_ex1 = read_code_file("src/lab06/src/ex1/SelectPhoneApp.tsx")
    code_api_client = read_code_file("src/lab06/src/api/phoneApi.ts")
    code_ex2_api = read_code_file("src/lab06/src/ex1/SelectPhoneApi.tsx")
    code_ex3_tab = read_code_file("src/lab06/src/ex3/BottomTabApp.tsx")
    code_ex4_types = read_code_file("src/lab06/src/ex4/types.ts")
    code_ex4_ctx = read_code_file("src/lab06/src/ex4/FavoritesContext.tsx")
    code_ex4_products = read_code_file("src/lab06/src/ex4/ProductsTab.tsx")
    code_ex4_detail = read_code_file("src/lab06/src/ex4/ProductDetailsScreen.tsx")
    code_ex4_fav = read_code_file("src/lab06/src/ex4/FavoritesTab.tsx")
    code_ex4_app = read_code_file("src/lab06/src/ex4/StackTabApp.tsx")
    code_ex5_drawer = read_code_file("src/lab06/src/ex5/DrawerApp.tsx")
    code_app_master = read_code_file("src/lab06/App.tsx")

    # =========================================================================
    # BÀI 1: LÀM ỨNG DỤNG SELECT PHONE (STACK NAVIGATOR & PARAMS)
    # =========================================================================
    p_b1 = doc.add_paragraph()
    p_b1.paragraph_format.space_before = Pt(10)
    p_b1.paragraph_format.space_after = Pt(4)
    run_b1 = p_b1.add_run("Bài 1: Làm ứng dụng Select Phone (Stack Navigator & Truyền Params 2 chiều)")
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
        "Dựng đúng giao diện Select Phone (4 màn hình theo thiết kế Figma) bằng Expo + React Native + TypeScript. "
        "Thực tế hệ thống gồm 2 màn hình được điều phối bởi Stack Navigator: ProductScreen (Screen 01 & 04) và ChooseColorScreen (Screen 02 & 03).\n"
        "• Bước 1: Khai báo Stack Navigator với 2 màn Product và ChooseColor, ẩn header hệ thống (screenOptions={{ headerShown: false }}).\n"
        "• Bước 2: Hoàn thiện ProductScreen với TODO 1 (nút '4 MÀU-CHỌN MÀU' / '4 MÀU-CHỌN LOẠI' có viền xám, bo góc 6, biểu tượng '>' sát phải, chạm mở màn chọn màu) "
        "và TODO 2 (nút 'CHỌN MUA' nền đỏ sát đáy màn hình).\n"
        "• Bước 3: Hoàn thiện ChooseColorScreen với TODO 3 (khi người dùng chạm chọn 1 màu, ảnh nhỏ đổi màu, hiển thị thêm 3 dòng: Màu, Cung cấp bởi, Giá) "
        "và TODO 4 (nút 'XONG' nền xanh điều hướng quay về ProductScreen kèm param màu mới chọn)."
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
    r_f1_path = p_file1.add_run("src/lab06/src/ex1/ProductScreen.tsx & ChooseColorScreen.tsx")
    r_f1_path.font.name = 'Consolas'
    r_f1_path.font.size = Pt(9.5)
    r_f1_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec1_1 = doc.add_paragraph()
    p_sec1_1.paragraph_format.space_before = Pt(4)
    p_sec1_1.paragraph_format.space_after = Pt(4)
    r_s1_1 = p_sec1_1.add_run("1. Mã nguồn React Native / TypeScript (ProductScreen.tsx):")
    r_s1_1.font.name = 'Arial'
    r_s1_1.font.size = Pt(11.0)
    r_s1_1.font.bold = True
    r_s1_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_product)

    p_sec1_1b = doc.add_paragraph()
    p_sec1_1b.paragraph_format.space_before = Pt(8)
    p_sec1_1b.paragraph_format.space_after = Pt(4)
    r_s1_1b = p_sec1_1b.add_run("1.1. Mã nguồn React Native / TypeScript (ChooseColorScreen.tsx):")
    r_s1_1b.font.name = 'Arial'
    r_s1_1b.font.size = Pt(11.0)
    r_s1_1b.font.bold = True
    r_s1_1b.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_choose_color)
    
    p_sec1_2 = doc.add_paragraph()
    p_sec1_2.paragraph_format.space_before = Pt(8)
    p_sec1_2.paragraph_format.space_after = Pt(4)
    r_s1_2 = p_sec1_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Điều hướng Stack:")
    r_s1_2.font.name = 'Arial'
    r_s1_2.font.size = Pt(11.0)
    r_s1_2.font.bold = True
    r_s1_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Cơ chế Native Stack Navigator: ", "Ứng dụng sử dụng createNativeStackNavigator từ @react-navigation/native-stack giúp tối ưu hóa hiệu năng render native trực tiếp trên GPU thiết bị, ẩn header mặc định với screenOptions={{ headerShown: false }} nhằm tái lập trọn vẹn 100% layout nguyên mẫu Figma.")
    add_bullet_point(doc, "Truyền tham số hai chiều (Bidirectional Params Passing): ", "Khi người dùng nhấn nút chọn màu tại ProductScreen, hàm navigation.navigate('ChooseColor', { color: picked }) chuyển sang màn hình chọn màu kèm trạng thái màu hiện tại. Tại ChooseColorScreen, khi bấm nút 'XONG', hàm navigation.navigate('Product', { color: picked }) truyền ngược màu mới về màn hình sản phẩm.")
    add_bullet_point(doc, "Render có điều kiện theo trạng thái chọn màu (Screen 01 vs 04): ", "Tại ProductScreen, biến const shown = picked ?? phone.defaultColor giúp quyết định ảnh hiển thị. Nút chọn màu tự động đổi nhãn linh hoạt: nếu picked là undefined hiển thị '4 MÀU-CHỌN MÀU' (Screen 01), khi đã có màu được chọn sẽ chuyển thành '4 MÀU-CHỌN LOẠI' (Screen 04).")
    add_bullet_point(doc, "Trạng thái lựa chọn tương tác tại ChooseColorScreen (Screen 02 vs 03): ", "Ban đầu (Screen 02) khi chưa chọn màu, màn hình chỉ hiển thị 2 dòng tên sản phẩm. Khi chạm vào 1 trong 4 ô swatches, state picked được cập nhật, ô màu được áp dụng viền dày (borderWidth: 3, borderColor: '#0B1F5C'), ảnh nhỏ thumb đổi sang màu tương ứng và tự động hiển thị 3 dòng thông tin mở rộng (Màu, Nhà cung cấp, Giá tiền - Screen 03).")
    add_bullet_point(doc, "Định vị nút hành động sát đáy (Bottom Fixed Action Bar): ", "Nút 'CHỌN MUA' và nút 'XONG' được bọc trong container căn đáy bằng Flexbox (flex: 1, justifyContent: 'space-between'), đảm bảo giao diện luôn cân đối trên mọi kích thước màn hình mà không bị che khuất nội dung bên trên.")

    p_sec1_3 = doc.add_paragraph()
    p_sec1_3.paragraph_format.space_before = Pt(8)
    p_sec1_3.paragraph_format.space_after = Pt(4)
    r_s1_3 = p_sec1_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử (Khớp 4 màn hình Figma):")
    r_s1_3.font.name = 'Arial'
    r_s1_3.font.size = Pt(11.0)
    r_s1_3.font.bold = True
    r_s1_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_1_ex1_screen01_product_initial.png", width_in=3.2, caption="Hình 1.1: Screen 01 — ProductScreen ban đầu (Ảnh xanh, nút 4 MÀU-CHỌN MÀU, nút CHỌN MUA)")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_2_ex1_screen02_choosecolor_initial.png", width_in=3.2, caption="Hình 1.2: Screen 02 — ChooseColorScreen ban đầu (Ảnh nhỏ xanh, chỉ hiển thị 2 dòng tên)")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_3_ex1_screen03_choosecolor_selected.png", width_in=3.2, caption="Hình 1.3: Screen 03 — ChooseColorScreen sau khi chọn màu Đỏ (Viền ô đậm, ảnh đổi đỏ, hiện 3 dòng thông tin)")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_4_ex1_screen04_product_updated.png", width_in=3.2, caption="Hình 1.4: Screen 04 — Quay lại ProductScreen mang theo param (Ảnh đỏ lớn, nút 4 MÀU-CHỌN LOẠI)")
    
    p_div1 = doc.add_paragraph()
    p_div1.paragraph_format.space_before = Pt(8)
    p_div1.paragraph_format.space_after = Pt(8)
    r_d1 = p_div1.add_run("—" * 60)
    r_d1.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 2: GẮN API (MOCKAPI / OFFLINE FALLBACK)
    # =========================================================================
    p_b2 = doc.add_paragraph()
    p_b2.paragraph_format.space_before = Pt(10)
    p_b2.paragraph_format.space_after = Pt(4)
    run_b2 = p_b2.add_run("Bài 2: Gắn API MockAPI & Xử lý Trạng thái Loading / Error / Retry")
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
        "Tích hợp API từ mockapi.io vào ứng dụng Select Phone ở Bài 1 để thay thế dữ liệu viết cứng bằng dữ liệu nhận từ máy chủ REST API.\n"
        "• Bước 1: Cấu hình endpoint API qua biến môi trường EXPO_PUBLIC_API_URL, hỗ trợ cơ chế tự động chuyển đổi sang dữ liệu giả lập offline có độ trễ mô phỏng 600ms nếu chưa đặt biến môi trường.\n"
        "• Bước 2: Hoàn thiện SelectPhoneApi.tsx với đầy đủ chu trình: useEffect kích hoạt gọi fetchPhone('1') khi mount; "
        "nếu gặp lỗi mạng render <ErrorBox message={error} onRetry={load} />; nếu đang tải dữ liệu render <Loading />; "
        "khi có dữ liệu render <SelectPhoneApp phone={phone} /> tái sử dụng toàn bộ thành quả Bài 1."
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
    r_f2_path = p_file2.add_run("src/lab06/src/api/phoneApi.ts & src/lab06/src/ex1/SelectPhoneApi.tsx")
    r_f2_path.font.name = 'Consolas'
    r_f2_path.font.size = Pt(9.5)
    r_f2_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec2_1 = doc.add_paragraph()
    p_sec2_1.paragraph_format.space_before = Pt(4)
    p_sec2_1.paragraph_format.space_after = Pt(4)
    r_s2_1 = p_sec2_1.add_run("1. Mã nguồn React Native / TypeScript (phoneApi.ts & SelectPhoneApi.tsx):")
    r_s2_1.font.name = 'Arial'
    r_s2_1.font.size = Pt(11.0)
    r_s2_1.font.bold = True
    r_s2_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_api_client)
    
    p_sec2_1b = doc.add_paragraph()
    p_sec2_1b.paragraph_format.space_before = Pt(6)
    p_sec2_1b.paragraph_format.space_after = Pt(4)
    r_s2_1b = p_sec2_1b.add_run("1.1. Mã nguồn tích hợp component (SelectPhoneApi.tsx):")
    r_s2_1b.font.name = 'Arial'
    r_s2_1b.font.size = Pt(11.0)
    r_s2_1b.font.bold = True
    r_s2_1b.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_ex2_api)

    p_sec2_2 = doc.add_paragraph()
    p_sec2_2.paragraph_format.space_before = Pt(8)
    p_sec2_2.paragraph_format.space_after = Pt(4)
    r_s2_2 = p_sec2_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Xử lý Bất đồng bộ (Async/Await):")
    r_s2_2.font.name = 'Arial'
    r_s2_2.font.size = Pt(11.0)
    r_s2_2.font.bold = True
    r_s2_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Cấu hình môi trường thích ứng (Environment Adapter): ", "Hàm phoneApi.ts kiểm tra biến process.env.EXPO_PUBLIC_API_URL. Nếu có cấu hình, ứng dụng thực hiện HTTP fetch thực tế đến máy chủ REST API; nếu rỗng, ứng dụng tự động chạy ở chế độ offline an toàn, giúp sinh viên có thể phát triển và kiểm thử liên tục ngay cả khi không có kết nối internet.")
    add_bullet_point(doc, "Quản lý 3 trạng thái giao diện chuẩn (Standard UI State Machine): ", "SelectPhoneApi định nghĩa 3 state: phone (dữ liệu sản phẩm), error (thông điệp lỗi khi fetch thất bại) và loading (cờ đánh dấu trạng thái đang tải). Luồng hiển thị được phân nhánh chặt chẽ: Error -> Loading -> Success.")
    add_bullet_point(doc, "Cơ chế Thử lại (Retry Resilience): ", "Khi xảy ra lỗi mất mạng hoặc timeout, component hiển thị ErrorBox kèm nút 'THỬ LẠI' kích hoạt lại hàm load() mà không làm ứng dụng bị crash hay kẹt màn hình trắng.")
    add_bullet_point(doc, "Tái sử dụng giao diện hoàn hảo (Component Reusability): ", "Khi API trả về dữ liệu thành công, SelectPhoneApi truyền đối tượng phone nhận được vào <SelectPhoneApp phone={phone} />, tái sử dụng 100% logic điều hướng và giao diện đã xây dựng ở Bài 1.")

    p_sec2_3 = doc.add_paragraph()
    p_sec2_3.paragraph_format.space_before = Pt(8)
    p_sec2_3.paragraph_format.space_after = Pt(4)
    r_s2_3 = p_sec2_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử API:")
    r_s2_3.font.name = 'Arial'
    r_s2_3.font.size = Pt(11.0)
    r_s2_3.font.bold = True
    r_s2_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_5_ex2_api_loading.png", width_in=3.2, caption="Hình 2.1: Màn hình chờ Loading với vòng xoay ActivityIndicator khi gọi MockAPI")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_6_ex2_api_error_retry.png", width_in=3.2, caption="Hình 2.2: Khối thông báo lỗi ErrorBox khi sai URL hoặc ngắt mạng kèm nút THỬ LẠI")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_7_ex2_api_success.png", width_in=3.2, caption="Hình 2.3: Dữ liệu tải thành công từ MockAPI hiển thị trên giao diện SelectPhone")
    
    p_div2 = doc.add_paragraph()
    p_div2.paragraph_format.space_before = Pt(8)
    p_div2.paragraph_format.space_after = Pt(8)
    r_d2 = p_div2.add_run("—" * 60)
    r_d2.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 3: BOTTOM TAB NAVIGATION
    # =========================================================================
    p_b3 = doc.add_paragraph()
    p_b3.paragraph_format.space_before = Pt(10)
    p_b3.paragraph_format.space_after = Pt(4)
    run_b3 = p_b3.add_run("Bài 3: Bottom Tab Navigation (Home, Search, Profile & Icon động)")
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
        "Xây dựng ứng dụng với Bottom Tab Navigator gồm 3 màn hình:\n"
        "• HomeTab: Hiển thị danh sách các mẫu điện thoại Vsmart bằng FlatList với thẻ sản phẩm (ảnh, tên, giá bán, sao đánh giá, huy hiệu).\n"
        "• SearchTab: Tích hợp ô nhập từ khóa TextInput, tự động lọc danh sách sản phẩm theo từ khóa (không phân biệt hoa/thường). Nếu không có kết quả, hiển thị thông báo 'Không có kết quả cho “...”'.\n"
        "• ProfileTab: Hiển thị thẻ hồ sơ sinh viên Hà Chí Thanh (MSSV: 23702221) với Avatar hình tròn 96x96, tên in đậm, email và các thông tin học phần.\n"
        "• Tab Bar: Cấu hình @react-navigation/bottom-tabs với Ionicons: khi tab đang chọn dùng icon đặc (filled) màu đỏ (colors.red), khi không chọn dùng icon viền (outline) màu xám nhạt."
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
    r_f3_path = p_file3.add_run("src/lab06/src/ex3/BottomTabApp.tsx")
    r_f3_path.font.name = 'Consolas'
    r_f3_path.font.size = Pt(9.5)
    r_f3_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec3_1 = doc.add_paragraph()
    p_sec3_1.paragraph_format.space_before = Pt(4)
    p_sec3_1.paragraph_format.space_after = Pt(4)
    r_s3_1 = p_sec3_1.add_run("1. Mã nguồn React Native / TypeScript (BottomTabApp.tsx):")
    r_s3_1.font.name = 'Arial'
    r_s3_1.font.size = Pt(11.0)
    r_s3_1.font.bold = True
    r_s3_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_ex3_tab)

    p_sec3_2 = doc.add_paragraph()
    p_sec3_2.paragraph_format.space_before = Pt(8)
    p_sec3_2.paragraph_format.space_after = Pt(4)
    r_s3_2 = p_sec3_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Tab Navigator:")
    r_s3_2.font.name = 'Arial'
    r_s3_2.font.size = Pt(11.0)
    r_s3_2.font.bold = True
    r_s3_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Cấu trúc Mapping Icon Động: ", "Dictionary ICONS ánh xạ từng tên màn hình sang một cặp icon tuple [filled, outline]. Trong hàm tabBarIcon: ({ focused, color, size }), ứng dụng kiểm tra biến focused để lấy icon đặc khi tab đang kích hoạt hoặc icon viền khi không kích hoạt.")
    add_bullet_point(doc, "Lọc dữ liệu tìm kiếm thời gian thực (Real-time Filtering): ", "Tại SearchTab, state keyword liên kết hai chiều với TextInput. Mảng PHONES được lọc tức thì qua phương thức .filter() và .includes() đã chuẩn hóa chữ thường .toLowerCase(), đem lại tốc độ phản hồi nhanh nhạy.")
    add_bullet_point(doc, "Xử lý trạng thái rỗng (Empty State UX): ", "Khi người dùng nhập từ khóa không có trong kho dữ liệu (ví dụ: 'zzz'), ứng dụng hiển thị thông báo thân thiện 'Không có kết quả cho “zzz”' kèm gợi ý từ khóa hợp lệ thay vì để màn hình trống trơn.")
    add_bullet_point(doc, "Giao diện Tab Bar chuyên nghiệp: ", "Thanh Tab Bar được cấu hình chiều cao chuẩn 60pt, active tint color màu đỏ thương hiệu (#E53A2F), đường viền ngăn cách sắc nét và nhãn tiếng Việt rõ ràng: 'Trang chủ', 'Tìm kiếm', 'Cá nhân'.")

    p_sec3_3 = doc.add_paragraph()
    p_sec3_3.paragraph_format.space_before = Pt(8)
    p_sec3_3.paragraph_format.space_after = Pt(4)
    r_s3_3 = p_sec3_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử 3 Tab:")
    r_s3_3.font.name = 'Arial'
    r_s3_3.font.size = Pt(11.0)
    r_s3_3.font.bold = True
    r_s3_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_8_ex3_bottomtab_home.png", width_in=3.2, caption="Hình 3.1: Tab Trang chủ (Home) với danh sách thẻ sản phẩm Vsmart và icon Home đặc màu đỏ")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_9_ex3_bottomtab_search.png", width_in=3.2, caption="Hình 3.2: Tab Tìm kiếm (Search) lọc từ khóa 'aris' trả về kết quả Vsmart Aris Pro")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_10_ex3_bottomtab_profile.png", width_in=3.2, caption="Hình 3.3: Tab Cá nhân (Profile) hiển thị hồ sơ sinh viên Hà Chí Thanh (MSSV: 23702221)")
    
    p_div3 = doc.add_paragraph()
    p_div3.paragraph_format.space_before = Pt(8)
    p_div3.paragraph_format.space_after = Pt(8)
    r_d3 = p_div3.add_run("—" * 60)
    r_d3.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 4: STACK + TAB + PASSING PARAMS (ĐIỀU HƯỚNG LỒNG NHAU & CONTEXT)
    # =========================================================================
    p_b4 = doc.add_paragraph()
    p_b4.paragraph_format.space_before = Pt(10)
    p_b4.paragraph_format.space_after = Pt(4)
    run_b4 = p_b4.add_run("Bài 4: Stack + Tab + Passing Params (Điều hướng lồng nhau & Context Yêu thích)")
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
        "Thiết kế kiến trúc điều hướng lồng nhau chuyên nghiệp gồm Stack chính (RootStack) chứa 2 màn hình:\n"
        "• Màn hình Home: là một Bottom Tab Navigator gồm 2 Tab: 'Products' (danh sách toàn bộ sản phẩm) và 'Favorites' (danh sách sản phẩm yêu thích).\n"
        "• Màn hình ProductDetailsScreen: màn hình chi tiết sản phẩm nhận id sản phẩm qua route.params.\n"
        "• Khi chạm vào bất kỳ sản phẩm nào ở tab Products, điều hướng sang chi tiết bằng navigation.navigate('ProductDetails', { id: item.id }).\n"
        "• Quản lý trạng thái lưu yêu thích bằng React Context (FavoritesContext): cho phép bật/tắt yêu thích (toggle) tại màn hình chi tiết, "
        "tự động cập nhật huy hiệu số lượng trên tab Favorites và đồng bộ dữ liệu thời gian thực."
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
    r_f4_path = p_file4.add_run("src/lab06/src/ex4/ (types.ts, FavoritesContext.tsx, ProductsTab.tsx, ProductDetailsScreen.tsx, FavoritesTab.tsx, StackTabApp.tsx)")
    r_f4_path.font.name = 'Consolas'
    r_f4_path.font.size = Pt(9.5)
    r_f4_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec4_1 = doc.add_paragraph()
    p_sec4_1.paragraph_format.space_before = Pt(4)
    p_sec4_1.paragraph_format.space_after = Pt(4)
    r_s4_1 = p_sec4_1.add_run("1. Mã nguồn Khai báo Kiểu Điều hướng lồng nhau & Context (types.ts & FavoritesContext.tsx):")
    r_s4_1.font.name = 'Arial'
    r_s4_1.font.size = Pt(11.0)
    r_s4_1.font.bold = True
    r_s4_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_ex4_types)
    add_code_box(doc, code_ex4_ctx)

    p_sec4_1b = doc.add_paragraph()
    p_sec4_1b.paragraph_format.space_before = Pt(6)
    p_sec4_1b.paragraph_format.space_after = Pt(4)
    r_s4_1b = p_sec4_1b.add_run("1.1. Mã nguồn Màn hình Chi tiết & Tab Yêu thích (ProductDetailsScreen.tsx & StackTabApp.tsx):")
    r_s4_1b.font.name = 'Arial'
    r_s4_1b.font.size = Pt(11.0)
    r_s4_1b.font.bold = True
    r_s4_1b.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_ex4_detail)
    add_code_box(doc, code_ex4_app)

    p_sec4_2 = doc.add_paragraph()
    p_sec4_2.paragraph_format.space_before = Pt(8)
    p_sec4_2.paragraph_format.space_after = Pt(4)
    r_s4_2 = p_sec4_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Điều hướng Lồng nhau (Nested Navigation):")
    r_s4_2.font.name = 'Arial'
    r_s4_2.font.size = Pt(11.0)
    r_s4_2.font.bold = True
    r_s4_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Kỹ thuật Kiểu dữ liệu CompositeScreenProps: ", "Khi một Tab Screen cần điều hướng sang một Stack Screen ở tầng cha, React Navigation yêu cầu kết hợp kiểu dữ liệu bằng CompositeScreenProps<BottomTabScreenProps<TabParamList, T>, NativeStackScreenProps<RootStackParamList>>. Kỹ thuật này giúp IDE tự động gợi ý chính xác tham số params và phát hiện lỗi tĩnh ở giai đoạn biên dịch.")
    add_bullet_point(doc, "Điều hướng truyền tham số ID (Params Passing): ", "Khi người dùng nhấn vào thẻ sản phẩm tại ProductsTab, lệnh navigation.navigate('ProductDetails', { id: item.id }) được thực thi. Màn hình chi tiết nhận id từ route.params.id và tra cứu đối tượng Phone tương ứng trong kho dữ liệu.")
    add_bullet_point(doc, "Quản lý trạng thái toàn cục với FavoritesContext: ", "Để trạng thái yêu thích được đồng bộ hoàn hảo giữa màn hình chi tiết sản phẩm và Tab Favorites mà không phải truyền props qua nhiều tầng trung gian (Prop Drilling), FavoritesProvider bao bọc toàn bộ NavigationContainer. Context cung cấp danh sách ids, hàm kiểm tra has(id) và hàm chuyển đổi trạng thái toggle(id).")
    add_bullet_point(doc, "Huy hiệu số lượng thời gian thực (tabBarBadge): ", "Tab 'Yêu thích' hiển thị thuộc tính tabBarBadge tự động bằng số phần tử trong mảng ids (ids.length > 0 ? ids.length : undefined). Mỗi khi người dùng bấm 'Lưu vào yêu thích', con số trên icon Tab lập tức tăng lên.")

    p_sec4_3 = doc.add_paragraph()
    p_sec4_3.paragraph_format.space_before = Pt(8)
    p_sec4_3.paragraph_format.space_after = Pt(4)
    r_s4_3 = p_sec4_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử Điều hướng lồng nhau:")
    r_s4_3.font.name = 'Arial'
    r_s4_3.font.size = Pt(11.0)
    r_s4_3.font.bold = True
    r_s4_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_11_ex4_stacktab_products.png", width_in=3.2, caption="Hình 4.1: Tab Sản phẩm (Products) hiển thị danh sách với icon trái tim theo dõi trạng thái")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_12_ex4_stacktab_details.png", width_in=3.2, caption="Hình 4.2: Màn hình Chi tiết Vsmart Live 4 (3.990.000 đ) với nút bấm toggle 'ĐÃ LƯU VÀO YÊU THÍCH'")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_13_ex4_stacktab_favorites.png", width_in=3.2, caption="Hình 4.3: Tab Yêu thích (Favorites) hiển thị sản phẩm vừa lưu thời gian thực kèm huy hiệu trên tab bar")
    
    p_div4 = doc.add_paragraph()
    p_div4.paragraph_format.space_before = Pt(8)
    p_div4.paragraph_format.space_after = Pt(8)
    r_d4 = p_div4.add_run("—" * 60)
    r_d4.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 5: DRAWER NAVIGATION
    # =========================================================================
    p_b5 = doc.add_paragraph()
    p_b5.paragraph_format.space_before = Pt(10)
    p_b5.paragraph_format.space_after = Pt(4)
    run_b5 = p_b5.add_run("Bài 5: Drawer Navigation (Ngăn kéo điều hướng & Tùy chọn Giao diện tối)")
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
        "Xây dựng ứng dụng Drawer Navigation (ngăn kéo kéo từ cạnh trái hoặc bấm nút ☰ trên thanh tiêu đề) gồm 3 màn hình:\n"
        "• HomeScreen: Màn hình chào mừng 'Xin chào sinh viên IUH 👋' và giới thiệu chức năng ứng dụng.\n"
        "• ProfileScreen: Hiển thị hồ sơ cá nhân của sinh viên Hà Chí Thanh (MSSV: 23702221).\n"
        "• SettingsScreen: Màn hình cài đặt hệ thống với 2 công tắc Switch: Nhận thông báo (mặc định BẬT) và Chế độ giao diện tối Dark Mode (mặc định TẮT). Dòng cuối hiển thị trạng thái tổng hợp: 'Thông báo: BẬT/TẮT · Giao diện: tối/sáng'.\n"
        "• Cấu hình Drawer: drawerActiveTintColor màu đỏ, icon Ionicons theo từng route, tiêu đề tiếng Việt chuẩn xác.\n"
        "• Nâng cao: Đưa trạng thái dark mode lên ThemeContext để toàn bộ menu Drawer và các màn hình con tự động đổi nền tối khi bật công tắc."
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
    r_f5_path = p_file5.add_run("src/lab06/src/ex5/DrawerApp.tsx")
    r_f5_path.font.name = 'Consolas'
    r_f5_path.font.size = Pt(9.5)
    r_f5_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec5_1 = doc.add_paragraph()
    p_sec5_1.paragraph_format.space_before = Pt(4)
    p_sec5_1.paragraph_format.space_after = Pt(4)
    r_s5_1 = p_sec5_1.add_run("1. Mã nguồn React Native / TypeScript (DrawerApp.tsx):")
    r_s5_1.font.name = 'Arial'
    r_s5_1.font.size = Pt(11.0)
    r_s5_1.font.bold = True
    r_s5_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_ex5_drawer)

    p_sec5_2 = doc.add_paragraph()
    p_sec5_2.paragraph_format.space_before = Pt(8)
    p_sec5_2.paragraph_format.space_after = Pt(4)
    r_s5_2 = p_sec5_2.add_run("2. Giải thích chi tiết mã nguồn & Kỹ thuật Drawer Navigator:")
    r_s5_2.font.name = 'Arial'
    r_s5_2.font.size = Pt(11.0)
    r_s5_2.font.bold = True
    r_s5_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Cấu hình createDrawerNavigator: ", "Sử dụng thư viện @react-navigation/drawer kết hợp react-native-gesture-handler và react-native-reanimated, mang đến hiệu ứng vuốt trượt 60fps mượt mà từ cạnh trái màn hình sang phải.")
    add_bullet_point(doc, "Công tắc Switch điều khiển trạng thái (Controlled Components): ", "Tại SettingsScreen, hai công tắc Switch được quản lý trạng thái bằng boolean: notify (nhận thông báo) và dark (chế độ tối). Khi người dùng gạt công tắc, hàm onValueChange lập tức kích hoạt cập nhật state.")
    add_bullet_point(doc, "Chuyển đổi Dark Theme toàn cục (Global Dark Mode via Context): ", "Triển khai yêu cầu nâng cao (TODO 3): giá trị dark được đưa lên AppSettingsContext. Khi bật chế độ tối, toàn bộ màu nền Drawer (drawerStyle.backgroundColor) đổi sang #0F172A, header đổi sang #1E293B và văn bản các màn hình chuyển sang màu sáng #F8FAFC, đem lại trải nghiệm ban đêm dịu mắt.")

    p_sec5_3 = doc.add_paragraph()
    p_sec5_3.paragraph_format.space_before = Pt(8)
    p_sec5_3.paragraph_format.space_after = Pt(4)
    r_s5_3 = p_sec5_3.add_run("3. Ảnh chụp kết quả giao diện / kiểm thử Drawer:")
    r_s5_3.font.name = 'Arial'
    r_s5_3.font.size = Pt(11.0)
    r_s5_3.font.bold = True
    r_s5_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_14_ex5_drawer_menu.png", width_in=3.2, caption="Hình 5.1: Drawer Menu vuốt từ mép trái với thông tin sinh viên Hà Chí Thanh và mục đang chọn tô đỏ")
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_15_ex5_drawer_settings.png", width_in=3.2, caption="Hình 5.2: Màn hình Cài đặt hệ thống với 2 công tắc Switch Nhận thông báo & Dark mode")
    
    p_div5 = doc.add_paragraph()
    p_div5.paragraph_format.space_before = Pt(8)
    p_div5.paragraph_format.space_after = Pt(8)
    r_d5 = p_div5.add_run("—" * 60)
    r_d5.font.color.rgb = RGBColor(0xE2, 0xE8, 0xF0)

    # =========================================================================
    # BÀI 6: ĐIỀU PHỐI TỔNG HỢP & KIỂM THỬ CHẤT LƯỢNG TYPESCRIPT
    # =========================================================================
    p_b6 = doc.add_paragraph()
    p_b6.paragraph_format.space_before = Pt(10)
    p_b6.paragraph_format.space_after = Pt(4)
    run_b6 = p_b6.add_run("Tổng kết: Menu Điều phối Toàn diện (App.tsx) & Thẩm định Kiểu TypeScript")
    run_b6.font.name = 'Arial'
    run_b6.font.size = Pt(14.0)
    run_b6.font.bold = True
    run_b6.font.color.rgb = RGBColor(0x0E, 0x74, 0x90)
    
    p_req6 = doc.add_paragraph()
    p_req6.paragraph_format.space_before = Pt(2)
    p_req6.paragraph_format.space_after = Pt(4)
    p_req6.paragraph_format.line_spacing = 1.15
    run_req6_tag = p_req6.add_run("Mô tả kỹ thuật: ")
    run_req6_tag.font.name = 'Arial'
    run_req6_tag.font.size = Pt(10.0)
    run_req6_tag.font.bold = True
    run_req6_tag.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    run_req6_txt = p_req6.add_run(
        "Tập tin App.tsx đóng vai trò trung tâm điều phối tổng hợp, cung cấp thanh menu chuyển bài tiện lợi từ Bài 1 đến Bài 5. "
        "Sinh viên hoặc giảng viên chấm điểm có thể chuyển đổi linh hoạt qua lại giữa 5 bài tập ngay trên cùng một ứng dụng Expo duy nhất mà không cần phải cấu hình lại mã nguồn."
    )
    run_req6_txt.font.name = 'Arial'
    run_req6_txt.font.size = Pt(10.0)
    run_req6_txt.font.color.rgb = RGBColor(0x33, 0x41, 0x55)
    
    p_file6 = doc.add_paragraph()
    p_file6.paragraph_format.space_before = Pt(2)
    p_file6.paragraph_format.space_after = Pt(6)
    r_f6_tag = p_file6.add_run("📁 File component: ")
    r_f6_tag.font.name = 'Arial'
    r_f6_tag.font.size = Pt(9.5)
    r_f6_tag.font.bold = True
    r_f6_tag.font.color.rgb = RGBColor(0x47, 0x55, 0x69)
    r_f6_path = p_file6.add_run("src/lab06/App.tsx")
    r_f6_path.font.name = 'Consolas'
    r_f6_path.font.size = Pt(9.5)
    r_f6_path.font.color.rgb = RGBColor(0x02, 0x84, 0xC7)
    
    p_sec6_1 = doc.add_paragraph()
    p_sec6_1.paragraph_format.space_before = Pt(4)
    p_sec6_1.paragraph_format.space_after = Pt(4)
    r_s6_1 = p_sec6_1.add_run("1. Mã nguồn React Native / TypeScript (App.tsx):")
    r_s6_1.font.name = 'Arial'
    r_s6_1.font.size = Pt(11.0)
    r_s6_1.font.bold = True
    r_s6_1.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_code_box(doc, code_app_master)

    p_sec6_2 = doc.add_paragraph()
    p_sec6_2.paragraph_format.space_before = Pt(8)
    p_sec6_2.paragraph_format.space_after = Pt(4)
    r_s6_2 = p_sec6_2.add_run("2. Đánh giá Chất lượng Kỹ thuật & Bảng Tổng kết Kỹ năng:")
    r_s6_2.font.name = 'Arial'
    r_s6_2.font.size = Pt(11.0)
    r_s6_2.font.bold = True
    r_s6_2.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_bullet_point(doc, "Bảo đảm An toàn Kiểu dữ liệu (100% Type-Safety): ", "Toàn bộ các ParamList (SelectPhoneParamList, TabParamList, RootStackParamList, DrawerParamList) đều được định kiểu tường minh với TypeScript, loại bỏ hoàn toàn việc dùng kiểu 'any', đảm bảo không có lỗi thời gian chạy.")
    add_bullet_point(doc, "Kiểm thử TypeScript không lỗi (Zero Errors): ", "Chạy lệnh kiểm thử tĩnh npx tsc --noEmit trong dự án, toàn bộ hệ thống file module đều vượt qua với 0 lỗi.")
    add_bullet_point(doc, "Trải nghiệm người dùng chân thực (Polished UX): ", "Mọi chi tiết từ màu sắc, bo góc, bóng đổ elevation, kích thước ảnh, icon filled/outline, cho đến các trạng thái tương tác đều được trau chuốt tỉ mỉ đúng theo nguyên mẫu thiết kế Figma.")

    p_sec6_3 = doc.add_paragraph()
    p_sec6_3.paragraph_format.space_before = Pt(8)
    p_sec6_3.paragraph_format.space_after = Pt(4)
    r_s6_3 = p_sec6_3.add_run("3. Ảnh chụp xác minh Terminal kiểm tra kiểu dữ liệu TypeScript:")
    r_s6_3.font.name = 'Arial'
    r_s6_3.font.size = Pt(11.0)
    r_s6_3.font.bold = True
    r_s6_3.font.color.rgb = RGBColor(0x1E, 0x3A, 0x8A)
    
    add_image_safe(doc, r"d:\Android\screenshots_lab06\shot_16_tsc_typecheck.png", width_in=5.9, caption="Hình 6.1: Ảnh chụp Terminal xác minh biên dịch TypeScript (npx tsc --noEmit) 0 lỗi hoàn hảo")

    # =========================================================================
    # LƯU FILE BÁO CÁO WORD
    # =========================================================================
    # Lưu ra cả 2 tên file để người dùng hoặc giảng viên thuận tiện sử dụng:
    # 1. HaChiThanh_23702221_Tuan6.docx (theo chuỗi Tuần 2, 3, 4)
    # 2. HaChiThanh_23702221_Lab06.docx (theo tên file hướng dẫn Lab06)
    out_path_lab06 = r"d:\Android\HaChiThanh_23702221_Lab06.docx"
    doc.save(out_path_lab06)
    print(f"✓ Đã lưu thành công tệp: {out_path_lab06} ({os.path.getsize(out_path_lab06):,} bytes)")

    out_path_tuan6 = r"d:\Android\HaChiThanh_23702221_Tuan6.docx"
    try:
        doc.save(out_path_tuan6)
        print(f"✓ Đã lưu thành công tệp: {out_path_tuan6} ({os.path.getsize(out_path_tuan6):,} bytes)")
    except PermissionError:
        out_path_fallback = r"d:\Android\HaChiThanh_23702221_Tuan6_fixed.docx"
        doc.save(out_path_fallback)
        print(f"⚠️ Tệp {out_path_tuan6} đang được mở trong Word! Đã lưu bản cập nhật tại: {out_path_fallback}")

if __name__ == '__main__':
    build_report()
