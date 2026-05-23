<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Payment Gateway Configuration Namespaces & Winston Logger

Ứng dụng NestJS cung cấp cơ chế cấu hình phân tách theo không gian tên (Configuration Namespaces), xác thực biến môi trường nghiêm ngặt (Joi Fail-Fast), và hệ thống ghi nhật ký chuẩn Production (Winston JSON Logging) tích hợp bộ lọc che dấu dữ liệu nhạy cảm (Log Sanitization).

---

## Các tính năng chính (Key Features)

1. **Phân tách cấu hình theo không gian tên (Namespaced Config)**:
   - Các biến môi trường được phân loại rõ ràng thành 3 không gian tên độc lập: `app`, `database`, và `payment`.
   - Sử dụng `ConfigService` có định nghĩa kiểu dữ liệu tĩnh (static typing) an toàn qua lớp generic `ConfigService<AllConfig>`.

2. **Xác thực biến môi trường Fail-Fast**:
   - Sử dụng thư viện **Joi** để xác thực toàn bộ các biến môi trường cấu hình tại thời điểm ứng dụng khởi động.
   - Bật cấu hình `abortEarly: true` để dừng ngay ứng dụng nếu thiếu biến bắt buộc, và `allowUnknown: false` kết hợp `ignoreEnvVars: true` để cô lập việc xác thực chặt chẽ trong phạm vi file `.env`.

3. **Winston JSON Logger chuẩn Production**:
   - Thay thế hoàn toàn logger mặc định của NestJS bằng **Winston**.
   - Xuất nhật ký ra cả Console và File (`logs/app.log` & `logs/error.log`) dưới định dạng JSON hợp lệ để tương thích tốt với các hệ thống phân tích tập trung (như ELK, Splunk, Datadog).
   - Tích hợp siêu dữ liệu (metadata) mặc định vào từng dòng log: `service: 'payment-gateway'`, `hostname: <tên_máy_chủ>`.

4. **Làm sạch log & Che giấu dữ liệu nhạy cảm (Log Sanitization & Masking)**:
   - Chặn rò rỉ dữ liệu qua endpoint `/payments/config`: Tự động ẩn các API Key nhạy cảm (chỉ hiển thị 6 ký tự đầu).
   - Winston Custom Formatter (`sanitizeFormat`): Tự động phát hiện đệ quy và che giấu các thuộc tính chứa từ khóa nhạy cảm (`apikey`, `password`, `secret`, `token`) thành `"***MASKED***"`.

---

## Yêu cầu hệ thống (System Requirements)
- **Node.js**: Phiên bản `>= 18` (Đã cấu hình khai báo trong `engines` của `package.json`).
- **npm**: Phiên bản tương thích đi kèm Node.js.

---

## Hướng dẫn cài đặt & Thiết lập dự án

### Bước 1: Cài đặt dependencies
Di chuyển vào thư mục dự án và chạy lệnh cài đặt:
```bash
$ npm install
```

### Bước 2: Chuẩn bị tệp tin môi trường
Dự án được cấu hình sẵn các tệp môi trường mẫu cho hai chế độ hoạt động:
- Sao chép tệp mẫu để cấu hình môi trường Phát triển:
  ```bash
  # Windows
  copy ".env example.development" ".env.development"
  
  # Linux/macOS
  cp ".env example.development" .env.development
  ```
- Điền đầy đủ các thông số kết nối cơ sở dữ liệu và API Key thanh toán vào file `.env.development` và `.env.production`.

---

## Hướng dẫn khởi chạy ứng dụng

### 1. Khởi chạy ở chế độ Phát triển (Development Mode)
Ứng dụng sẽ nạp tệp cấu hình `.env.development`, kích hoạt logger ở mức độ `debug`, chạy trên cổng `3000`:
```bash
$ npx cross-env NODE_ENV=development npm run start
```
Hoặc chạy với chế độ quan sát thay đổi (watch mode):
```bash
$ npx cross-env NODE_ENV=development npm run start:dev
```

### 2. Khởi chạy ở chế độ Production (Production Mode)
Ứng dụng sẽ nạp tệp cấu hình `.env.production`, chỉ ghi nhận logs từ mức độ `info` trở lên (bỏ qua logs `debug`), chạy trên cổng `8080`:
```bash
$ npm run start:prod
```

### 3. Khởi chạy kịch bản lỗi thiếu biến môi trường (Crash Simulation)
Thử nghiệm tính năng Fail-Fast của Joi bằng cách chạy ứng dụng thiếu biến bắt buộc `PAYMENT_API_KEY`:
```bash
$ npm run start:missing-env
```
Ứng dụng sẽ thoát ngay lập tức với mã lỗi (exit code ≠ 0) kèm thông báo chi tiết trong stderr.

---

