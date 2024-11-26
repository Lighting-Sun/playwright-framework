import basePage from "./basePage";
import {Page, TestInfo, test} from "@playwright/test"


class LoginPage extends basePage {

    private readonly _url: string;

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

    constructor (page: Page, testInfo: TestInfo){
        super(page, testInfo)
        this._url = "https://www.saucedemo.com/"
    }

    public async openPage() : Promise<void> {
        test.step(`Opening page ${this._url}`, async () : Promise<void> => {
            await this._page.goto(this._url);
            this._testInfo.attach(`Opening page ${this._url}`,{
                body:`Opening page ${this._url}`,
                contentType: "text/plain"
            })
        })
    }

    public async fillUsername (username: string): Promise<void>{
        test.step(`filling username with value ${username}`, async () => {
            await this.playWrightFactory.setValue(this.locators.usernameInput,username);
            this._testInfo.attach(`filling username with value ${username}`,{
                body: `filling username with value ${username}`,
                contentType: "text/plain"
            })
        })
    }

    public async fillPassword (password: string): Promise<void>{
        test.step(`filling username with value ${password}`, async () => {
            await this.playWrightFactory.setValue(this.locators.usernameInput,password);
            this._testInfo.attach(`filling username with value ${password}`,{
                body: `filling username with value ${password}`,
                contentType: "text/plain"
            })
        })
    }

    public async clickOnLoginBtn (): Promise<void>{
        test.step(`clicking on login button`, async () => {
            await this.playWrightFactory.click(this.locators.loginButton);
            this._testInfo.attach(`clicking on login button`,{
                body: `clicking on login button`,
                contentType: "text/plain"
            })
        })
    }
}
