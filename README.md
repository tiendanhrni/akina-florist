# Akina Florist Clone — Next.js

Website phong cách Akina Florist xây dựng bằng Next.js 14.

## Cấu trúc thư mục

```
akina-florist/
├── app/
│   ├── globals.css       ← CSS toàn cục, font, màu sắc
│   ├── layout.js         ← Root layout (thẻ <html>, metadata)
│   └── page.js           ← Trang chủ
├── components/
│   ├── PreHeader.js      ← Banner "Miễn phí giao hàng"
│   ├── Header.js         ← Thanh điều hướng
│   ├── HeroBanner.js     ← Slider ảnh lớn
│   ├── CategorySlider.js ← Danh mục sản phẩm
│   ├── StorySection.js   ← Câu chuyện thương hiệu
│   ├── WhySection.js     ← Vì sao Akina được yêu thích
│   └── Footer.js         ← Footer
├── public/
│   └── images/           ← Đặt ảnh sản phẩm vào đây
├── package.json
└── next.config.js
```

## Thêm ảnh thật vào

1. Đặt ảnh vào thư mục `public/images/`
2. Trong `HeroBanner.js`, thay dòng `placeholder` bằng:
   ```jsx
   <Image src="/images/hero-hoa-bo.jpg" fill style={{objectFit:'cover'}} alt="Hoa Bó" />
   ```
3. Tương tự cho `CategorySlider.js`

## Chạy local (trên máy tính)

```bash
npm install
npm run dev
```
Mở trình duyệt tại: http://localhost:3000

## Deploy lên Vercel (miễn phí)

### Bước 1 — Đẩy code lên GitHub
1. Tạo tài khoản tại github.com
2. Nhấn "New repository" → đặt tên `akina-florist` → Create
3. Upload toàn bộ thư mục này lên (kéo thả file)

### Bước 2 — Deploy lên Vercel
1. Vào vercel.com → đăng nhập bằng GitHub
2. Nhấn "Add New Project"
3. Chọn repo `akina-florist` vừa tạo
4. Nhấn Deploy → chờ 2 phút → website live!

### Bước 3 — Gắn tên miền riêng (tùy chọn)
1. Mua domain .vn tại tenmien.vn (~350k/năm)
2. Vào Vercel → Settings → Domains → thêm domain của bạn
3. Làm theo hướng dẫn trỏ DNS

## Tùy chỉnh nội dung

| Muốn thay đổi | Sửa file |
|---|---|
| Tên thương hiệu | `components/Header.js` + `components/Footer.js` |
| Banner trang chủ | `components/HeroBanner.js` |
| Danh mục sản phẩm | `components/CategorySlider.js` |
| Câu chuyện thương hiệu | `components/StorySection.js` |
| Lý do được yêu thích | `components/WhySection.js` |
| Địa chỉ, hotline | `components/Footer.js` |
| Màu sắc | `app/globals.css` → sửa `--color-primary` |
| SEO title/description | `app/layout.js` |
