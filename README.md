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

## Nhận RSVP từ khách mời

Website hiện đang gửi RSVP về Formspree endpoint trong `script.js`:

```js
rsvpEndpoint: "https://formspree.io/f/mdarnpgj"
```

Bạn xem phản hồi trong Formspree Dashboard của form này, hoặc email nhận thông báo đã cấu hình trong Formspree. Formspree Dashboard có chức năng export CSV. Vì Formspree không mở API danh sách phản hồi công khai cho GitHub Pages, trang admin `?admin=1` trên web không thể tự tải dữ liệu từ Formspree.

GitHub Pages là web tĩnh, nên cần một nơi lưu dữ liệu chung. Cách đơn giản là Google Sheets + Apps Script:

1. Tạo Google Sheet mới.
2. Vào `Extensions -> Apps Script`.
3. Dán nội dung file `google-apps-script-rsvp.js`.
4. Đổi `ADMIN_KEY`.
5. Deploy dạng Web app, quyền truy cập chọn `Anyone`.
6. Copy Web app URL vào `wedding.rsvpEndpoint` trong `script.js`.
7. Copy cùng `ADMIN_KEY` vào `wedding.adminKey`.

Khách mở link thường để gửi xác nhận. Admin mở thêm `?admin=1` để tải phản hồi và xuất Excel/PDF.

Nếu `rsvpEndpoint` hoặc `adminKey` còn để trống trong `script.js`, RSVP chỉ lưu tạm trong trình duyệt của từng thiết bị. Khi đó khách gửi trên điện thoại thì admin mở trên máy khác sẽ không thấy dữ liệu.
