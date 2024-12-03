import { Page, TestInfo, test } from "@playwright/test";
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


    public async fillFirstName(firstName: string): Promise<void> {
        await test.step(`Filling first name for checkout`, async () => {
            await this.playWrightFactory.setValue(this.locators.firstNameInput, firstName);
        });
    }

    public async fillLastName(lastName: string): Promise<void> {
        await test.step(`Filling first name for checkout`, async () => {
            await this.playWrightFactory.setValue(this.locators.lastNameInput, lastName);
        });
    }

    public async fillPostalCode(postalCode: string): Promise<void> {
        await test.step(`Filling postal code for checkout`, async () => {
            await this.playWrightFactory.setValue(this.locators.postalCodeInput, postalCode);
        });
    }

    public async clickContinueButton(): Promise<void> {
        await test.step(`Clicking on continue button`, async () => {
            await this.playWrightFactory.click(this.locators.continueButton);
        });
    }

    public async fillPersonalInformationForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await test.step(`Filling personal information form`, async () => {
            await this.fillFirstName(firstName);
            await this.fillLastName(lastName);
            await this.fillPostalCode(postalCode);
        });
    }
}
