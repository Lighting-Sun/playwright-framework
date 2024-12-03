import { Header } from "../components/header.component";
import BasePage from "./basePage";
import { Page, TestInfo, test } from "@playwright/test"


export class CartPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    header = new Header(this._page, this._testInfo);

    locators = {
        itemCartNames: {
            selector: "div[data-test='inventory-item-name']",
            description: "item names in cart",
        },
        itemCartPrices: {
            selector: "div[data-test='inventory-item-price']",
            description: "item prices in cart",
        },
        itemCartRemoveButton: {
            selector: "button[data-test^='remove']",
            description: "item remove from cart button"
        },
        checkoutButton: {
            selector: "button[data-test='checkout']",
            description: "checkout button"
        }
    };

    public async getItemCartNames(): Promise<(string | null)[]> {
        return await test.step(`Getting item cart names`, async () => {
            return await this.playWrightFactory.getTextFromElements(this.locators.itemCartNames);
        })
    }

    public async getItemCartPrices(): Promise<(string | null)[]> {
        return await test.step(`Getting item cart names`, async () => {
            return await this.playWrightFactory.getTextFromElements(this.locators.itemCartPrices);
        })
    }

    public async removeAllItemsFromCart(): Promise<void> {
        return await test.step(`Removing all items from cart`, async () => {
            await this.playWrightFactory.clickAllIfExists(this.locators.itemCartRemoveButton);
        });
    }

    public async clickOnCheckoutButton(): Promise<void> {
        return await test.step(`Clicking on checkout button`, async () => {
            await this.playWrightFactory.click(this.locators.checkoutButton);
        })
    }
}
