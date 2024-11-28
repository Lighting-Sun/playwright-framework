import { Header } from "../components/header.component";
import basePage from "./basePage";
import { Page, TestInfo, test } from "@playwright/test"


export class LoginPage extends basePage {

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
            this._testInfo.attach(`Opening page ${this._url}`, {
                body: `Opening page ${this._url}`,
                contentType: "text/plain"
            })
        })
    }

    public async fillUsername(username: string): Promise<void> {
        await test.step(`filling username with value ${username}`, async () => {
            await this.playWrightFactory.setValue(this.locators.usernameInput, username);
            this._testInfo.attach(`filling username with value ${username}`, {
                body: `filling username with value ${username}`,
                contentType: "text/plain"
            })
        })
    }

    public async fillPassword(password: string): Promise<void> {
        await test.step(`filling username with value ${password}`, async () => {
            await this.playWrightFactory.setValue(this.locators.passwordInput, password);
            this._testInfo.attach(`filling username with value ${password}`, {
                body: `filling username with value ${password}`,
                contentType: "text/plain"
            })
        })
    }

    public async clickOnLoginBtn(): Promise<void> {
        await test.step(`clicking on login button`, async () => {
            await this.playWrightFactory.click(this.locators.loginButton);
            this._testInfo.attach(`clicking on login button`, {
                body: `clicking on login button`,
                contentType: "text/plain"
            })
        })
    }

    public async getLoginErrorMessage(): Promise<string | null> {
        return await test.step(`getting login error message`, async () => {
            const obtainedText: string | null = await this.playWrightFactory.getText(this.locators.loginErrorMessage)
            this._testInfo.attach(`Getting error message`, {
                body: `Getting loggin error message`,
                contentType: "text/plain"
            })
            return obtainedText;
        })
    }

    public async getLoginLogoText(): Promise<string | null> {
        return await test.step(`getting login logo text`, async () => {
            const obtainedText: string | null = await this.playWrightFactory.getText(this.locators.loginLogo)
            this._testInfo.attach(`getting login logo text`, {
                body: `getting login logo text`,
                contentType: "text/plain"
            })
            return obtainedText;
        })
    }
}
