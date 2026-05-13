import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

test('Invalid login should fail', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.login(
    users.invalid.username,
    users.invalid.password
  );

  await expect(await login.getErrorMessage())
    .toContainText('Username and password do not match');
});

test('Blank login should show validation', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.login('', '');

  await expect(await login.getErrorMessage())
    .toContainText('Username is required');
});