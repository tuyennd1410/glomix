# Tài liệu Thiết kế Kỹ thuật — Glomix Landing Page

## Tổng quan

Glomix Landing Page là trang web marketing chính của công ty Glomix (glomix.cloud), được xây dựng trên nền tảng Next.js 14 App Router hiện có. Mục tiêu kỹ thuật gồm:

1. **Tái thương hiệu**: Thay thế toàn bộ nhận diện OSAM → Glomix (màu sắc, logo, nội dung).
2. **Lead Generation**: Thu thập thông tin khách hàng tiềm năng qua form, lưu vào MySQL qua ORM.
3. **Admin Dashboard**: Trang quản trị bảo vệ bằng JWT/NextAuth để xem và xuất danh sách Lead.
4. **Analytics**: Tích hợp GA4 để theo dõi sự kiện chuyển đổi.
5. **i18n & SEO**: Hỗ trợ vi/en qua next-intl, tối ưu metadata và hiệu năng.

Dự án kế thừa toàn bộ cấu trúc thư mục hiện có (`src/app/[locale]/`, `src/components/`, `src/data/`, `src/hooks/`, `src/i18n/`) và bổ sung thêm các layer mới cho database, API, và admin.

---

## Kiến trúc

### Sơ đồ tổng thể

```mermaid
graph TD
    subgraph Client ["Trình duyệt (Client)"]
        LP[Landing Page<br/>Next.js SSR/SSG]
        AD[Admin Dashboard<br/>Next.js SSR]
    end

    subgraph Server ["Next.js Server (App Router)"]
        API_LEAD[POST /api/leads<br/>Lead API]
        API_ADMIN[GET /api/admin/leads<br/>Admin API]
        API_AUTH[POST /api/auth<br/>Auth API]
        API_EXPORT[GET /api/admin/leads/export<br/>CSV Export]
        MW[Middleware<br/>Auth Guard]
    end

    subgraph DB ["Cơ sở dữ liệu"]
        MYSQL[(MySQL)]
        ORM[Prisma ORM]
    end

    subgraph External ["Dịch vụ ngoài"]
        GA4[Google Analytics 4]
    end

    LP -->|Submit form| API_LEAD
    LP -->|gtag event| GA4
    AD -->|Xem leads| API_ADMIN
    AD -->|Xuất CSV| API_EXPORT
    AD -->|Đăng nhập| API_AUTH
    MW -->|Bảo vệ /admin| AD
    API_LEAD --> ORM
    API_ADMIN --> ORM
    API_EXPORT --> ORM
    ORM --> MYSQL
```

### Luồng xử lý Lead

```mermaid
sequenceDiagram
    participant U as Người dùng
    participant F as LeadForm (Client)
    participant V as Validator
    participant A as Lead API
    participant DB as MySQL
    participant G as GA4

    U->>F: Điền form & nhấn submit
    F->>V: Validate phía client
    alt Dữ liệu không hợp lệ
        V-->>F: Hiển thị lỗi inline
    else Dữ liệu hợp lệ
        F->>A: POST /api/leads
        A->>A: Validate phía server
        A->>DB: INSERT INTO leads
        alt Email đã tồn tại
            DB-->>A: Duplicate key
            A-->>F: HTTP 409
        else Thành công
            DB-->>A: OK
            A-->>F: HTTP 201
            F->>G: gtag('event', 'lead_generated')
            F-->>U: Hiển thị thông báo thành công
        end
    end
```

### Luồng xác thực Admin

```mermaid
sequenceDiagram
    participant A as Admin
    participant MW as Middleware
    participant LP as Login Page
    participant API as Auth API
    participant DB as MySQL

    A->>MW: GET /admin/dashboard
    MW->>MW: Kiểm tra JWT cookie
    alt Chưa xác thực
        MW-->>LP: Redirect /admin/login
        A->>LP: Nhập credentials
        LP->>API: POST /api/auth/login
        API->>DB: Verify admin user
        API-->>LP: Set JWT cookie (httpOnly)
        LP-->>A: Redirect /admin/dashboard
    else Đã xác thực
        MW-->>A: Cho phép truy cập
    end
```

