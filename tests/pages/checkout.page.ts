import { Page, TestInfo } from "@playwright/test";
import BasePage from "./basePage"
import { Header } from "../components/header.component";

export class CheckoutPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    header = new Header(this._page, this._testInfo);


}
