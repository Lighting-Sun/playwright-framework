import { Page, TestInfo } from "@playwright/test";
import BasePage from "./basePage";
import test from "node:test";
import { Header } from "../components/header.component";


export class CompletePage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    header = new Header(this._page, this._testInfo);

}
