# Oliu Drinks - E-Commerce Website 🍹

Một website bán hàng trực tuyến hoàn chỉnh cho thương hiệu trà sữa **Oliu Drinks** với giao diện hiện đại, tính năng mua hàng đầy đủ và thiết kế responsive.

## 📋 Tính Năng

### 1. **Giao Diện & Thiết Kế**
- ✅ Thiết kế hiện đại với bảng màu xanh lá chủ đạo + cam nhấn
- ✅ Hero banner với slider 5 giây tự động (hỗ trợ điều khiển)
- ✅ Social grid section hiển thị hình ảnh sản phẩm
- ✅ Brand story section - giới thiệu thương hiệu
- ✅ Featured carousel - sản phẩm nổi bật
- ✅ News/magazine section - tin tức & cập nhật
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Smooth animations & transitions

### 2. **Quản Lý Sản Phẩm**
- ✅ Danh mục sản phẩm (Trà sữa, Trà trái cây, Topping)
- ✅ Lọc sản phẩm theo danh mục
- ✅ Tìm kiếm sản phẩm theo tên/mô tả
- ✅ Sắp xếp (giá, tên)
- ✅ Hiển thị chi tiết sản phẩm với tùy chọn tuỳ chỉnh

### 3. **Tùy Chọn & Giá Cả**
- ✅ Size (M/L) - Size L +5.000đ
- ✅ Lựa chọn topping (trân châu, pudding, thạch, v.v.)
- ✅ Mức độ đá (không, ít, vừa, nhiều)
- ✅ Tính toán giá động
- ✅ Hiển thị giá tiền rõ ràng

### 4. **Giỏ Hàng & Thanh Toán**
- ✅ Giỏ hàng sidebar (mở/đóng mượt mà)
- ✅ Thêm/xoá sản phẩm
- ✅ Thay đổi số lượng
- ✅ Hỗ trợ các item cùng sản phẩm nhưng tuỳ chọn khác
- ✅ Trang giỏ hàng đầy đủ
- ✅ Trang thanh toán (checkout)
- ✅ Trang cảm ơn (thank you)
- ✅ Lưu giỏ hàng vào localStorage (persistent)

### 5. **Chức Năng "Mua Ngay"**
- ✅ Nút "Mua ngay" nổi bật (màu trắng + viền xanh)
- ✅ Bỏ qua giỏ hàng, chuyển thẳng sang checkout
- ✅ Tách biệt với giỏ hàng thường
- ✅ Hiển thị tóm tắt đơn hàng trong thanh toán

### 6. **Xác Thực Người Dùng**
- ✅ Trang đăng ký (register)
- ✅ Trang đăng nhập (login)
- ✅ Kiểm tra email unique
- ✅ Lưu user vào localStorage
- ✅ Session quản lý (sessionStorage)
- ✅ Hiển thị tên user trong header khi đã đăng nhập
- ✅ Nút logout

### 7. **CSS Modular**
- ✅ Tách CSS thành 7 file quản lý dễ:
  - `base.css` - Biến, reset, typography
  - `layout.css` - Header, footer, navigation
  - `hero.css` - Banner & slider
  - `buttons.css` - Tất cả button styles
  - `products.css` - Product grid, cards
  - `animations.css` - Transitions, animations
  - `forms.css` - Form fields, cart, checkout

### 8. **Images & Decorations**
- ✅ Sử dụng a1-a17.jpg cho sản phẩm & decoration
- ✅ menu.jpg cho hiển thị menu section
- ✅ sp1-sp17.jpg & tp1-tp9.jpg backup

## 📁 Cấu Trúc Dự Án

```
web_ban_hang/
├── index.html              # Trang chủ
├── sanpham.html           # Trang sản phẩm
├── product.html           # Chi tiết sản phẩm
├── cart.html              # Giỏ hàng
├── checkout.html          # Thanh toán
├── thankyou.html          # Cảm ơn
├── login.html             # Đăng nhập
├── register.html          # Đăng ký
├── gioithieu.html         # Giới thiệu
├── tintuc.html            # Tin tức
├── lienhe.html            # Liên hệ
├── header.html            # Header (nạp qua JS)
├── footer.html            # Footer (nạp qua JS)
├── auth.html              # Auth tabs
├── assets/
│   ├── css/
│   │   ├── base.css       # Base styles
│   │   ├── layout.css     # Header, footer
│   │   ├── hero.css       # Hero & slider
│   │   ├── buttons.css    # Buttons
│   │   ├── products.css   # Products grid
│   │   ├── animations.css # Animations
│   │   ├── forms.css      # Forms, cart
│   │   └── styles.css     # (Giữ backup)
│   ├── js/
│   │   ├── products.js       # Product data (26 items)
│   │   ├── cart.js           # Cart logic
│   │   ├── products-ui.js    # Product rendering
│   │   ├── product-detail.js # Product detail page
│   │   ├── auth.js           # Authentication
│   │   └── init.js           # Page initialization
│   └── images/
│       ├── a1-a17.jpg        # Product & decoration images
│       ├── sp1-sp17.jpg      # Backup product images
│       ├── tp1-tp9.jpg       # Topping images
│       ├── menu.jpg          # Menu display
│       └── s1-s3.jpg         # Hero slider (backup)
```

