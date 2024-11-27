import { Header } from "../components/header.component";
import basePage from "./basePage";
import { Page, TestInfo, test } from "@playwright/test"

export class InventoryPage extends basePage {

    header = new Header(this._page, this._testInfo);

    locators = {
        inventoryItemLabelFromName: {
            selector: "//div[text()='${value}']",
            description: "item label name '${value}'",
        },
        inventoryItemPrice: {
            selector: "div[class='inventory_item_price']",
            description: "inventory item price",
        },
        addToCartButtonBasedOnItemName: {
            selector: "//div[text()='${value}']/ancestor-or-self::div[@class='inventory_item_description']//button[text()='Add to cart']",
            description: "add to cart button based on item name '${value}'",
        },
        inventoryItemPriceIndex: {
            selector: "div[data-test='inventory-item']:nth-of-type(${value}) div[class='inventory_item_price']",
            description: "inventory item price based on index ${value}'",
        },
        inventoryItemNameIndex: {
            selector: "div[data-test='inventory-item']:nth-of-type(${value}) div[class='inventory_item_name ']",
            description: "inventory item name based on index ${value}'",
        },
        inventoryAddCartItemButtonIndex: {
            selector: "div[data-test='inventory-item']:nth-of-type(${value}) button[class*='btn_small']",
            description: "inventory item button based on index ${value}'",
        },
        inventoryItemCard: {
            selector: "div[data-test='inventory-item']",
            description: "inventory item name based on index'",
        },
        inventoryItemNameByName: {
            selector: "//div[text()='${value}']",
            description: "inventory item name based on ${value}'",
        },
        inventoryItemPriceByName: {
            selector: "//div[text()='${value}']/ancestor-or-self::div[@data-test='inventory-item-description']//div[@data-test='inventory-item-price']",
            description: "inventory item price based on ${value}'",
        },
        inventoryAddToCartButtonByName: {
            selector: "//div[text()='${value}']/ancestor-or-self::div[@data-test='inventory-item-description']//button",
            description: "inventory item price based on ${value}'",
        }
    };

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    public async clickAddToCartByItemName(strItemName: string): Promise<void> {
        await test.step(`clicking on login button`, async () => {
            const element = await this.playWrightFactory.getSelectorByValue(this.locators.addToCartButtonBasedOnItemName, strItemName);
            await this.playWrightFactory.click(element);
        })
    }

    public async getTextFromPrices(): Promise<string[]> {
        return await test.step('getting text from prices', async () => {
            const textFromPrices = await this.playWrightFactory.getTextFromElements(this.locators.inventoryItemPrice);
            const trimmedPrice: string[] = textFromPrices.map(textToTrim => {
                const trimmedText = textToTrim || '';
                return trimmedText.slice(1);
            });
            return trimmedPrice;
        })
    }

    public async getInventoryPriceFromIndexText(index: string): Promise<string | null> {
        return await test.step(`Getting Inventory price from index ${index} text`, async () => {
            return await this.playWrightFactory.getText(await this.playWrightFactory.getSelectorByValue(this.locators.inventoryItemPriceIndex, index));
        })
    }

    public async getInventoryNameFromIndexText(index: string): Promise<string | null> {
        return await test.step(`Getting Inventory name from index ${index} text`, async () => {
            return await this.playWrightFactory.getText(await this.playWrightFactory.getSelectorByValue(this.locators.inventoryItemNameIndex, index));
        })
    }

    public async clickAddCartItemButtonFromIndex(index: string): Promise<void> {
        await test.step(`Clicking add cart item button from index ${index}`, async () => {
            await this.playWrightFactory.click(await this.playWrightFactory.getSelectorByValue(this.locators.inventoryItemNameIndex, index));
        })
    }
}
