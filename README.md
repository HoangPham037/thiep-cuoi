# Thiệp cưới online

Website tĩnh dùng được trực tiếp với GitHub Pages.

## Sửa thông tin cưới

Mở `script.js` và sửa các giá trị trong biến `wedding` ở đầu file:

- `groom`, `bride`: tên chú rể và cô dâu.
- `date`, `displayDate`: ngày giờ cưới và dòng hiển thị.
- `events`: địa điểm, giờ lễ, link Google Maps.
- `contactEmail`: nếu điền email, form RSVP sẽ mở email soạn sẵn khi khách gửi.

## Chạy thử

Mở trực tiếp `index.html` trong trình duyệt, hoặc chạy một server tĩnh:

```powershell
python -m http.server 8080
```

Sau đó vào `http://127.0.0.1:8080`.

## Đăng lên GitHub Pages

Đẩy toàn bộ thư mục này lên repository GitHub, vào `Settings -> Pages`, chọn branch chính và thư mục root.
