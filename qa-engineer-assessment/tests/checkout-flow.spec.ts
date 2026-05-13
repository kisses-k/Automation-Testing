import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, checkoutData } from '../utils/testData';

test('Complete purchase flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.navigate();
  await login.login(users.valid.username, users.valid.password);
  await login.verifyLoginSuccess();

  await inventory.addBackpackToCart();
  await inventory.verifyCartCount('1');
  await inventory.openCart();

  await cart.verifyItem('Sauce Labs Backpack');
  await cart.proceedToCheckout();

  await checkout.fillCheckoutInfo(
    checkoutData.firstName,
    checkoutData.lastName,
    checkoutData.postalCode
  );

  await checkout.continue();
});