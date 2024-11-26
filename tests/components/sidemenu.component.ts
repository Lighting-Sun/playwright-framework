import { Page, TestInfo } from "@playwright/test";
import { BaseComponent } from "./base.component";

export class SideMenu extends BaseComponent {

    locators = {
        sideMenuOption:
        {
            selector: "//a[@class='bm-item menu-item'][text()='${value}']",
            description: "side menu option '${value}'"
        }
    };

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }
}
