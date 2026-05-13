import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    await this.page.click('#checkout');
  }

  async verifyItem(itemName: string) {
    await expect(this.page.locator('.inventory_item_name'))
      .toContainText(itemName);
  }
}