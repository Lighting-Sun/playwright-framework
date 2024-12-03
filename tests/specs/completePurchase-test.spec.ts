import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';
import { InventoryPage } from '../pages/inventory.page';
import UtilsMethods from '../utils/utilsMethods.utils';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { OverviewPage } from '../pages/overview.page';
import { CompletePage } from '../pages/complete.page';

const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));


test('Should do a successful purchase', async ({ page }) => {
    const loginPage = new LoginPage(page, test.info());
    const inventoryPage = new InventoryPage(page, test.info());
    const cartPage = new CartPage(page, test.info());
    const checkoutPage = new CheckoutPage(page, test.info());
    const overviewPage = new OverviewPage(page, test.info());
    const completePage = new CompletePage(page, test.info());

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
    await cartPage.clickOnCheckoutButton();
    await expect(page).toHaveURL(/checkout-step-one/);
    expect(await checkoutPage.header.getPageTitleText()).toEqual('Checkout: Your Information');
    await checkoutPage.fillPersonalInformationForm(data.personalInfo.firstName, data.personalInfo.lastName, data.personalInfo.postalCode);
    await checkoutPage.clickContinueButton();
    await expect(page).toHaveURL(/checkout-step-two/);
    expect(await overviewPage.header.getPageTitleText()).toEqual('Checkout: Overview');
    const overviewNames = await overviewPage.getItemOverviewNames();
    const overviewPrices = await overviewPage.getTextFromPrices();
    expect(overviewNames).toEqual(cartNames);
    expect(overviewPrices).toEqual(cartPrices);
    const overviewSumPrices = await UtilsMethods.sumArrAndFixPresicion(await overviewPage.getValuesFromPrices(), 2);
    const overviewSubTotalPrice = await UtilsMethods.fixNumberPresicion(await overviewPage.getSubTotalValue(), 2);
    expect(overviewSumPrices).toEqual(overviewSubTotalPrice);
    await overviewPage.clickOnFinishButton();
    await expect(page).toHaveURL(/checkout-complete/);
    expect(await overviewPage.header.getPageTitleText()).toEqual('Checkout: Complete!');
    expect(await completePage.getCompletePurchaseText()).toEqual('Thank you for your order!');

});
