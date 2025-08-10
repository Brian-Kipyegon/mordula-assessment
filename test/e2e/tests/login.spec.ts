// tests/e2e/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { DashboardPage } from '../src/pages/dashboardPage';

test.describe('Login Feature', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('user@example.com', 'password123');
    await dashboardPage.expectWelcomeMessage();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user@example.com', 'wrongpass');
    await loginPage.expectErrorMessage('Invalid credentials. Please try again.');
  });

  test('should lock account after 3 failed attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    for (let i = 0; i < 3; i++) {
      await loginPage.login('user@example.com', 'wrongpass');
    }
    await loginPage.expectErrorMessage('Account locked. Try again later.');
  });

});
