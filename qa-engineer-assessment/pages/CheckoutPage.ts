import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutInfo(
    first: string,
    last: string,
    zip: string
  ) {
    await this.page.fill('#first-name', first);
    await this.page.fill('#last-name', last);
    await this.page.fill('#postal-code', zip);
  }

  async continue() {
    await this.page.click('#continue');
  }

  async getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }
}