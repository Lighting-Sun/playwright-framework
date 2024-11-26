import { Page, TestInfo, test } from "@playwright/test";
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

    public async getSideMenuOptionByValue(strValue: string): Promise<any> {
        return await test.step(`returning side menu option with value ${strValue}`, async () => {
            return await this.playWrightFactory.getSelectorByValue(this.locators.sideMenuOption, strValue)
        })
    }

    public async clickOnSideMenuOptionByValue(strValue: string) {
        await test.step(`Selecting side menu option with value ${strValue}`, async () => {
            await this.playWrightFactory.click(await this.getSideMenuOptionByValue(strValue))
        })
    }
}
