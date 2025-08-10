// tests/e2e/pages/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private loginButton = 'button[type="submit"]';
  private errorAlert = '.alert.error';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://127.0.0.1:5000/');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Enter your email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
