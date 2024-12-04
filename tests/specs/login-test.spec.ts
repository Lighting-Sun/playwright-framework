import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';
import { InventoryPage } from '../pages/inventory.page';

const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));

test('Should successfuly log in with a valid user', {
  tag: ['@regression']
}, async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  const inventoryPage = new InventoryPage(page, test.info());
  await loginPage.openPage();
  await loginPage.fillUsername(data.users.validUser.username);
  await loginPage.fillPassword(data.users.validUser.password);
  await loginPage.clickOnLoginBtn();
  await expect(page).toHaveURL(/inventory/);
  expect(await inventoryPage.header.getPageTitleText()).toEqual('Products')
});

test('Should show an error when logging in with invalid user', {
  tag: ['@regression']
}, async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  // Expect a title "to contain" a substring.
  await loginPage.openPage();
  await loginPage.fillUsername(data.users.invalidUser.username);
  await loginPage.fillPassword(data.users.invalidUser.password);
  await loginPage.clickOnLoginBtn();
  expect(await loginPage.getLoginErrorMessage()).toEqual(data.loginErrorMessage);
});

test('Should logout successfully when already logged in', {
  tag: ['@regression']
}, async ({ page }) => {
  const loginPage = new LoginPage(page, test.info());
  const inventoryPage = new InventoryPage(page, test.info());
  await loginPage.openPage();
  await loginPage.fillUsername(data.users.validUser.username);
  await loginPage.fillPassword(data.users.validUser.password);
  await loginPage.clickOnLoginBtn();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL(/inventory/);
  expect(await inventoryPage.header.getPageTitleText()).toEqual('Products')
  await inventoryPage.header.clickOnBurgerMenuBtn();
  await inventoryPage.header.sideMenu.clickOnSideMenuOptionByValue('Logout');
  expect(await loginPage.getLoginLogoText()).toEqual('Swag Labs');
});
