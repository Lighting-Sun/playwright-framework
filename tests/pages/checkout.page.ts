import { Page, TestInfo } from "@playwright/test";
import BasePage from "./basePage"
import { Header } from "../components/header.component";

export class CheckoutPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    header = new Header(this._page, this._testInfo);

    locators = {
        firstNameInput: {
            selector: "#first-name",
            description: "first name input",
        },
        lastNameInput: {
            selector: "#last-name",
            description: "last name input",
        },
        postalCodeInput: {
            selector: "#postal-code",
            description: "postal code input",
        },
        continueButton: {
            selector: "#continue",
            description: "continue button",
        },
    };

}
