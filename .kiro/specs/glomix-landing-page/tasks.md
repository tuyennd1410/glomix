# Kế hoạch Triển khai: Glomix Landing Page

## Tổng quan

Triển khai theo thứ tự: Nền tảng & cấu hình → Database & ORM → API backend → UI components → Admin → Analytics & SEO → Kiểm thử tích hợp.

## Danh sách Task

- [x] 1. Cấu hình nền tảng và môi trường
  - Cài đặt các package còn thiếu: `prisma`, `@prisma/client`, `zod`, `react-hook-form`, `@hookform/resolvers`, `bcryptjs`, `jsonwebtoken`, `@types/bcryptjs`, `@types/jsonwebtoken`
  - Tạo file `.env.example` với đầy đủ các biến: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_APP_URL`
  - Cập nhật `tailwind.config.ts`: thêm màu `deep-blue: '#0A1628'` và `electric-blue: '#2563EB'` vào theme
  - Cập nhật `src/types/index.ts`: định nghĩa các type `Lead`, `ServiceInterest`, `AdminUser`, `PaginatedResponse`, `ApiResponse`
  - _Yêu cầu: 12.1, 12.2_

- [x] 2. Thiết lập Database và Prisma ORM
  - [x] 2.1 Tạo Prisma schema và migration
    - Tạo file `prisma/schema.prisma` với model `Lead` (id, customerName, email, phone, serviceInterest, message, createdAt, updatedAt) và model `AdminUser` (id, username, passwordHash, createdAt), enum `ServiceInterest`
    - Tạo file `src/lib/db.ts` — Prisma client singleton (tránh tạo nhiều instance trong dev)
    - _Yêu cầu: 7.1, 7.5, 7.7, 7.8, 12.4_

  - [ ]* 2.2 Viết property test cho Thuộc tính 2 — Round-trip tạo Lead
    - **Thuộc tính 2: Round-trip tạo Lead — dữ liệu lưu và đọc phải nhất quán**
    - **Validates: Yêu cầu 7.1, 7.5, 7.6**

- [x] 3. Xây dựng Validation và Auth utilities
  - [x] 3.1 Tạo Zod validation schemas
    - Tạo file `src/lib/validators.ts` với `createLeadSchema` (customerName, email, phone với regex VN `^0\d{9}$`, serviceInterest enum), `loginSchema`
    - _Yêu cầu: 6.5, 6.6, 6.7, 7.2_

  - [ ]* 3.2 Viết property test cho Thuộc tính 1 — Validation schema từ chối đầu vào không hợp lệ
    - **Thuộc tính 1: Validation schema từ chối mọi đầu vào không hợp lệ**
    - **Validates: Yêu cầu 6.5, 6.6, 6.7, 7.2**

  - [x] 3.3 Tạo JWT auth utilities
    - Tạo file `src/lib/auth.ts` với các hàm: `signToken(payload)`, `verifyToken(token)`, `hashPassword(password)`, `comparePassword(password, hash)`
    - Dùng `jsonwebtoken` + `bcryptjs` (salt rounds = 12), đọc `JWT_SECRET` và `JWT_EXPIRES_IN` từ env
    - _Yêu cầu: 9.1, 9.2_

- [x] 4. Xây dựng Lead API
  - [x] 4.1 Tạo `POST /api/leads` route
    - Tạo file `src/app/api/leads/route.ts`
    - Validate request body bằng `createLeadSchema`, kiểm tra duplicate email (trả về 409), lưu vào DB qua Prisma, trả về 201
    - Rate limiting: middleware giới hạn 5 request/phút/IP
    - _Yêu cầu: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 4.2 Viết property test cho Thuộc tính 3 — Email trùng lặp luôn trả về HTTP 409
    - **Thuộc tính 3: Email trùng lặp luôn trả về HTTP 409**
    - **Validates: Yêu cầu 7.3**

  - [ ]* 4.3 Viết unit test cho Lead API
    - Test các trường hợp: dữ liệu hợp lệ → 201, email trùng → 409, dữ liệu thiếu → 422, lỗi DB → 500
    - Mock Prisma client bằng `jest.mock()`
    - _Yêu cầu: 7.1, 7.2, 7.3, 7.4_

- [x] 5. Checkpoint — Kiểm tra nền tảng backend
  - Đảm bảo tất cả tests pass, Prisma schema hợp lệ, validators hoạt động đúng. Hỏi người dùng nếu có vấn đề.

- [x] 6. Cập nhật Middleware và Admin Auth API
  - [x] 6.1 Cập nhật `src/middleware.ts` — bảo vệ route `/admin/*`
    - Mở rộng middleware hiện có: kiểm tra cookie `admin_token` cho các path `/admin/*`, redirect về `/admin/login` nếu không có JWT hợp lệ (HTTP 307)
    - Giữ nguyên logic next-intl cho các route còn lại
    - _Yêu cầu: 9.1, 9.2_

  - [ ]* 6.2 Viết property test cho Thuộc tính 6 — Admin auth guard chặn request không có JWT hợp lệ
    - **Thuộc tính 6: Admin auth guard chặn mọi request không có JWT hợp lệ**
    - **Validates: Yêu cầu 9.1, 9.2**

  - [x] 6.3 Tạo Admin Auth API routes
    - Tạo `src/app/api/admin/auth/login/route.ts`: nhận `{username, password}`, verify với DB, set httpOnly cookie `admin_token` (SameSite=Strict, Secure)
    - Tạo `src/app/api/admin/auth/logout/route.ts`: xóa cookie `admin_token`
    - _Yêu cầu: 9.1_

- [x] 7. Xây dựng Admin Leads API
  - [x] 7.1 Tạo `GET /api/admin/leads` route với phân trang và thống kê
    - Tạo `src/app/api/admin/leads/route.ts`: query params `page` (default 1), `limit` (default 20, max 100)
    - Trả về `{data, pagination: {total, page, limit, totalPages}, stats: {total, byServiceInterest}}`
    - _Yêu cầu: 9.3, 9.4, 9.5_

  - [ ]* 7.2 Viết property test cho Thuộc tính 7 — Phân trang không vượt quá giới hạn kích thước trang
    - **Thuộc tính 7: Phân trang không bao giờ vượt quá giới hạn kích thước trang**
    - **Validates: Yêu cầu 9.4**

  - [ ]* 7.3 Viết property test cho Thuộc tính 8 — Thống kê tổng số Lead nhất quán với dữ liệu thực tế
    - **Thuộc tính 8: Thống kê tổng số Lead phải nhất quán với dữ liệu thực tế**
    - **Validates: Yêu cầu 9.5**

  - [x] 7.4 Tạo `GET /api/admin/leads/export` route — xuất CSV
    - Tạo `src/app/api/admin/leads/export/route.ts`: truy vấn toàn bộ leads, tạo CSV với header: Tên, Email, SĐT, Nhu cầu, Ngày tạo
    - Set `Content-Type: text/csv`, `Content-Disposition: attachment; filename="leads.csv"`
    - _Yêu cầu: 9.7_

  - [ ]* 7.5 Viết property test cho Thuộc tính 9 — CSV export chứa đầy đủ tất cả Lead
    - **Thuộc tính 9: CSV export chứa đầy đủ tất cả Lead**
    - **Validates: Yêu cầu 9.7**

- [x] 8. Checkpoint — Kiểm tra toàn bộ API backend
  - Đảm bảo tất cả API routes hoạt động đúng, auth guard bảo vệ đúng route. Hỏi người dùng nếu có vấn đề.

- [x] 9. Cập nhật i18n messages
  - Cập nhật `src/i18n/messages/vi.json` và `src/i18n/messages/en.json`: thêm tất cả key cho Navbar, HeroSection, ServicesSection, ProductsSection, LeadFormSection, Footer, Admin pages
  - Không hardcode text trong component — mọi chuỗi phải qua `useTranslations`
  - _Yêu cầu: 11.1, 11.2, 11.3, 11.4_

  - [ ]* 9.1 Viết property test cho Thuộc tính 11 — Các key i18n có giá trị khác nhau giữa hai ngôn ngữ
    - **Thuộc tính 11: Các key i18n có giá trị khác nhau giữa hai ngôn ngữ**
    - **Validates: Yêu cầu 11.3**

- [x] 10. Cập nhật Navbar và Footer — thương hiệu Glomix
  - [x] 10.1 Cập nhật `src/components/layout/Navbar.tsx`
    - Thay thế brand OSAM → Glomix, áp dụng màu `#0A1628`/`#2563EB`
    - Thêm scroll listener: khi `scrollY > 80px` → thêm class `bg-[#0A1628] shadow-lg`
    - Menu items: Home, Dịch vụ, Sản phẩm, Tuyển dụng, Về chúng tôi; CTA "Tư vấn miễn phí" → scroll đến `#lead-form`
    - Hamburger menu cho mobile, language switcher dùng `useRouter` + `usePathname` từ next-intl
    - _Yêu cầu: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 10.2 Viết unit test cho Navbar
    - Test: hiển thị brand "Glomix", scroll effect thêm class đúng, hamburger menu toggle, language switcher
    - _Yêu cầu: 1.1, 2.3, 2.4_

  - [x] 10.3 Cập nhật `src/components/layout/Footer.tsx`
    - Thay thế brand OSAM → Glomix, cập nhật thông tin liên hệ và links
    - _Yêu cầu: 1.1_

- [x] 11. Cập nhật HeroSection
  - Cập nhật `src/components/sections/HeroSection.tsx`: nền gradient `from-[#0A1628] to-[#2563EB]` + SVG geometric pattern
  - Headline: "Glomix - Global In Minutes. Cloud & AI Transformation.", sub-headline từ i18n
  - CTA "Tư vấn miễn phí" → scroll đến `#lead-form`; chiều cao `min-h-screen` (desktop) / `min-h-[80vh]` (mobile)
  - _Yêu cầu: 1.2, 1.3, 1.5, 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 12. Cập nhật ServicesSection
  - Cập nhật `src/components/sections/ServicesSection.tsx`: 2 card lớn thay vì grid 3 cột
  - Card 1: "AWS Managed Services & Cloud Migration" với icon lucide-react, điểm nổi bật (giảm 30–50% chi phí, CI/CD, 24/7)
  - Card 2: "AI Integration Services" với icon lucide-react, điểm nổi bật (LLM, Chatbot, tự động hóa)
  - Mỗi card có nút CTA điều hướng đến trang chi tiết dịch vụ
  - _Yêu cầu: 1.4, 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 13. Tạo ProductsSection mới
  - [x] 13.1 Tạo `src/components/sections/ProductsSection.tsx`
    - 3 pricing card: "Cloud Health Check" (phí 1 lần), "AI Starter" (triển khai nhanh), "Growth Ops" (phí hàng tháng)
    - Mỗi card có tên, mô tả, hình thức, nút CTA "Tìm hiểu thêm" hoặc "Đăng ký"
    - _Yêu cầu: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 13.2 Viết property test cho Thuộc tính 10 — Mỗi card sản phẩm đều có nút CTA
    - **Thuộc tính 10: Mỗi card sản phẩm đều có nút CTA**
    - **Validates: Yêu cầu 5.5**

- [x] 14. Tạo Analytics helper và tích hợp GA4
  - [x] 14.1 Tạo `src/lib/analytics.ts`
    - Hàm `trackLeadGenerated(serviceInterest)`: kiểm tra `window`, `NEXT_PUBLIC_GA_ID`, `window.gtag` trước khi gọi
    - Gọi `gtag('event', 'lead_generated', {service_interest, timestamp: new Date().toISOString()})`
    - _Yêu cầu: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 14.2 Viết property test cho Thuộc tính 4 — Analytics event luôn chứa đủ thuộc tính bắt buộc
    - **Thuộc tính 4: Analytics event luôn chứa đủ thuộc tính bắt buộc**
    - **Validates: Yêu cầu 8.2**

  - [ ]* 14.3 Viết property test cho Thuộc tính 5 — Analytics không gây lỗi khi thiếu GA_ID
    - **Thuộc tính 5: Analytics không gây lỗi khi thiếu GA_ID**
    - **Validates: Yêu cầu 8.4**

  - [x] 14.4 Cập nhật `src/app/[locale]/layout.tsx` — nhúng GA4 script
    - Thêm `<Script>` tag cho GA4 với `NEXT_PUBLIC_GA_ID`, chỉ render khi biến env tồn tại
    - _Yêu cầu: 8.3_

- [x] 15. Tạo LeadFormSection
  - [x] 15.1 Tạo `src/components/sections/LeadFormSection.tsx`
    - Form với React Hook Form + Zod resolver (`createLeadSchema`)
    - Fields: customerName, email, phone, serviceInterest (dropdown: AWS Migration / AI Integration / Cả hai)
    - Submit: `POST /api/leads`, loading state (disable nút + spinner), success message, error handling (409, 500)
    - Sau submit thành công: gọi `trackLeadGenerated(serviceInterest)`
    - Section id="lead-form" để anchor link từ Navbar và HeroSection hoạt động
    - _Yêu cầu: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 8.1_

  - [ ]* 15.2 Viết unit test cho LeadFormSection
    - Test: hiển thị lỗi validation inline, loading state khi submit, thông báo thành công, xử lý lỗi 409/500
    - _Yêu cầu: 6.4, 6.5, 6.6, 6.7, 6.8_

- [x] 16. Cập nhật Landing Page chính
  - Cập nhật `src/app/[locale]/page.tsx`: thêm `ProductsSection` và `LeadFormSection`, xóa các section không còn dùng (CaseStudiesSection, NewsSection, BlogSection nếu không phù hợp)
  - Cập nhật `generateMetadata()`: title/description/OG tags theo thương hiệu Glomix cho cả vi/en
  - Thêm `smooth-scroll` CSS vào `globals.css`
  - _Yêu cầu: 1.5, 10.1, 10.2, 11.1_

- [~] 17. Checkpoint — Kiểm tra toàn bộ Landing Page
  - Đảm bảo tất cả sections render đúng, form hoạt động, i18n đúng, responsive mobile/desktop. Hỏi người dùng nếu có vấn đề.

- [x] 18. Xây dựng Admin Dashboard
  - [x] 18.1 Tạo trang đăng nhập Admin `src/app/admin/login/page.tsx`
    - Form đăng nhập (username, password) với React Hook Form + `loginSchema`
    - Submit: `POST /api/admin/auth/login`, redirect về `/admin/dashboard` khi thành công
    - _Yêu cầu: 9.1, 9.2_

  - [x] 18.2 Tạo Admin Dashboard `src/app/admin/dashboard/page.tsx`
    - Server Component: fetch data trực tiếp từ Prisma (kiểm tra auth cookie phía server)
    - Bảng leads: Tên, Email, SĐT, Nhu cầu, Ngày tạo; phân trang 20 items/trang
    - Thống kê: tổng số lead, progress bar theo `serviceInterest`
    - Nút "Xuất CSV" → gọi `/api/admin/leads/export`
    - _Yêu cầu: 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 18.3 Viết unit test cho Admin Dashboard
    - Test: redirect khi chưa xác thực, render bảng leads, phân trang, nút xuất CSV
    - _Yêu cầu: 9.2, 9.3, 9.4_

- [x] 19. Tối ưu SEO và hiệu năng
  - Tạo `src/app/sitemap.ts` — Next.js sitemap tự động cho các route vi/en
  - Tạo `src/app/robots.ts` — cho phép crawl toàn bộ trang
  - Kiểm tra và thay thế tất cả thẻ `<img>` bằng `next/image` trong các component
  - Cập nhật `StatsSection.tsx` với số liệu Glomix
  - _Yêu cầu: 10.1, 10.2, 10.4, 10.5, 10.6_

- [x] 20. Checkpoint cuối — Đảm bảo tất cả tests pass
  - Chạy toàn bộ test suite (`jest --run`), kiểm tra không có lỗi TypeScript (`tsc --noEmit`)
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có vấn đề trước khi kết thúc.

## Ghi chú

- Task đánh dấu `*` là tùy chọn, có thể bỏ qua để triển khai MVP nhanh hơn
- Thứ tự task đảm bảo phụ thuộc đúng: DB → API → UI → Admin → SEO
- Mỗi task tham chiếu yêu cầu cụ thể để truy xuất nguồn gốc
- Property tests dùng `fast-check` với tối thiểu 100 iterations
- Unit tests dùng Jest + `@testing-library/react`
