# Tài liệu Yêu cầu

## Giới thiệu

Xây dựng Landing Page cho công ty công nghệ **Glomix** (tên miền: glomix.cloud) — chuyên cung cấp dịch vụ AWS Managed Services, Cloud Migration và AI Integration cho doanh nghiệp vừa và nhỏ (SME) tại Việt Nam.

Dự án được phát triển trên nền tảng hiện có (Next.js App Router + Tailwind CSS + TypeScript + next-intl), bổ sung thêm:
- Giao diện Landing Page thương hiệu Glomix (thay thế OSAM)
- Tích hợp MySQL + ORM để lưu trữ Lead (khách hàng tiềm năng)
- Trang Admin bảo vệ bằng xác thực để quản lý danh sách Lead

---

## Bảng thuật ngữ

- **Landing_Page**: Trang web chính của Glomix tại glomix.cloud
- **Hero_Section**: Phần đầu trang với headline, sub-headline và CTA chính
- **Lead**: Thông tin khách hàng tiềm năng điền vào form liên hệ
- **Lead_Form**: Form thu thập thông tin Lead (tên, email, SĐT, nhu cầu)
- **Lead_API**: API endpoint xử lý việc lưu Lead vào cơ sở dữ liệu
- **Admin_Dashboard**: Trang quản trị xem danh sách và thống kê Lead
- **Navbar**: Thanh điều hướng chính của trang
- **Footer**: Phần chân trang
- **CTA**: Call-to-Action — nút kêu gọi hành động
- **ORM**: Object-Relational Mapping (Prisma hoặc Drizzle ORM)
- **SME**: Small and Medium Enterprise — doanh nghiệp vừa và nhỏ
- **Analytics_Event**: Sự kiện được ghi nhận để theo dõi chuyển đổi
- **Validator**: Module kiểm tra tính hợp lệ của dữ liệu đầu vào

---

## Yêu cầu

### Yêu cầu 1: Thiết kế và Thương hiệu Glomix

**User Story:** Là khách truy cập, tôi muốn thấy một trang web chuyên nghiệp mang thương hiệu Glomix, để tôi có thể tin tưởng vào năng lực của công ty.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị tên thương hiệu "Glomix" và logo tại Navbar và Footer.
2. THE Landing_Page SHALL áp dụng bảng màu Deep Blue (`#0A1628`) phối hợp Electric Blue (`#2563EB`) và nền trắng (White Space).
3. THE Landing_Page SHALL sử dụng hiệu ứng gradient nhẹ trên các section nền tối.
4. THE Landing_Page SHALL sử dụng icon dạng Line-art liên quan đến Cloud và AI (từ thư viện lucide-react).
5. THE Landing_Page SHALL hỗ trợ cuộn trang mượt mà (smooth scroll) khi nhấn các liên kết neo (anchor link).
6. THE Landing_Page SHALL hiển thị đúng trên màn hình Mobile (≥ 320px) và Desktop (≥ 1280px).

---

### Yêu cầu 2: Navbar và Điều hướng

**User Story:** Là khách truy cập, tôi muốn điều hướng dễ dàng giữa các trang, để tôi có thể tìm thấy thông tin cần thiết nhanh chóng.

#### Tiêu chí chấp nhận

1. THE Navbar SHALL hiển thị các mục điều hướng: Home, Dịch vụ, Sản phẩm, Tuyển dụng, Về chúng tôi.
2. THE Navbar SHALL hiển thị nút CTA "Tư vấn miễn phí" liên kết đến Lead_Form.
3. WHEN người dùng cuộn xuống quá 80px, THE Navbar SHALL chuyển sang nền đặc (solid background) với hiệu ứng shadow.
4. WHEN người dùng truy cập trên thiết bị Mobile, THE Navbar SHALL hiển thị menu hamburger có thể mở/đóng.
5. THE Navbar SHALL hỗ trợ chuyển đổi ngôn ngữ giữa Tiếng Việt và English thông qua next-intl.

---

### Yêu cầu 3: Hero Section

**User Story:** Là khách truy cập, tôi muốn thấy ngay thông điệp cốt lõi của Glomix khi vào trang, để tôi hiểu công ty cung cấp dịch vụ gì.

#### Tiêu chí chấp nhận

1. THE Hero_Section SHALL hiển thị headline: "Glomix - Global In Minutes. Cloud & AI Transformation."
2. THE Hero_Section SHALL hiển thị sub-headline: "Tối ưu hạ tầng AWS và tích hợp AI đột phá cho doanh nghiệp vừa và nhỏ."
3. THE Hero_Section SHALL hiển thị nút CTA chính "Tư vấn miễn phí" liên kết đến Lead_Form.
4. THE Hero_Section SHALL có chiều cao tối thiểu 100vh trên Desktop và 80vh trên Mobile.
5. THE Hero_Section SHALL hiển thị nền gradient từ Deep Blue sang Electric Blue kết hợp hiệu ứng hình học hoặc particle nhẹ.

---

### Yêu cầu 4: Section Dịch vụ