## Hướng dẫn chạy kiểm thử tự động (Unit Tests)
Dự án đã tích hợp mock đầy đủ cho cấu hình cơ sở dữ liệu và Winston Logger. Chạy bộ kiểm thử bằng lệnh:
```bash
# Chạy tất cả test suites
$ npm run test

# Chạy test suite ở chế độ watch
$ npm run test:watch
```

---

## Chi tiết các API Endpoints

### 1. GET `/payments/config`
- **Mô tả**: Trả về cấu hình hiện tại của ứng dụng.
- **Bảo mật**: API Key `paymentApiKey` đã được che giấu an toàn (chỉ hiển thị 6 ký tự đầu).
- **Mẫu dữ liệu phản hồi (Response)**:
  ```json
  {
    "appName": "Payment Gateway App (Dev)",
    "appPort": 3000,
    "nodeEnv": "development",
    "dbHost": "localhost",
    "dbPort": 5432,
    "dbName": "payment_db_dev",
    "paymentProvider": "stripe",
    "paymentApiKey": "sk_tes...",
    "paymentTimeout": 5000,
    "appVersion": "0.0.1"
  }
  ```

### 2. POST `/payments/charge`
- **Mô tả**: Xử lý yêu cầu thanh toán giao dịch.
- **Yêu cầu (Request Body)**:
  ```json
  {
    "orderId": "ORD-001",
    "amount": 120000
  }
  ```
- **Dữ liệu phản hồi (Response)**:
  ```json
  {
    "orderId": "ORD-001",
    "amount": 120000,
    "provider": "stripe",
    "chargedAt": "2026-05-23T14:03:07.077Z"
  }
  ```

---

## Kết quả kiểm thử mẫu (Smoke Test Scenarios)

Dưới đây là kết quả kiểm thử thực tế được trích xuất trực tiếp từ hệ thống:

### 1. Kịch bản Happy Path (Chế độ Development)
- **Hành động**: Gọi `POST /payments/charge` trên môi trường phát triển (cổng `3000`).
- **Dòng log JSON tương ứng ghi nhận trong `logs/app.log`**:
  ```json
  {"amount":120000,"context":"PaymentGatewayService","hostname":"DESKTOP-2VJO9SQ","level":"info","message":"charging","orderId":"ORD-001","service":"payment-gateway","timestamp":"2026-05-23T14:03:07.076Z"}
  ```
- **Nhận xét**: Log chứa đầy đủ thông tin giao dịch, định dạng JSON chuẩn xác và đính kèm metadata (`hostname`, `service`).

### 2. Kịch bản Crash-on-missing-env (Thiếu biến bắt buộc)
- **Hành động**: Gọi lệnh chạy app thiếu biến `PAYMENT_API_KEY`.
- **Thông báo lỗi in ra qua Stderr**:
  ```text
  [Nest] 36832  - 05/23/2026, 9:03:21 PM     LOG [NestFactory] Starting Nest application...
  [Nest] 36832  - 05/23/2026, 9:03:21 PM   ERROR [ExceptionHandler] Error: Config validation error: "PAYMENT_API_KEY" is required
      at ConfigModule.forRoot (D:\Nghia-project\escape-beta\payment-gateway-config-namespaces\node_modules\@nestjs\config\dist\config.module.js:96:23)
      at Object.<anonymous> (D:\Nghia-project\escape-beta\payment-gateway-config-namespaces\dist\app.module.js:30:35)
      at Module._compile (node:internal/modules/cjs/loader:1760:14)
      at Object..js (node:internal/modules/cjs/loader:1892:10)
      at Module.load (node:internal/modules/cjs/loader:1480:32)
      at Module._load (node:internal/modules/cjs/loader:1299:12)
      at TracingChannel.traceSync (node:diagnostics_channel:328:14)
      at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
      at Module.require (node:internal/modules/cjs/loader:1503:12)
      at require (node:internal/modules/helpers:152:16)
  ```
- **Nhận xét**: Ứng dụng thoát ngay lập tức và chỉ rõ nguyên nhân thiếu biến cấu hình bắt buộc, ngăn chặn hoàn toàn việc chạy dịch vụ lỗi.

### 3. Kịch bản Chế độ Production
- **Hành động**: Gọi `POST /payments/charge` trên môi trường sản xuất (cổng `8080`).
- **Dòng log JSON tương ứng ghi nhận trong `logs/app.log`**:
  ```json
  {"amount":250000,"context":"PaymentGatewayService","hostname":"DESKTOP-2VJO9SQ","level":"info","message":"charging","orderId":"ORD-PROD-001","service":"payment-gateway","timestamp":"2026-05-23T14:03:47.103Z"}
  ```
- **Nhận xét**: Các dòng log cấp độ `debug` được lọc bỏ hoàn toàn, chỉ giữ lại các dòng log cấp độ `info` trở lên để tối ưu hóa hiệu năng và dung lượng lưu trữ.

---

## Bản quyền & Giấy phép (License)
Dự án được phân phối dưới giấy phép [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
