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
