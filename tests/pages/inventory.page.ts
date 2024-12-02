import { Header } from "../components/header.component";
import BasePage from "./basePage";
import { Page, TestInfo, test } from "@playwright/test"
import UtilsMethods from "../utils/utilsMethods.utils";

export type ItemDetails = {
    itemName: string | null;
    itemPrice: string | null;
}
export class InventoryPage extends BasePage {

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
            await this.playWrightFactory.click(await this.playWrightFactory.getSelectorByValue(this.locators.inventoryAddCartItemButtonIndex, index));
        })
    }

    public async AddItemToCartByIndex(index: string): Promise<ItemDetails> {

        return await test.step(`Adding item to cart using index ${index}`, async () => {
            const itemNameText = await this.getInventoryNameFromIndexText(index);
            const itemPriceText = await this.getInventoryPriceFromIndexText(index);
            await this.clickAddCartItemButtonFromIndex(index);
            return {
                itemName: itemNameText,
                itemPrice: itemPriceText,
            };
        })
    }

    public async getNumberOfItems(): Promise<number> {
        return await test.step(`Getting the number of items`, async () => {
            return (await this.playWrightFactory.getElements(this.locators.inventoryItemCard)).length;
        })
    }

    public async addRandomItemsToCart(): Promise<ItemDetails[]> {
        return await test.step(`Getting the number of items`, async () => {
            const detailsPromises: Promise<ItemDetails>[] = [];
            const numberOfItems = await this.getNumberOfItems();
            const indexesToAdd = UtilsMethods.getSetFromRange(1, numberOfItems, UtilsMethods.getRandomNumber(1, numberOfItems));
            for await (const index of indexesToAdd) {
                detailsPromises.push(this.AddItemToCartByIndex(index.toString()));
            }
            const itemDetails = await Promise.all(detailsPromises);
            return itemDetails;
        })
    }

    public async getProperyValuesFromArrayOfDetails(arrOfItemDetail: ItemDetails[], strPropertyToGet: 'itemName' | 'itemPrice'): Promise<(string | null)[]> {
        return await test.step(`Getting property ${strPropertyToGet} from item details array`, async () => {
            return arrOfItemDetail.map(detail => detail[strPropertyToGet]);
        })
    }

    public async getInventoryItemNameByNameText(value: string): Promise<string | null> {
        return await test.step(`Getting Inventory item Name by Name text: ${value}`, async () => {
            const selector = await this.playWrightFactory.getSelectorByValue(this.locators.inventoryItemNameByName, value);
            return await this.playWrightFactory.getText(selector);
        })
    }

    public async getInventoryItemPriceByNameText(value: string): Promise<string | null> {
        return await test.step(`Getting Inventory item Price by Name text: ${value}`, async () => {
            const selector = await this.playWrightFactory.getSelectorByValue(this.locators.inventoryItemPriceByName, value);
            return await this.playWrightFactory.getText(selector);
        })
    }

    public async clickInventoryItemAddToCartByName(value: string): Promise<void> {
        return await test.step(`Clicking on Inventory item Add to Cart btn by Name text: ${value}`, async () => {
            const selector = await this.playWrightFactory.getSelectorByValue(this.locators.inventoryAddToCartButtonByName, value);
            return await this.playWrightFactory.click(selector);
        })
    }

    public async AddItemToCartByName(value: string): Promise<ItemDetails> {
        return await test.step(`Adding an Item to cart by name: ${value}`, async () => {
            const itemNameText = await this.getInventoryItemNameByNameText(value);
            const itemPriceText = await this.getInventoryItemPriceByNameText(value);
            await this.clickInventoryItemAddToCartByName(value);
            return {
                itemName: itemNameText,
                itemPrice: itemPriceText,
            };
        });
    }
}
