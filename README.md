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

Feature: empeo Registration System

  Background:
    Given User is on the registration page "https://portal.uat.gofive.co.th/Register/empeo"

  # ==========================
  # TC001 - Successful Registration
  # ==========================

  Scenario: TC001 - Successful registration with valid data and OTP verification
    Given User searches for company "ori" and selects "- วารี"
    And User selects business type "ค้าปลีก"
    And User selects user amount "1-20"
    And User enters a unique email
    And User enters first name "test"
    And User enters last name "automation"
    And User enters phone "0967690708"
    And User enters promo code "FREE15DAY"
    And User accepts terms and conditions
    When User clicks "ทดลองใช้ฟรี"
    Then OTP page should be displayed
    When User enters OTP "123456"
    And User clicks "ยืนยัน"
    Then Registration should be completed successfully

  # ==========================
  # TC002 - Invalid Promo Code
  # ==========================

  Scenario: TC002 - Registration with invalid promo code
    Given User fills in all required fields with valid data
    And User enters promo code "INVALIDCODE"
    And User accepts terms and conditions
    When User clicks "ทดลองใช้ฟรี"
    Then An error message should be displayed for invalid promo code

  # ==========================
  # TC003 - Required Fields Validation
  # ==========================

  Scenario: TC003 - Submit form without filling any required fields
    When User clicks "ทดลองใช้ฟรี" without filling any fields
    Then Validation error messages should appear on all required fields

  Scenario: TC003.1 - Submit form without email
    Given User fills in all required fields except email
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on email field

  Scenario: TC003.2 - Submit form without first name
    Given User fills in all required fields except first name
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on first name field

  Scenario: TC003.3 - Submit form without last name
    Given User fills in all required fields except last name
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on last name field

  Scenario: TC003.4 - Submit form without phone number
    Given User fills in all required fields except phone
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on phone field

  # ==========================
  # TC004 - Invalid Phone Number
  # ==========================

  Scenario: TC004.1 - Phone number less than 10 digits
    Given User fills in all required fields
    And User enters phone "0967"
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on phone field

  Scenario: TC004.2 - Phone number with special characters
    Given User fills in all required fields
    And User enters phone "096-769-0708"
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on phone field

  Scenario: TC004.3 - Phone number with letters
    Given User fills in all required fields
    And User enters phone "abcdefghij"
    When User clicks "ทดลองใช้ฟรี"
    Then Validation error message should appear on phone field

  # ==========================
  # TC005 - Invalid OTP
  # ==========================

  Scenario: TC005.1 - Enter wrong OTP
    Given User completes registration form with valid data
    When User clicks "ทดลองใช้ฟรี"
    Then OTP page should be displayed
    When User enters OTP "000000"
    And User clicks "ยืนยัน"
    Then An error message should be displayed for invalid OTP

  Scenario: TC005.2 - Submit OTP without entering any digits
    Given OTP page is displayed
    When User clicks "ยืนยัน" without entering OTP
    Then Verify button should be disabled or error message should appear

  # ==========================
  # TC006 - Duplicate Email
  # ==========================

  Scenario: TC006 - Register with already used email
    Given User fills in all required fields
    And User enters an email that has already been registered
    And User accepts terms and conditions
    When User clicks "ทดลองใช้ฟรี"
    Then An error message should be displayed for duplicate email
