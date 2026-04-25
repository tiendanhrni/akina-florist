# 🌸 Akina Florist

Website thương mại điện tử cho Akina Florist — xây dựng bằng **Next.js 15** + **Sanity CMS**, deploy trên **Vercel**.

## 📋 Yêu cầu

- **Node.js** ≥ 18.18.0
- Tài khoản **GitHub**
- Tài khoản **Vercel** (free)
- Tài khoản **Sanity** (free) — đã có project ID `q3i5b990`

---

## 🚀 Hướng dẫn deploy từ A → Z

### **Bước 1: Cài đặt local & test build**

```bash
# Clone hoặc giải nén project về máy
cd akina-florist

# Cài dependencies (sẽ tạo ra package-lock.json — RẤT QUAN TRỌNG cho Vercel)
npm install

# Tạo file .env.local từ template
cp .env.example .env.local

# Chạy dev server kiểm tra
npm run dev
```

Mở http://localhost:3000 — nếu trang chạy OK thì sang bước tiếp.

```bash
# Test build production trước khi push
npm run build
```

Nếu `npm run build` chạy thành công → mọi thứ đã sẵn sàng.

---

### **Bước 2: Push code lên GitHub**

```bash
git init
git add .
git commit -m "Initial commit: Akina Florist website"
git branch -M main

# Tạo repo mới trên GitHub (private hoặc public đều được)
# Sau đó:
git remote add origin https://github.com/<username>/akina-florist.git
git push -u origin main
```

---

### **Bước 3: Lấy Sanity API Token (tùy chọn)**

> ⚠️ Nếu dataset `production` của bạn là **public** (mặc định), **bỏ qua bước này**. Token chỉ cần khi dataset private hoặc dùng draft preview.

1. Vào https://www.sanity.io/manage
2. Chọn project Akina Florist (ID: `q3i5b990`)
3. Tab **API** → **Tokens** → **Add API token**
4. Tên: `Vercel Production`, Permission: **Viewer** (read-only)
5. Copy token (chỉ hiện 1 lần) — lưu lại để dùng ở Bước 5

---

### **Bước 4: Deploy lên Vercel**

1. Truy cập https://vercel.com/new
2. **Import** repo `akina-florist` từ GitHub
3. Vercel tự nhận diện là Next.js → KHÔNG đổi gì cả ở phần build
4. **Environment Variables** — bấm **Add** và điền lần lượt:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `q3i5b990` |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |
   | `NEXT_PUBLIC_SITE_URL` | `https://akina-florist.vercel.app` *(đổi sau khi có domain chính thức)* |
   | `SANITY_API_TOKEN` | *(token từ Bước 3, nếu có)* |

5. Bấm **Deploy** — chờ ~2-3 phút.

---

### **Bước 5: Cấu hình CORS trên Sanity (BẮT BUỘC)**

Sau khi Vercel deploy xong, bạn sẽ có URL kiểu `https://akina-florist-xxx.vercel.app`.

1. Vào https://www.sanity.io/manage → project `q3i5b990` → **API** → **CORS origins**
2. Bấm **Add CORS origin**
3. Origin: dán URL Vercel của bạn (ví dụ `https://akina-florist.vercel.app`)
4. ✅ Tick **Allow credentials**
5. Lặp lại cho mỗi domain bạn dùng (preview, custom domain...)

> 💡 Trong dev local, đã có sẵn `http://localhost:3000` cho phép.

---

### **Bước 6: Truy cập Studio CMS**

- Studio: `https://your-domain.vercel.app/studio`
- Đăng nhập bằng tài khoản Sanity của bạn
- Bắt đầu thêm: Banner, Danh mục, Sản phẩm, Workshop, Dự án...

> ⚠️ Lần đầu vào Studio có thể bị lỗi CORS — quay lại Bước 5 và double-check.

---

## 🛠 Cấu trúc thư mục

```
akina-florist/
├── app/                      # Next.js App Router
│   ├── page.js              # Trang chủ
│   ├── layout.js            # Root layout
│   ├── san-pham/            # Đặt hoa
│   │   ├── page.js
│   │   └── [category]/      # Trang danh mục
│   │       ├── page.js
│   │       └── [slug]/      # Trang chi tiết sản phẩm
│   ├── ve-akina-florist/    # Giới thiệu
│   ├── academy-va-workshop/ # Workshop
│   ├── du-an/               # Dự án
│   ├── chinh-sach/          # Chính sách
│   └── studio/              # Sanity Studio (/studio)
├── components/               # React components
├── lib/
│   ├── sanity.js            # Sanity client
│   └── queries.js           # GROQ queries
├── sanity/
│   └── schemas/             # Sanity schemas
├── public/                   # Static assets
├── .env.example             # Template biến môi trường
├── next.config.js
├── sanity.config.js         # Cấu hình Studio
└── package.json
```

---

## ❓ Troubleshooting

### Build fail trên Vercel: "Cannot find module..."
→ Kiểm tra `package-lock.json` đã được commit chưa. Chạy `npm install` ở local rồi commit file đó.

### Studio không load / lỗi CORS
→ Quay lại **Bước 5**, đảm bảo URL đã được thêm vào CORS origins với "Allow credentials".

### Hình ảnh 404
→ Kiểm tra `next.config.js` đã có `cdn.sanity.io` trong `images.remotePatterns` (đã có sẵn).

### Dữ liệu không cập nhật sau khi sửa trên Studio
→ ISR cache 60 giây. Đợi 1 phút hoặc:
- Vào Vercel Dashboard → Deployments → bấm **Redeploy**
- Hoặc setup webhook: Sanity → API → Webhooks → URL trỏ tới `https://your-domain.vercel.app/api/revalidate` (cần thêm route handler)

### Trang chi tiết sản phẩm 404
→ Đảm bảo trong Sanity Studio, sản phẩm có `slug` và `category` (reference) đã được fill đầy đủ.

---

## 📝 Workflow CMS

1. Truy cập `/studio` → đăng nhập
2. **Danh mục**: tạo các loại hoa (Hoa bó, Crystal box...) — đặt **slug** (URL)
3. **Sản phẩm**: tạo sản phẩm, gán vào **Danh mục**, upload ảnh
4. **Banner trang chủ**: upload ảnh hero slider
5. **Vì sao yêu thích**, **Thương hiệu**, **Gallery**: nội dung trang chủ
6. **Trang giới thiệu**: nội dung trang `/ve-akina-florist`
7. **Workshop**, **Dự án**: nội dung trang tương ứng

Sau khi save, đợi tối đa 60 giây hoặc redeploy để thấy thay đổi.

---

## 📞 Liên hệ

- Hotline: **0933 486 388**
- Website: https://akinaflorist.com

---

© 2025 Akina Florist. All rights reserved.
