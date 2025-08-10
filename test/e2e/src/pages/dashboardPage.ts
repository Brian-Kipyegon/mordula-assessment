// tests/e2e/pages/DashboardPage.ts
import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectWelcomeMessage() {
    await expect(this.page.getByRole('heading', { name: 'Welcome to the Dashboard!' })).toBeVisible();
  }
}