**User Story:** Là khách truy cập, tôi muốn xem các dịch vụ Glomix cung cấp, để tôi đánh giá xem có phù hợp với nhu cầu của mình không.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị section Dịch vụ với 2 nhóm dịch vụ trọng tâm.
2. THE Landing_Page SHALL hiển thị nhóm dịch vụ "AWS Managed Services & Cloud Migration" với các điểm nổi bật: giảm 30–50% chi phí, CI/CD tự động, quản trị 24/7.
3. THE Landing_Page SHALL hiển thị nhóm dịch vụ "AI Integration Services" với các điểm nổi bật: LLM, Chatbot nội bộ, tự động hóa quy trình văn bản.
4. WHEN người dùng nhấn vào một dịch vụ, THE Landing_Page SHALL điều hướng đến trang chi tiết dịch vụ tương ứng.
5. THE Landing_Page SHALL hiển thị icon Line-art phù hợp cho từng nhóm dịch vụ.

---

### Yêu cầu 5: Section Sản phẩm SME

**User Story:** Là chủ doanh nghiệp SME, tôi muốn xem các gói sản phẩm phù hợp với quy mô của mình, để tôi có thể chọn gói phù hợp và liên hệ tư vấn.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị section Sản phẩm với 3 gói dành cho SME dạng card.
2. THE Landing_Page SHALL hiển thị Gói 1 "Cloud Health Check" với mô tả: đánh giá và tối ưu chi phí AWS, hình thức phí 1 lần.
3. THE Landing_Page SHALL hiển thị Gói 2 "AI Starter" với mô tả: triển khai 01 chatbot nội bộ, hình thức triển khai nhanh.
4. THE Landing_Page SHALL hiển thị Gói 3 "Growth Ops" với mô tả: quản trị AWS toàn diện + hỗ trợ 24/7, hình thức phí hàng tháng.
5. THE Landing_Page SHALL hiển thị nút CTA "Tìm hiểu thêm" hoặc "Đăng ký" trên mỗi card sản phẩm.

---

### Yêu cầu 6: Lead Generation Form

**User Story:** Là khách truy cập quan tâm, tôi muốn điền form để nhận tư vấn và ưu đãi, để tôi có thể bắt đầu hợp tác với Glomix.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị section Lead Generation với headline: "Nhận ưu đãi 20% cho dự án đầu tiên & Bản báo cáo tối ưu chi phí Cloud miễn phí."
2. THE Lead_Form SHALL bao gồm các trường: Họ và tên (bắt buộc), Email (bắt buộc), Số điện thoại (bắt buộc), Nhu cầu (Dropdown: AWS Migration / AI Integration / Cả hai).
3. THE Lead_Form SHALL hiển thị nút submit "Nhận ưu đãi ngay".
4. WHEN người dùng submit form với dữ liệu hợp lệ, THE Lead_Form SHALL gửi dữ liệu đến Lead_API và hiển thị thông báo "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ."
5. IF người dùng submit form với trường bắt buộc bị trống, THEN THE Validator SHALL hiển thị thông báo lỗi cụ thể ngay dưới trường đó.
6. IF người dùng nhập email sai định dạng, THEN THE Validator SHALL hiển thị thông báo "Email không hợp lệ."
7. IF người dùng nhập số điện thoại không đúng định dạng Việt Nam (10 chữ số, bắt đầu bằng 0), THEN THE Validator SHALL hiển thị thông báo "Số điện thoại không hợp lệ."
8. WHILE Lead_Form đang gửi dữ liệu, THE Lead_Form SHALL hiển thị trạng thái loading và vô hiệu hóa nút submit.

---

### Yêu cầu 7: Lead API và Lưu trữ Dữ liệu

**User Story:** Là quản trị viên, tôi muốn dữ liệu Lead được lưu trữ an toàn vào cơ sở dữ liệu, để tôi có thể theo dõi và xử lý sau.

#### Tiêu chí chấp nhận

1. THE Lead_API SHALL nhận dữ liệu POST từ Lead_Form và lưu vào bảng `leads` trong MySQL.
2. THE Lead_API SHALL validate dữ liệu phía server: tên không rỗng, email đúng định dạng, số điện thoại 10 chữ số.
3. IF Lead_API nhận được email đã tồn tại trong cơ sở dữ liệu, THEN THE Lead_API SHALL trả về HTTP 409 với thông báo lỗi phù hợp.
4. IF Lead_API gặp lỗi kết nối cơ sở dữ liệu, THEN THE Lead_API SHALL trả về HTTP 500 và ghi log lỗi.
5. THE Lead_API SHALL lưu các trường: `customer_name`, `email`, `phone`, `company_size` (Enum: SME/Startup/Enterprise), `service_interest` (Enum: AWS_Migration/AI_Integration/Managed_Services), `message`, `created_at`.
6. THE Lead_API SHALL trả về HTTP 201 kèm thông báo thành công khi lưu Lead thành công.
7. THE Lead_API SHALL sử dụng ORM (Prisma hoặc Drizzle ORM) để tương tác với MySQL.
8. THE Lead_API SHALL đọc chuỗi kết nối cơ sở dữ liệu từ biến môi trường `DATABASE_URL` trong file `.env`.

