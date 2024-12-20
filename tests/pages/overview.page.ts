import { Page, TestInfo, test } from "@playwright/test";
import BasePage from "./basePage";
import { Header } from "../components/header.component";

export class OverviewPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    header = new Header(this._page, this._testInfo);

    locators = {
        finishButton: {
            selector: "#finish",
            description: "finish purchase button",
        },
        overviewItemNames: {
            selector: "div[data-test='inventory-item-name']",
            description: "overview page item name",
        },
        overviewItemPrices: {
            selector: "div[data-test='inventory-item-price']",
            description: "overview page item price",
        },
        subTotalLabel: {
            selector: "div[data-test='subtotal-label']",
            description: "sub total label",
        },
    };

    public async getValuesFromPrices(): Promise<number[]> {
        return await test.step(`Getting values from item prices`, async () => {
            const textFromPrices: (string | null)[] = await this.playWrightFactory.getTextFromElements(this.locators.overviewItemPrices);
            const trimmedPrice: number[] = textFromPrices.map(textToTrim => textToTrim?.slice(1)).map(Number);
            return trimmedPrice;
        })
    }

    public async getTextFromPrices(): Promise<(string | null)[]> {
        return await test.step(`Getting text from item prices`, async () => {
            const textFromPrices: (string | null)[] = await this.playWrightFactory.getTextFromElements(this.locators.overviewItemPrices);
            return textFromPrices;
        })
    }

    public async getItemOverviewNames(): Promise<(string | null)[]> {
        return await test.step(`Getting item overview names`, async () => {
            return await this.playWrightFactory.getTextFromElements(this.locators.overviewItemNames);
        })
    }

    public async getSubTotalValue(): Promise<number> {
        return await test.step(`Getting sub total value`, async () => {
            const subTotalText = (await this.playWrightFactory.getText(this.locators.subTotalLabel) ?? "").replace('Item total: $', '');
            return Number(subTotalText);
        })
    }

    async clickOnFinishButton(): Promise<void> {
        return await test.step(`Clicking on finish button`, async () => {
            await this.playWrightFactory.click(this.locators.finishButton);
        })
    }
}
