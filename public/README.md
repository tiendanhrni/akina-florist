# Public Static Assets

Đặt các file tĩnh vào thư mục này — chúng sẽ được phục vụ tại root URL.

## Files cần thêm

### 1. `images/home/video-akinaflorist.mp4`
Video hero ở trang chủ. Reference từ `app/page.js`:
```
<source src="/images/home/video-akinaflorist.mp4" type="video/mp4" />
```

### 2. `favicon.ico` (tùy chọn)
Icon hiển thị trên tab trình duyệt.

### 3. `og-image.jpg` (tùy chọn)
Ảnh khi share lên Facebook/Zalo (1200x630px).

## Lưu ý
- Files trong thư mục này được commit vào Git và deploy lên Vercel.
- Nếu video quá nặng (>50MB), nên upload lên CDN/Sanity rồi link trực tiếp.
