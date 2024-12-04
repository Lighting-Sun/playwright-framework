import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';
import { InventoryPage } from '../pages/inventory.page';
import UtilsMethods from '../utils/utilsMethods.utils';

test('Should successfully sort products', {
    tag: ['@regression']
}, async ({ page }) => {

    const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));

    const loginPage = new LoginPage(page, test.info());
    const inventoryPage = new InventoryPage(page, test.info());

    await loginPage.openPage();
    await loginPage.loginWithCredentials(data.users.validUser.username, data.users.validUser.password);
    await expect(page).toHaveURL(/inventory/);
    expect(await inventoryPage.header.getPageTitleText()).toEqual('Products');
    const beforeSortingPrices = UtilsMethods.sortLowToHighValues((await inventoryPage.getTextFromPrices()));
    await inventoryPage.header.clickOnSortFilterDropdownOption('lohi');
    const afterSortingPrices = await inventoryPage.getTextFromPrices();
    expect(beforeSortingPrices).toEqual(afterSortingPrices);

});
