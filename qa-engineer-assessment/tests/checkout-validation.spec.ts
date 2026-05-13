import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../utils/testData';

async function goToCheckout(page) {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.navigate();
  await login.login(users.valid.username, users.valid.password);
  await inventory.addBackpackToCart();
  await inventory.openCart();
  await cart.proceedToCheckout();
}

test('Blank first name validation', async ({ page }) => {
  await goToCheckout(page);

  const checkout = new CheckoutPage(page);

  await checkout.fillCheckoutInfo('', 'Tester', '10001');
  await checkout.continue();

  await expect(await checkout.getErrorMessage())
    .toContainText('First Name is required');
});

test('Blank last name validation', async ({ page }) => {
  await goToCheckout(page);

  const checkout = new CheckoutPage(page);

  await checkout.fillCheckoutInfo('Kaye', '', '10001');
  await checkout.continue();

  await expect(await checkout.getErrorMessage())
    .toContainText('Last Name is required');
});

test('Blank postal code validation', async ({ page }) => {
  await goToCheckout(page);

  const checkout = new CheckoutPage(page);

  await checkout.fillCheckoutInfo('Kaye', 'Tester', '');
  await checkout.continue();

  await expect(await checkout.getErrorMessage())
    .toContainText('Postal Code is required');
});

test('Checkout with empty cart should be blocked', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.navigate();

  await login.login(
    users.valid.username,
    users.valid.password
  );

  await inventory.openCart();

  await cart.proceedToCheckout();

  await expect(page).not.toHaveURL(/checkout-step-one/);
});