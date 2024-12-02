import { Page, TestInfo } from "@playwright/test";
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
}
