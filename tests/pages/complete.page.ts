import { Page, TestInfo, test } from "@playwright/test";
import BasePage from "./basePage";
import { Header } from "../components/header.component";


export class CompletePage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    header = new Header(this._page, this._testInfo);

    locators = {
        completePurchaseHeader: {
            selector: "//h2[@class='complete-header']",
            description: "complete purchase h2",
        },
    };

    public async getCompletePurchaseText(): Promise<string | null> {
        return await test.step(`Getting complete purchase text`, async () => {
            return this.playWrightFactory.getText(this.locators.completePurchaseHeader);
        })

    }
}