---

## Thành phần và Giao diện

### Cấu trúc thư mục mới

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    # Landing page chính (cập nhật)
│   │   └── layout.tsx                  # Layout với GA4 script
│   └── admin/
│       ├── login/
│       │   └── page.tsx                # Trang đăng nhập admin
│       └── dashboard/
│           └── page.tsx                # Admin dashboard
├── api/
│   ├── leads/
│   │   └── route.ts                    # POST /api/leads
│   └── admin/
│       ├── leads/
│       │   ├── route.ts                # GET /api/admin/leads (phân trang)
│       │   └── export/
│       │       └── route.ts            # GET /api/admin/leads/export (CSV)
│       └── auth/
│           ├── login/
│           │   └── route.ts            # POST /api/admin/auth/login
│           └── logout/
│               └── route.ts            # POST /api/admin/auth/logout
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  # Cập nhật: Glomix brand + scroll effect
│   │   └── Footer.tsx                  # Cập nhật: Glomix brand
│   └── sections/
│       ├── HeroSection.tsx             # Cập nhật: gradient + nội dung Glomix
│       ├── ServicesSection.tsx         # Cập nhật: 2 nhóm dịch vụ Glomix
│       ├── ProductsSection.tsx         # Mới: 3 gói SME
│       ├── LeadFormSection.tsx         # Mới: form thu thập lead
│       └── StatsSection.tsx            # Cập nhật: số liệu Glomix
├── lib/
│   ├── db.ts                           # Prisma client singleton
│   ├── auth.ts                         # JWT utilities
│   ├── validators.ts                   # Zod schemas
│   └── analytics.ts                    # GA4 helper
├── middleware.ts                        # Cập nhật: bảo vệ /admin/*
└── prisma/
    └── schema.prisma                   # Schema database
```

### Danh sách Component

#### `Navbar` (cập nhật)
- Props: không có (dùng `useTranslations`)
- State: `isOpen: boolean`, `isScrolled: boolean`
- Hành vi: scroll listener → `isScrolled` → thêm class `bg-[#0A1628] shadow-lg`
- Menu items: Home, Dịch vụ, Sản phẩm, Tuyển dụng, Về chúng tôi
- CTA: "Tư vấn miễn phí" → scroll đến `#lead-form`
- Language switcher: `useRouter` + `usePathname` từ next-intl

#### `HeroSection` (cập nhật)
- Props: không có (nội dung từ i18n)
- Nền: gradient CSS `from-[#0A1628] to-[#2563EB]` + SVG geometric pattern
- Không dùng background image (loại bỏ slider cũ)
- CTA: "Tư vấn miễn phí" → scroll đến `#lead-form`

#### `ServicesSection` (cập nhật)
- Hiển thị 2 nhóm dịch vụ dạng card lớn (không phải grid 3 cột như cũ)
- Mỗi nhóm có icon, tiêu đề, danh sách điểm nổi bật, nút CTA

#### `ProductsSection` (mới)
- Hiển thị 3 gói SME dạng pricing card
- Mỗi card: tên gói, mô tả, hình thức, nút CTA

#### `LeadFormSection` (mới)
- Form với React Hook Form + Zod validation
- Fields: `customerName`, `email`, `phone`, `serviceInterest` (dropdown)
- Submit: gọi `POST /api/leads`, hiển thị loading/success/error state
- Sau submit thành công: gọi `trackLeadGenerated()` từ `lib/analytics.ts`

#### `AdminDashboard` (mới)
- Server Component (SSR) — fetch data trực tiếp từ Prisma
- Bảng leads với phân trang (20 items/trang)
- Thống kê: tổng số lead, progress bar theo `serviceInterest`
- Nút "Xuất CSV" → gọi `/api/admin/leads/export`

### Giao diện API

#### `POST /api/leads`
```typescript
// Request body
interface CreateLeadRequest {
  customerName: string;   // bắt buộc, không rỗng
  email: string;          // bắt buộc, đúng định dạng email
  phone: string;          // bắt buộc, 10 chữ số, bắt đầu bằng 0
  serviceInterest: 'AWS_Migration' | 'AI_Integration' | 'Both';
}

// Response 201
interface CreateLeadResponse {
  success: true;
  message: string;
}

// Response 409
interface DuplicateLeadResponse {
  success: false;
  error: 'EMAIL_ALREADY_EXISTS';
  message: string;
}

// Response 422
interface ValidationErrorResponse {
  success: false;
  error: 'VALIDATION_ERROR';
  fields: Record<string, string>;
}
```

#### `GET /api/admin/leads`
```typescript
// Query params
interface GetLeadsQuery {
  page?: number;    // default: 1
  limit?: number;   // default: 20, max: 100
}

// Response 200
interface GetLeadsResponse {
  data: Lead[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  stats: {
    total: number;
    byServiceInterest: Record<string, number>;
  };
}
```

#### `POST /api/admin/auth/login`
```typescript
// Request body
interface LoginRequest {
  username: string;
  password: string;
}

// Response 200: Set httpOnly cookie 'admin_token'
// Response 401: Invalid credentials
```

---

## Mô hình Dữ liệu

### Schema Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Lead {
  id              Int             @id @default(autoincrement())
  customerName    String          @map("customer_name") @db.VarChar(255)
  email           String          @unique @db.VarChar(255)
  phone           String          @db.VarChar(15)
  serviceInterest ServiceInterest @map("service_interest")
  message         String?         @db.Text
  createdAt       DateTime        @default(now()) @map("created_at")
  updatedAt       DateTime        @updatedAt @map("updated_at")

  @@map("leads")
  @@index([createdAt])
  @@index([serviceInterest])
}

