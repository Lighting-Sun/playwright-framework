import { Page, TestInfo, test } from "@playwright/test";
import { BaseComponent } from "./base.component";


class Header extends BaseComponent {


    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    locators = {
        burgerMenuBtn: {
            selector: ".bm-burger-button",
            description: "burger menu button that opens a sidebar menu",
        },
        shoppingCartBtn: {
            selector: "#shopping_cart_container",
            description: "username input field",
        },
        pageTitle: {
            selector: "span.title",
            description: "title located in the header, indicating in which page we are on",
        },
        sortFilterDropdown: {
            selector: "select.product_sort_container",
            description: "sort filter dropdown",
        },
        selectDropdownOption: {
            selector: "select option[value='${value}']",
            description: "'${value}' select option",
        }
    };

    public async getPageTitleText(): Promise<string | null> {
        return await test.step(`Getting page title text`, async () => {
            const headerPageTitle: (string | null) = await this.playWrightFactory.getText(this.locators.pageTitle);
            return headerPageTitle;
        })
    }

    public async clickOnBurgerMenuBtn(): Promise<void> {
        await test.step(`Clicking on burger button`, async () => {
            await this.playWrightFactory.click(this.locators.burgerMenuBtn);
        })
    }

    public async clickOnSortFilterDropdownOption(strValue: string) {
        await test.step(`Clicking on sort dropdown with value ${strValue}`, async () => {
            await this.playWrightFactory.click(this.locators.sortFilterDropdown);
            await this.playWrightFactory.selectOptionFromSelect(this.locators.sortFilterDropdown, strValue);
        })
    }

    public async clickOnShoppingCartBtn() {
        await test.step(`Clicking on shopping cart button`, async () => {
            await this.playWrightFactory.click(this.locators.shoppingCartBtn);
        })
    }

}