---

### Yêu cầu 8: Analytics và Theo dõi Chuyển đổi

**User Story:** Là marketing manager, tôi muốn ghi nhận sự kiện chuyển đổi khi Lead được tạo thành công, để tôi có thể đo lường hiệu quả chiến dịch.

#### Tiêu chí chấp nhận

1. WHEN Lead_Form được submit thành công, THE Landing_Page SHALL kích hoạt Analytics_Event với tên `lead_generated`.
2. THE Analytics_Event SHALL bao gồm thuộc tính: `service_interest` (giá trị từ dropdown), `timestamp` (thời điểm submit).
3. THE Landing_Page SHALL hỗ trợ tích hợp Google Analytics 4 (GA4) thông qua biến môi trường `NEXT_PUBLIC_GA_ID`.
4. WHERE biến môi trường `NEXT_PUBLIC_GA_ID` không được cấu hình, THE Landing_Page SHALL bỏ qua việc gửi Analytics_Event mà không gây lỗi.

---

### Yêu cầu 9: Trang Admin — Quản lý Lead

**User Story:** Là quản trị viên, tôi muốn xem danh sách và thống kê Lead trên trang Admin được bảo vệ, để tôi có thể theo dõi và phân tích khách hàng tiềm năng.

#### Tiêu chí chấp nhận

1. THE Admin_Dashboard SHALL được bảo vệ bằng xác thực (authentication) — chỉ người dùng đã đăng nhập mới truy cập được.
2. IF người dùng chưa xác thực cố truy cập Admin_Dashboard, THEN THE Admin_Dashboard SHALL chuyển hướng về trang đăng nhập.
3. THE Admin_Dashboard SHALL hiển thị danh sách Lead dạng bảng với các cột: Tên, Email, SĐT, Nhu cầu, Ngày tạo.
4. THE Admin_Dashboard SHALL hỗ trợ phân trang (pagination) với tối đa 20 Lead mỗi trang.
5. THE Admin_Dashboard SHALL hiển thị thống kê tổng quan: tổng số Lead, phân bổ theo `service_interest` (ví dụ: 70% AWS Migration, 30% AI Integration).
6. THE Admin_Dashboard SHALL hiển thị biểu đồ hoặc thanh tiến trình (progress bar) thể hiện tỷ lệ phân bổ theo nhu cầu dịch vụ.
7. WHEN quản trị viên nhấn nút "Xuất CSV", THE Admin_Dashboard SHALL tải xuống file CSV chứa toàn bộ danh sách Lead.

---

### Yêu cầu 10: SEO và Hiệu năng

**User Story:** Là marketing manager, tôi muốn trang web được tối ưu SEO và tải nhanh, để tôi có thể thu hút traffic tự nhiên và cải thiện trải nghiệm người dùng.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL có thẻ `<title>` và `<meta description>` riêng biệt cho từng ngôn ngữ (vi/en) thông qua Next.js Metadata API.
2. THE Landing_Page SHALL có thẻ Open Graph (`og:title`, `og:description`, `og:image`) cho mỗi trang.
3. THE Landing_Page SHALL đạt điểm Performance ≥ 85 trên Lighthouse khi chạy trên môi trường production.
4. THE Landing_Page SHALL sử dụng Next.js Image component (`next/image`) cho tất cả hình ảnh để tối ưu kích thước và lazy loading.
5. THE Landing_Page SHALL có file `sitemap.xml` được tạo tự động bởi Next.js.
6. THE Landing_Page SHALL có file `robots.txt` cho phép các công cụ tìm kiếm lập chỉ mục.

---

### Yêu cầu 11: Đa ngôn ngữ (i18n)

**User Story:** Là khách truy cập quốc tế, tôi muốn xem nội dung bằng tiếng Anh, để tôi có thể hiểu dịch vụ của Glomix.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hỗ trợ 2 ngôn ngữ: Tiếng Việt (`vi`) và Tiếng Anh (`en`) thông qua next-intl.
2. THE Landing_Page SHALL mặc định hiển thị Tiếng Việt khi không có locale trong URL.
3. WHEN người dùng chuyển ngôn ngữ, THE Landing_Page SHALL cập nhật toàn bộ nội dung tĩnh mà không tải lại trang.
4. THE Landing_Page SHALL lưu trữ tất cả chuỗi văn bản trong file `vi.json` và `en.json` — không hardcode text trong component.

---

### Yêu cầu 12: Cấu hình Môi trường và Triển khai

**User Story:** Là developer, tôi muốn cấu hình môi trường rõ ràng và tách biệt, để tôi có thể triển khai an toàn lên production.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL đọc tất cả thông tin nhạy cảm (database URL, API keys) từ biến môi trường — không hardcode trong source code.
2. THE Landing_Page SHALL có file `.env.example` liệt kê tất cả biến môi trường cần thiết kèm mô tả.
3. THE Landing_Page SHALL có `Dockerfile` hỗ trợ build production image.
4. THE Landing_Page SHALL có schema migration được quản lý bởi ORM (Prisma migrations hoặc Drizzle migrations).
