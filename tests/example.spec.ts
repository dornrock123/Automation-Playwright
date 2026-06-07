import { test, expect } from '@playwright/test';

test(
  'TC001 - Successful Registration + OTP Verification',
  async ({ page }) => {

    // Generate unique email every run
    const email = `krisd3214+${Date.now()}@gmail.com`;

    await page.goto(
      'https://portal.uat.gofive.co.th/Register/empeo'
    );

    // ==========================
    // Search Company
    // ==========================

    await page
      .getByTestId('input_textfield_input_registration_tax_id')
      .fill('ori');

    await page
      .locator('div')
      .filter({ hasText: /^- วารี1820600004601$/ })
      .nth(1)
      .click();

    // ==========================
    // Business Type
    // ==========================

    const companyTypeDropdown = page
      .getByTestId('dropdown_selection_registration_company_type')
      .locator('i.go5-dropdown-selection-arror');

    await companyTypeDropdown.scrollIntoViewIfNeeded();
    await expect(companyTypeDropdown).toBeVisible();
    await companyTypeDropdown.click();

    await page.getByText('ค้าปลีก', { exact: true }).click();

    // ==========================
    // User Amount
    // ==========================

    const userAmountDropdown = page
      .getByTestId('dropdown_selection_registration_user_amount')
      .locator('i.go5-dropdown-selection-arror');

    await userAmountDropdown.scrollIntoViewIfNeeded();
    await expect(userAmountDropdown).toBeVisible();
    await userAmountDropdown.click();

    await page.getByText('1-20', { exact: true }).click();

    // ==========================
    // Email
    // ==========================

    await page
      .getByTestId('input_textfield_input_registration_email')
      .fill(email);

    console.log(`Testing Email: ${email}`);

    // ==========================
    // First Name
    // ==========================

    await page
      .getByTestId('input_textfield_input_register_first_name')
      .fill('test');

    // ==========================
    // Last Name
    // ==========================

    await page
      .getByTestId('input_textfield_input_register_last_name')
      .fill('automation');

    // ==========================
    // Phone
    // ==========================

    await page
      .getByRole('textbox', { name: 'เบอร์มือถือ*' })
      .fill('0967690708');

    // ==========================
    // Promo Code
    // ==========================

    await page.getByText('ใช้โค้ดส่วนลด').click();

    await page
      .getByTestId('input_text_registration_coupon_code')
      .fill('FREE15DAY');

    // ==========================
    // Accept Terms
    // ==========================

    const checkbox = page.getByTestId(
      'input_checkbox_registration_checkbox'
    );

    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }

    // ==========================
    // Submit
    // ==========================

    await page
      .getByTestId('button_submit_registration_try_for_free')
      .click();

    // ==========================
    // Wait OTP Page
    // ==========================

    await expect(
      page.getByTestId('button_button_registration_verify')
    ).toBeVisible({ timeout: 10000 });

// ==========================
// OTP = 123456 (Requirement)
// ==========================

const otpInputs = page.locator('input[type="tel"]');

await otpInputs.nth(0).fill('0');
await otpInputs.nth(1).fill('1');
await otpInputs.nth(2).fill('2');
await otpInputs.nth(3).fill('3');
await otpInputs.nth(4).fill('4');
await otpInputs.nth(5).fill('5');
await otpInputs.nth(6).click();
await otpInputs.nth(6).pressSequentially('6', { delay: 100 });

    // ==========================
    // Verify OTP
    // ==========================

    await page
      .getByTestId('button_button_registration_verify')
      .click();

    // ==========================
    // Verify Result
    // ==========================

    await page.waitForTimeout(3000);
  }
);