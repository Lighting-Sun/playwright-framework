import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));

test('Should successfuly log in with a valid user', async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  // Expect a title "to contain" a substring.
  await loginPage.openPage();
  await loginPage.fillUsername(data.users.validUser.username);
  await loginPage.fillPassword(data.users.validUser.password);
  await loginPage.clickOnLoginBtn();
  await expect(page).toHaveURL(/inventory/);
});

test('Should show an error when logging in with invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  // Expect a title "to contain" a substring.
  await loginPage.openPage();
  await loginPage.fillUsername(data.users.invalidUser.username);
  await loginPage.fillPassword(data.users.invalidUser.password);
  await loginPage.clickOnLoginBtn();
  expect(await loginPage.getLoginErrorMessage()).toEqual(data.loginErrorMessage);
});
