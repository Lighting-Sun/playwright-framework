import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Should successfuly log in with a valid user', async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  // Expect a title "to contain" a substring.
  await loginPage.openPage();
  await loginPage.fillUsername("standard_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickOnLoginBtn();
  await expect(page).toHaveURL(/inventory/);
});

test('Should show an error when logging in with invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  // Expect a title "to contain" a substring.
  await loginPage.openPage();
  await loginPage.fillUsername("locked_out_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickOnLoginBtn();
  expect(await loginPage.getLoginErrorMessage()).toEqual("Epic sadface: Sorry, this user has been locked out.")
});
