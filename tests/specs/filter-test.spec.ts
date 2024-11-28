import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { readFileSync } from 'fs';
import { InventoryPage } from '../pages/inventory.page';

test('login related scenarios', async ({ page }) => {

    const data = JSON.parse(readFileSync('./tests/data/testData.json', 'utf-8'));

    const loginPage = new LoginPage(page, test.info());
    const inventoryPage = new InventoryPage(page, test.info());


});
