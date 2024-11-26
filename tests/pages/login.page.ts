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
}
