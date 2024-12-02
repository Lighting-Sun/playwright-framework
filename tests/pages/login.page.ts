import { Header } from "../components/header.component";
import BasePage from "./basePage";
import { Page, TestInfo, test } from "@playwright/test"


export class LoginPage extends BasePage {

    private readonly _url: string;

    header = new Header(this._page, this._testInfo);

    locators = {
        loginButton: {
            selector: "#login-button",
            description: "login button for the saucedemo application",
        },
        usernameInput: {
            selector: "input[data-test='username']",
            description: "username input field",
        },
        passwordInput: {
            selector: "input[data-test='password']",
            description: "password input field",
        },
        loginErrorMessage: {
            selector: "h3[data-test='error']",
            description: "login error message",
        },
        loginLogo: {
            selector: "div.login_logo",
            description: "Swag Labs logo in login page",
        },
    };

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo)
        this._url = "https://www.saucedemo.com/"
    }

    public async openPage(): Promise<void> {
        await test.step(`Opening page ${this._url}`, async (): Promise<void> => {
            await this._page.goto(this._url);
        })
    }

    public async fillUsername(username: string): Promise<void> {
        await test.step(`filling username with value ${username}`, async () => {
            await this.playWrightFactory.setValue(this.locators.usernameInput, username);
        })
    }

    public async fillPassword(password: string): Promise<void> {
        await test.step(`filling username with value ${password}`, async () => {
            await this.playWrightFactory.setValue(this.locators.passwordInput, password);
        })
    }

    public async clickOnLoginBtn(): Promise<void> {
        await test.step(`clicking on login button`, async () => {
            await this.playWrightFactory.click(this.locators.loginButton);
        })
    }

    public async getLoginErrorMessage(): Promise<string | null> {
        return await test.step(`getting login error message`, async () => {
            const obtainedText: string | null = await this.playWrightFactory.getText(this.locators.loginErrorMessage)
            return obtainedText;
        })
    }

    public async getLoginLogoText(): Promise<string | null> {
        return await test.step(`getting login logo text`, async () => {
            const obtainedText: string | null = await this.playWrightFactory.getText(this.locators.loginLogo)
            return obtainedText;
        })
    }

    public async loginWithCredentials(strUsername: string, strPassword: string): Promise<void> {
        await this.fillUsername(strUsername);
        await this.fillPassword(strPassword);
        await this.clickOnLoginBtn();
    }
}
