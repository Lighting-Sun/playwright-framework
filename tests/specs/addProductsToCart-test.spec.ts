import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';
import { InventoryPage } from '../pages/inventory.page';
import UtilsMethods from '../utils/utilsMethods.utils';

const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));


test('Should add and validate multiple items added to cart', async ({ page }) => {
    const loginPage = new LoginPage(page, test.info());
    const inventoryPage = new InventoryPage(page, test.info());

    await loginPage.openPage();
    await loginPage.loginWithCredentials(data.users.validUser.username, data.users.validUser.password);
    await expect(page).toHaveURL(/inventory/);
    expect(await inventoryPage.header.getPageTitleText()).toEqual('Products');
    const result = await inventoryPage.addRandomItemsToCart();
    const inventoryNames = await inventoryPage.getProperyValuesFromArrayOfDetails(result, 'itemName');
    const inventoryPrices = await inventoryPage.getProperyValuesFromArrayOfDetails(result, 'itemPrice');
    await inventoryPage.header.clickOnShoppingCartBtn();
    await expect(page).toHaveURL(/cart/);
    expect(await inventoryPage.header.getPageTitleText()).toEqual('Your Cart');
    //need to implement cart page
});