model AdminUser {
  id           Int      @id @default(autoincrement())
  username     String   @unique @db.VarChar(100)
  passwordHash String   @map("password_hash") @db.VarChar(255)
  createdAt    DateTime @default(now()) @map("created_at")

  @@map("admin_users")
}

enum ServiceInterest {
  AWS_Migration
  AI_Integration
  Both
}
```

### Zod Validation Schemas (`src/lib/validators.ts`)

```typescript
import { z } from 'zod';

// Regex số điện thoại Việt Nam: 10 chữ số, bắt đầu bằng 0
const VN_PHONE_REGEX = /^0\d{9}$/;

export const createLeadSchema = z.object({
  customerName: z.string().min(1, 'Họ và tên không được để trống').max(255),
  email: z.string().email('Email không hợp lệ').max(255),
  phone: z.string().regex(VN_PHONE_REGEX, 'Số điện thoại không hợp lệ'),
  serviceInterest: z.enum(['AWS_Migration', 'AI_Integration', 'Both']),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
```

### Cấu trúc bảng MySQL

| Cột | Kiểu | Ràng buộc | Mô tả |
|-----|------|-----------|-------|
| `id` | INT | PK, AUTO_INCREMENT | Khóa chính |
| `customer_name` | VARCHAR(255) | NOT NULL | Họ và tên |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email |
| `phone` | VARCHAR(15) | NOT NULL | Số điện thoại |
| `service_interest` | ENUM | NOT NULL | Nhu cầu dịch vụ |
| `message` | TEXT | NULL | Ghi chú thêm |
| `created_at` | DATETIME | NOT NULL, DEFAULT NOW() | Thời điểm tạo |
| `updated_at` | DATETIME | NOT NULL, ON UPDATE | Thời điểm cập nhật |

### Biến môi trường (`.env.example`)

```bash
# Database
DATABASE_URL="mysql://user:password@localhost:3306/glomix_db"

# Admin Auth (JWT)
JWT_SECRET="your-secret-key-min-32-chars"
JWT_EXPIRES_IN="24h"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# App
NEXT_PUBLIC_APP_URL="https://glomix.cloud"
```

---

## Xử lý Lỗi

### Chiến lược xử lý lỗi API

Tất cả API route trả về JSON với cấu trúc nhất quán:

```typescript
// Thành công
{ success: true, data?: unknown, message?: string }

// Lỗi
{ success: false, error: string, message: string, fields?: Record<string, string> }
```

Bảng mã lỗi HTTP:

| HTTP Status | Trường hợp | Error Code |
|-------------|-----------|------------|
| 201 | Tạo lead thành công | — |
| 400 | Request body không đúng định dạng | `INVALID_REQUEST` |
| 401 | Chưa xác thực (admin) | `UNAUTHORIZED` |
| 409 | Email đã tồn tại | `EMAIL_ALREADY_EXISTS` |
| 422 | Dữ liệu không hợp lệ (Zod) | `VALIDATION_ERROR` |
| 500 | Lỗi server/database | `INTERNAL_ERROR` |

### Xử lý lỗi phía Client

- **Lỗi validation**: Hiển thị inline dưới từng field (React Hook Form + Zod)
- **Lỗi 409**: Hiển thị thông báo "Email này đã đăng ký. Chúng tôi sẽ liên hệ sớm."
- **Lỗi 500**: Hiển thị thông báo "Có lỗi xảy ra. Vui lòng thử lại sau."
- **Loading state**: Disable nút submit + hiển thị spinner trong khi gửi

### Xử lý lỗi GA4

```typescript
// src/lib/analytics.ts
export function trackLeadGenerated(serviceInterest: string) {
  // Bỏ qua nếu GA_ID không được cấu hình hoặc gtag chưa load
  if (typeof window === 'undefined') return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'lead_generated', {
    service_interest: serviceInterest,
    timestamp: new Date().toISOString(),
  });
}
```

### Bảo mật

- **JWT**: httpOnly cookie, SameSite=Strict, Secure (production), TTL 24h
- **Password**: bcrypt với salt rounds = 12
- **SQL Injection**: Prisma ORM parameterized queries — không dùng raw SQL
- **Rate Limiting**: Middleware giới hạn `POST /api/leads` tối đa 5 request/phút/IP
- **CORS**: Chỉ cho phép origin từ `NEXT_PUBLIC_APP_URL`
- **Input Sanitization**: Zod schema validate và strip unknown fields

---

## Chiến lược Kiểm thử

### Phương pháp kiểm thử kép

Dự án sử dụng **hai lớp kiểm thử bổ sung nhau**:

1. **Unit Tests** (Jest + Testing Library): Kiểm tra các ví dụ cụ thể, edge case, và điều kiện lỗi.
2. **Property-Based Tests** (fast-check): Kiểm tra các thuộc tính phổ quát trên tập đầu vào ngẫu nhiên.

Cả hai đều cần thiết — unit test bắt lỗi cụ thể, property test xác minh tính đúng đắn tổng quát.

### Thư viện kiểm thử

- **Unit/Integration**: Jest + `@testing-library/react` (đã có trong project)
- **Property-Based**: `fast-check` v3 (đã có trong `devDependencies`)
- **Mocking**: `jest.mock()` cho Prisma client, `msw` cho API mocking

### Cấu hình Property-Based Test

- Mỗi property test chạy tối thiểu **100 iterations** (fast-check default)
- Mỗi test được tag theo format: `Feature: glomix-landing-page, Property {N}: {mô tả}`

### Phân bổ kiểm thử

#### Unit Tests tập trung vào:
- Render đúng component với props cụ thể
- Điều hướng và scroll behavior của Navbar
- Hiển thị thông báo lỗi/thành công của LeadForm
- Redirect khi chưa xác thực trên Admin routes
- Xuất CSV đúng định dạng

#### Property Tests tập trung vào:
- Validation schema (xem Correctness Properties bên dưới)
- API Lead: tính nhất quán của dữ liệu lưu/đọc
- Phân trang: tính đúng đắn với mọi kích thước dataset


---

## Thuộc tính Đúng đắn (Correctness Properties)

*Một thuộc tính (property) là đặc điểm hoặc hành vi phải đúng trong mọi lần thực thi hợp lệ của hệ thống — về cơ bản là một phát biểu hình thức về những gì hệ thống phải làm. Các thuộc tính đóng vai trò cầu nối giữa đặc tả dạng ngôn ngữ tự nhiên và các đảm bảo đúng đắn có thể xác minh tự động bằng máy.*

### Thuộc tính 1: Validation schema từ chối mọi đầu vào không hợp lệ

*Với bất kỳ* đối tượng đầu vào nào có ít nhất một trường vi phạm ràng buộc (tên rỗng, email sai định dạng, số điện thoại không phải 10 chữ số bắt đầu bằng 0, hoặc serviceInterest ngoài enum), `createLeadSchema.safeParse()` phải trả về `success: false` và `error.issues` không rỗng.

**Validates: Requirements 6.5, 6.6, 6.7, 7.2**

---

### Thuộc tính 2: Round-trip tạo Lead — dữ liệu lưu và đọc phải nhất quán

*Với bất kỳ* đối tượng Lead hợp lệ nào được gửi qua `POST /api/leads`, sau khi API trả về HTTP 201, truy vấn bảng `leads` theo email phải trả về bản ghi có `customerName`, `email`, `phone`, và `serviceInterest` khớp chính xác với dữ liệu đã gửi.

**Validates: Requirements 7.1, 7.5, 7.6**

---

### Thuộc tính 3: Email trùng lặp luôn trả về HTTP 409 (edge case)

*Với bất kỳ* email nào đã tồn tại trong bảng `leads`, mọi request `POST /api/leads` tiếp theo sử dụng cùng email đó phải nhận response HTTP 409 với `error: 'EMAIL_ALREADY_EXISTS'`, bất kể các trường khác có giá trị gì.

**Validates: Requirements 7.3**

---

### Thuộc tính 4: Analytics event luôn chứa đủ thuộc tính bắt buộc

*Với bất kỳ* giá trị `serviceInterest` hợp lệ nào (`AWS_Migration`, `AI_Integration`, `Both`), khi `trackLeadGenerated(serviceInterest)` được gọi, hàm `gtag` phải được gọi với event name `'lead_generated'` và payload chứa cả hai thuộc tính `service_interest` (bằng giá trị đầu vào) và `timestamp` (chuỗi ISO 8601 không rỗng).

**Validates: Requirements 8.2**

---

### Thuộc tính 5: Analytics không gây lỗi khi thiếu GA_ID (edge case)

*Với bất kỳ* giá trị `serviceInterest` nào, khi `NEXT_PUBLIC_GA_ID` không được cấu hình (undefined hoặc rỗng), việc gọi `trackLeadGenerated()` không được throw exception và không được gọi `gtag`.

**Validates: Requirements 8.4**

---

### Thuộc tính 6: Admin auth guard chặn mọi request không có JWT hợp lệ

*Với bất kỳ* request nào đến các route `/admin/*` mà không có cookie `admin_token` hợp lệ (không có cookie, token hết hạn, hoặc token bị giả mạo), middleware phải trả về redirect đến `/admin/login` với HTTP 307, không cho phép truy cập tài nguyên được bảo vệ.

**Validates: Requirements 9.1, 9.2**

---

### Thuộc tính 7: Phân trang không bao giờ vượt quá giới hạn kích thước trang

*Với bất kỳ* dataset leads nào có kích thước bất kỳ (kể cả 0), và bất kỳ số trang hợp lệ nào, response từ `GET /api/admin/leads` phải có `data.length <= limit` (mặc định 20), và `pagination.totalPages` phải bằng `Math.ceil(total / limit)`.

**Validates: Requirements 9.4**

---

### Thuộc tính 8: Thống kê tổng số Lead phải nhất quán với dữ liệu thực tế

*Với bất kỳ* trạng thái database nào, `stats.total` trong response của `GET /api/admin/leads` phải bằng tổng số bản ghi trong bảng `leads`, và tổng của tất cả giá trị trong `stats.byServiceInterest` phải bằng `stats.total`.

**Validates: Requirements 9.5**

---

### Thuộc tính 9: CSV export chứa đầy đủ tất cả Lead

*Với bất kỳ* dataset leads nào, response từ `GET /api/admin/leads/export` phải có `Content-Type: text/csv`, số dòng dữ liệu (không tính header) phải bằng tổng số bản ghi trong bảng `leads`, và mỗi dòng phải chứa đủ các cột: Tên, Email, SĐT, Nhu cầu, Ngày tạo.

**Validates: Requirements 9.7**

---

### Thuộc tính 10: Mỗi card sản phẩm đều có nút CTA

*Với bất kỳ* danh sách sản phẩm nào được render trong `ProductsSection`, mỗi card phải chứa ít nhất một phần tử có role `button` hoặc thẻ `<a>` với text là "Tìm hiểu thêm" hoặc "Đăng ký".

**Validates: Requirements 5.5**

---

### Thuộc tính 11: Các key i18n có giá trị khác nhau giữa hai ngôn ngữ

*Với bất kỳ* key nào tồn tại trong cả `vi.json` và `en.json`, giá trị tương ứng trong hai file phải khác nhau (không được để cùng một chuỗi), đảm bảo nội dung thực sự được dịch chứ không phải copy nguyên văn.

**Validates: Requirements 11.3**

---

## Chiến lược Kiểm thử (chi tiết)

### Cấu hình Property-Based Test với fast-check

```typescript
// Ví dụ cấu hình property test cho Thuộc tính 1
import fc from 'fast-check';
import { createLeadSchema } from '@/lib/validators';

// Feature: glomix-landing-page, Property 1: Validation schema từ chối mọi đầu vào không hợp lệ
test('createLeadSchema từ chối email không hợp lệ', () => {
  fc.assert(
    fc.property(
      fc.string().filter(s => !s.includes('@')), // chuỗi không phải email
      (invalidEmail) => {
        const result = createLeadSchema.safeParse({
          customerName: 'Nguyễn Văn A',
          email: invalidEmail,
          phone: '0912345678',
          serviceInterest: 'AWS_Migration',
        });
        return result.success === false;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Phân bổ test theo module

| Module | Unit Tests | Property Tests |
|--------|-----------|----------------|
| `lib/validators.ts` | Edge cases cụ thể | P1: Invalid inputs |
| `api/leads/route.ts` | Mock DB responses | P2: Round-trip, P3: Duplicate |
| `lib/analytics.ts` | Mock gtag | P4: Event attributes, P5: No GA_ID |
| `middleware.ts` | Valid/invalid tokens | P6: Auth guard |
| `api/admin/leads/route.ts` | Empty dataset | P7: Pagination, P8: Stats |
| `api/admin/leads/export/route.ts` | CSV format | P9: CSV completeness |
| `components/sections/ProductsSection.tsx` | Render | P10: CTA buttons |
| `i18n/messages/*.json` | Key existence | P11: i18n values differ |

### Ví dụ Unit Test

```typescript
// Kiểm tra Navbar hiển thị đúng thương hiệu Glomix (Requirement 1.1)
test('Navbar hiển thị tên thương hiệu Glomix', () => {
  render(<Navbar />);
  expect(screen.getByText('Glomix')).toBeInTheDocument();
});

// Kiểm tra redirect khi chưa xác thực (Requirement 9.2)
test('Admin dashboard redirect về login khi chưa xác thực', async () => {
  const response = await fetch('/admin/dashboard');
  expect(response.redirected).toBe(true);
  expect(response.url).toContain('/admin/login');
});
```
