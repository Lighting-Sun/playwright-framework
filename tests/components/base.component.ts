import { Page, TestInfo } from "@playwright/test";
import { PlaywrightFactory } from "../utils/playwrightFactory.utils";

class BaseComponent {

    protected readonly _page: Page;
    protected readonly _testInfo: TestInfo;
    protected readonly playWrightFactory: PlaywrightFactory;

    constructor(page: Page, testInfo: TestInfo) {
        this._page = page;
        this._testInfo = testInfo;
        this.playWrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    }

}

