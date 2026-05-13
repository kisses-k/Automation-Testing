# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-validation.spec.ts >> Checkout with empty cart should be blocked
- Location: tests\checkout-validation.spec.ts:56:5

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /checkout-step-one/
Received string: "https://www.saucedemo.com/checkout-step-one.html"
Timeout: 5000ms

Call log:
  - Expect "not toHaveURL" with timeout 5000ms
    13 × unexpected value "https://www.saucedemo.com/checkout-step-one.html"

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: "Swag Labs Checkout: Your Information"
- textbox "First Name"
- textbox "Last Name"
- textbox "Zip/Postal Code"
- button "Go back Cancel":
  - img "Go back"
  - text: Cancel
- button "Continue"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { InventoryPage } from '../pages/InventoryPage';
  4  | import { CartPage } from '../pages/CartPage';
  5  | import { CheckoutPage } from '../pages/CheckoutPage';
  6  | import { users } from '../utils/testData';
  7  | 
  8  | async function goToCheckout(page) {
  9  |   const login = new LoginPage(page);
  10 |   const inventory = new InventoryPage(page);
  11 |   const cart = new CartPage(page);
  12 | 
  13 |   await login.navigate();
  14 |   await login.login(users.valid.username, users.valid.password);
  15 |   await inventory.addBackpackToCart();
  16 |   await inventory.openCart();
  17 |   await cart.proceedToCheckout();
  18 | }
  19 | 
  20 | test('Blank first name validation', async ({ page }) => {
  21 |   await goToCheckout(page);
  22 | 
  23 |   const checkout = new CheckoutPage(page);
  24 | 
  25 |   await checkout.fillCheckoutInfo('', 'Tester', '10001');
  26 |   await checkout.continue();
  27 | 
  28 |   await expect(await checkout.getErrorMessage())
  29 |     .toContainText('First Name is required');
  30 | });
  31 | 
  32 | test('Blank last name validation', async ({ page }) => {
  33 |   await goToCheckout(page);
  34 | 
  35 |   const checkout = new CheckoutPage(page);
  36 | 
  37 |   await checkout.fillCheckoutInfo('Kaye', '', '10001');
  38 |   await checkout.continue();
  39 | 
  40 |   await expect(await checkout.getErrorMessage())
  41 |     .toContainText('Last Name is required');
  42 | });
  43 | 
  44 | test('Blank postal code validation', async ({ page }) => {
  45 |   await goToCheckout(page);
  46 | 
  47 |   const checkout = new CheckoutPage(page);
  48 | 
  49 |   await checkout.fillCheckoutInfo('Kaye', 'Tester', '');
  50 |   await checkout.continue();
  51 | 
  52 |   await expect(await checkout.getErrorMessage())
  53 |     .toContainText('Postal Code is required');
  54 | });
  55 | 
  56 | test('Checkout with empty cart should be blocked', async ({ page }) => {
  57 |   const login = new LoginPage(page);
  58 |   const inventory = new InventoryPage(page);
  59 |   const cart = new CartPage(page);
  60 | 
  61 |   await login.navigate();
  62 | 
  63 |   await login.login(
  64 |     users.valid.username,
  65 |     users.valid.password
  66 |   );
  67 | 
  68 |   await inventory.openCart();
  69 | 
  70 |   await cart.proceedToCheckout();
  71 | 
> 72 |   await expect(page).not.toHaveURL(/checkout-step-one/);
     |                          ^ Error: expect(page).not.toHaveURL(expected) failed
  73 | });
```