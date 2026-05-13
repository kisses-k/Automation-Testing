import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addBackpackToCart() {
    await this.page.click('#add-to-cart-sauce-labs-backpack');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async verifyCartCount(count: string) {
    await expect(this.page.locator('.shopping_cart_badge'))
      .toHaveText(count);
  }
}