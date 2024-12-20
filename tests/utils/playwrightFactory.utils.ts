
import { test, expect, Page, TestInfo, Locator } from "@playwright/test"

export class PlaywrightFactory {
    private readonly _page: Page;
    private readonly _testInfo: TestInfo;

    /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

    constructor(page: Page, testInfo: TestInfo) {
        this._page = page;
        this._testInfo = testInfo;

    }

    public async click(objElement: { selector: string, description: string }): Promise<void> {
        const elementSelector: Locator = this._page.locator(objElement.selector);
        const elementDescription: string = objElement.description;
        await test.step(`🥾 ${elementDescription} is clicked `, async (): Promise<void> => {
            await elementSelector.scrollIntoViewIfNeeded();
            await elementSelector.click();
            await this._testInfo.attach(`🥾 ${elementDescription} is clicked `, {
                body: `🥾 ${elementDescription} is clicked `,
                contentType: "text/plain"
            })
        })
    }

    public async getSelectorByValue(objElement: { selector: string, description: string }, strValue: string): Promise<any> {
        const elementSelector: string = await objElement.selector.replace('${value}', strValue);
        const elementDescription: string = await objElement.description.replace('${value}', strValue);
        await test.step(`🥾 getting element dynamic selector with value ${elementDescription} `, async (): Promise<void> => {
            await this._testInfo.attach(`🥾 getting element dynamic selector with value ${elementDescription} `, {
                body: `🥾 getting element dynamic selector with value ${elementDescription} with locator ${elementSelector}`,
                contentType: "text/plain"
            })
        })
        return {
            selector: elementSelector,
            description: elementDescription
        };
    }

    public async setValue(objElement: { selector: string, description: string }, strValueToSend: string): Promise<void> {
        const elementSelector: Locator = this._page.locator(objElement.selector);
        const elementDescription: string = objElement.description;
        await test.step(`🥾 setting value for element ${elementDescription} with value: ${strValueToSend}`, async (): Promise<void> => {
            await elementSelector.scrollIntoViewIfNeeded();
            await this.click(objElement);
            await elementSelector.fill(strValueToSend);
            await this._testInfo.attach(`🥾 setting value for element ${elementDescription} with value: ${strValueToSend}`, {
                body: `🥾 setting value for element ${objElement.description} with value: ${strValueToSend}`,
                contentType: "text/plain"
            })
        });
    }

    public async getText(objElement: { selector: string, description: string }): Promise<string | null> {
        const elementSelector: Locator = this._page.locator(objElement.selector);
        const elementDescription: string = objElement.description;
        const textFromElement: string | null = await elementSelector.textContent();
        await test.step(`🥾 Got text from ${elementDescription} with value: ${textFromElement}`, async (): Promise<void> => {
            await this._testInfo.attach(`🥾 Got text from ${elementDescription} with value: ${textFromElement}`,
                {
                    body: `🥾 Got text from ${elementDescription} with value: ${textFromElement}`,
                    contentType: "text/plain"
                }
            )
        });
        return textFromElement;
    }

    public async waitForDomLoad(): Promise<void> {
        await this._page.waitForLoadState('domcontentloaded')
    }

    public async getElements(objElements: { selector: string, description: string }): Promise<Locator[]> {

        await this.waitForDomLoad();
        const elementsSelector: Promise<Locator[]> = this._page.locator(objElements.selector).all();
        await test.step(`🥾 Selecting elements of ${objElements.description}`, async () => {
            await this._testInfo.attach(`🥾 selecting elements of ${objElements.description}`, {
                body: `🥾 Selecting elements of ${objElements.description} using locator: ${objElements.selector}`,
                contentType: "text/plain"
            })
        })
        return elementsSelector;
    }

    public async getTextFromElements(objElements: { selector: string, description: string }): Promise<(string | null)[]> {
        const elements: Locator[] = await this.getElements(objElements);
        const elementsText: (string | null)[] = await Promise.all(elements.map(async element => await element.textContent()));
        await test.step(`🥾 Got text from ${objElements.description}`, async () => {
            await this._testInfo.attach(`🥾 Got text from ${objElements.description}`, {
                body: `🥾 Got text from ${objElements.description} using locator: ${objElements.selector}`,
                contentType: "text/plain"
            })
        })
        return elementsText;
    }

    public async selectOptionFromSelect(objElement: { selector: string, description: string }, strValue: string): Promise<void> {
        const elementSelector: Locator = this._page.locator(objElement.selector);
        const elementDescription: string = objElement.description;

        await test.step(`🥾 Select ${elementDescription} with option ${strValue} was clicked`, async (): Promise<void> => {
            await elementSelector.scrollIntoViewIfNeeded();
            await elementSelector.selectOption(strValue);
            await this._testInfo.attach(`🥾 Select ${elementDescription} with option ${strValue} was clicked`, {
                body: `🥾 Select ${elementDescription} with option ${strValue} was clicked`,
                contentType: "text/plain"
            })
        })
    }

    public async clickAllIfExists(objElement: { selector: string, description: string }): Promise<void> {
        let elementSelector: Locator = this._page.locator(objElement.selector).first();
        let elementDescription = objElement.description;
        await test.step(`🥾 Clicking all ${elementDescription} elements `, async () => {
            let elementCount: number = await this._page.locator(objElement.selector).count();
            while (elementCount > 0) {
                await elementSelector.click();
                elementSelector = this._page.locator(objElement.selector).first();
                elementCount = await this._page.locator(objElement.selector).count();
            }
            await this._testInfo.attach(`🥾 all elements ${objElement.description} were clicked`, {
                body: `🥾 all elements ${objElement.description} were clicked`,
                contentType: "text/plain"
            })
        })
    }
}
