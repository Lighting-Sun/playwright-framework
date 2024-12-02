import { Header } from "../components/header.component";
import BasePage from "./basePage";
import { Page, TestInfo, test } from "@playwright/test"
import UtilsMethods from "../utils/utilsMethods.utils";


export class CartPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

}