## 🎨 Bảng Màu

- **Primary Green**: `#18a64a` (Xanh lá chủ đạo)
- **Primary Dark**: `#12783a` (Xanh lá đậm)
- **Accent Orange**: `#f97316` (Cam nhấn)
- **Background**: `#f3f4f6` (Xám nhạt)
- **Text**: `#111827` (Đen)
- **Muted**: `#6b7280` (Xám)

## 🚀 Cách Sử Dụng

### 1. Mở trang chủ
```
Mở file index.html trong trình duyệt
- Xem hero banner chạy tự động
- Duyệt danh mục sản phẩm
- Xem tin tức & social grid
```

### 2. Mua sản phẩm
```
Sanpham.html → Chọn sản phẩm → Product.html
- Lựa chọn size, topping, đá
- Nhập số lượng
- Nhấn "Mua ngay" (skip giỏ) hoặc "Thêm vào giỏ"
```

### 3. Thanh toán
```
Giỏ hàng → Checkout → Cảm ơn
- Xem tóm tắt đơn hàng
- Nhập thông tin khách (demo)
- Hoàn tất đơn hàng
```

### 4. Đăng nhập
```
Header → Đăng nhập → Register/Login
- Tạo tài khoản mới
- Đăng nhập
- Tên user hiển thị ở header
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px - Full layout 2 cột
- **Tablet**: 768px - 1024px - Adjusted spacing
- **Mobile**: < 768px - Single column, optimized touch

## 💾 Lưu Trữ Dữ Liệu

- **Cart**: `localStorage['oliu_cart']` - Giỏ hàng persistent
- **Users**: `localStorage['oliu_users']` - Danh sách user
- **Session**: `sessionStorage['oliu_session']` - User hiện tại
- **Buy-now**: `sessionStorage['oliu_buy_now']` - Item mua ngay tạm

## 🔄 Slider & Carousel

### Hero Slider (5 giây autoplay)
- Tự động chuyển slide mỗi 5 giây
- Dừng khi hover, tiếp tục khi rời chuột
- Nút prev/next để điều khiển thủ công

### Featured Carousel
- Cuộn ngang (horizontal scroll)
- Nút ❮ ❯ để di chuyển từng item
- Responsive - số lượng item tự điều chỉnh

## ⚙️ Cài Đặt & Tùy Chỉnh

### Thay đổi màu sắc
Mở `assets/css/base.css` và sửa `:root` variables:
```css
:root {
  --primary: #18a64a;        /* Xanh lá chủ đạo */
  --primary-dark: #12783a;   /* Xanh lá đậm */
  --accent: #f97316;         /* Cam nhấn */
}
```

### Thay đổi tốc độ slider
Mở `assets/js/init.js`, tìm `startAutoPlay()`:
```javascript
sliderIntervalId = setInterval(() => {
  goToSlide(currentIndex + 1);
}, 5000);  // 5000ms = 5 giây (thay đổi số này)
```

### Thêm/sửa sản phẩm
Mở `assets/js/products.js` và chỉnh sửa mảng `products`:
```javascript
{
  id: 1,
  name: "Trà Sữa Thái Xanh",
  price: 25000,
  category: "tra-sua",
  image: "assets/images/a1.jpg",
  description: "Trà sữa truyền thống kèm trân châu",
  tag: "Bestseller"
}
```

## 📝 Ghi Chú

- Đây là bản **DEMO** - không có backend thực sự
- Dữ liệu lưu ở trình duyệt (localStorage/sessionStorage)
- Để sử dụng production, cần kết nối API backend
- Tất cả ảnh nên được đẩy lên server thực

## 🎯 Tính Năng Có Thể Mở Rộng

- [ ] Backend API (Node.js/Python/PHP)
- [ ] Database (MySQL/MongoDB)
- [ ] Payment gateway (Stripe/Momo/VNPay)
- [ ] Email notifications
- [ ] Admin panel
- [ ] Order tracking
- [ ] Push notifications
- [ ] Dark mode

## 📞 Liên Hệ & Hỗ Trợ

Website: Oliu Drinks  
Hotline: 0909 000 000  
Email: oliu.drinks@example.com

---

**Phiên bản**: 1.0  
**Cập nhật lần cuối**: 04/12/2025  
**Trạng thái**: Ready for testing ✅
