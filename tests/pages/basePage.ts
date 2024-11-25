import {Page, TestInfo} from "@playwright/test"
import { PlaywrightFactory } from "../utils/playwrightFactory.utils"


/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

export default class basePage {

    private readonly _page: Page;
    private readonly _testInfo: TestInfo;
    playWrightFactory : PlaywrightFactory;

    constructor(page: Page, testInfo: TestInfo){
        this._page = page;
        this._testInfo = testInfo;
        this.playWrightFactory = new PlaywrightFactory(this._page,this._testInfo);
    }

    async open(path: string){
        await this._page.goto(path);
    }
}
