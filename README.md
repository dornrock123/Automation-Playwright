# empeo Registration Automation Test

Automation test สำหรับระบบ Registration ของ empeo โดยใช้ [Playwright](https://playwright.dev/) และ TypeScript

---

## 📋 Test Coverage

| TC | Scenario | Status |
|----|----------|--------|
| TC001 | Successful Registration + OTP Verification | ✅ |

---

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) v18 ขึ้นไป
- npm v9 ขึ้นไป

---

## 🚀 Getting Started

### 1. Clone หรือวางไฟล์โปรเจกต์

```bash
mkdir empeo-automation
cd empeo-automation
```

### 2. Install Dependencies

```bash
npm init -y
npm install -D @playwright/test typescript
npx playwright install chromium
```

### 3. สร้างไฟล์ Test

สร้างไฟล์ `tests/example.spec.ts` แล้ววางสคริปต์ลงไป

### 4. สร้าง Playwright Config

สร้างไฟล์ `playwright.config.ts` ที่ root ของโปรเจกต์:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});
```

---

## ▶️ Running Tests

```bash
# รัน test ทั้งหมด
npx playwright test

# รัน test พร้อมเปิด browser ให้เห็น
npx playwright test --headed

# รันเฉพาะ TC001
npx playwright test --grep "TC001"

# รันแล้วดู report
npx playwright test --reporter=html
npx playwright show-report
```

---

## 🗂️ Project Structure

```
empeo-automation/
├── tests/
│   └── example.spec.ts   # Test scripts
├── playwright.config.ts  # Playwright configuration
├── package.json
└── README.md
```

---

## 🔧 Test Data

| Field | Value |
|-------|-------|
| Company | วารี (Tax ID: 1820600004601) |
| Business Type | ค้าปลีก |
| User Amount | 1-20 |
| Email | auto-generated (`krisd3214+<timestamp>@gmail.com`) |
| First Name | test |
| Last Name | automation |
| Phone | 0967690708 |
| Promo Code | FREE15DAY |
| OTP | 123456 |

---

## 📝 Notes

- Email จะถูก generate ใหม่ทุกครั้งที่รัน โดยใช้ `Date.now()` เป็น suffix เพื่อหลีกเลี่ยง duplicate
- OTP ใช้ค่า `123456` ตาม requirement ของ UAT environment
- Test รันบน UAT: `https://portal.uat.gofive.co.th/Register/empeo`# Automation-Playwright
