import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';
import { InventoryPage } from '../pages/inventory.page';
import UtilsMethods from '../utils/utilsMethods.utils';
import { CartPage } from '../pages/cart.page';

const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));


test('Should add and validate multiple items added to cart', {
    tag: ['@regression']
}, async ({ page }) => {
    const loginPage = new LoginPage(page, test.info());
    const inventoryPage = new InventoryPage(page, test.info());
    const cartPage = new CartPage(page, test.info());

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
    const cartNames = await cartPage.getItemCartNames();
    const cartPrices = await cartPage.getItemCartPrices();
    expect(inventoryNames).toEqual(cartNames);
    expect(inventoryPrices).toEqual(cartPrices);
    await cartPage.removeAllItemsFromCart();
});

test('Should add and validate a single specific item to cart', {
    tag: ['@regression']
}, async ({ page }) => {
    const loginPage = new LoginPage(page, test.info());
    const inventoryPage = new InventoryPage(page, test.info());
    const cartPage = new CartPage(page, test.info());

    await loginPage.openPage();
    await loginPage.loginWithCredentials(data.users.validUser.username, data.users.validUser.password);
    await expect(page).toHaveURL(/inventory/);
    expect(await inventoryPage.header.getPageTitleText()).toEqual('Products');
    const result = await inventoryPage.AddItemToCartByName(data.products.sauceLabsOnesie);
    const inventoryName = result.itemName;
    const inventoryPrice = result.itemPrice;
    await inventoryPage.header.clickOnShoppingCartBtn();
    await expect(page).toHaveURL(/cart/);
    expect(await inventoryPage.header.getPageTitleText()).toEqual('Your Cart');
    const cartName = await cartPage.getItemCartNames();
    const cartPrice = await cartPage.getItemCartPrices();
    expect([inventoryName]).toEqual(cartName);
    expect([inventoryPrice]).toEqual(cartPrice);
    await cartPage.removeAllItemsFromCart();
});
