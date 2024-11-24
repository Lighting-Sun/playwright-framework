
import {test, expect, Page, TestInfo, Locator} from "@playwright/test"

export class PlaywrightFactory {
    private readonly _page: Page;
    private readonly _testInfo: TestInfo;

    /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

    constructor(page: Page, testInfo:TestInfo){
        this._page = page;
        this._testInfo = testInfo;

    }

    public async click(objElement: {selector: string, description: string}): Promise<void>{
        const elementSelector: Locator = this._page.locator(objElement.selector);
        const elementDescription: string = objElement.description;
        await test.step ( `🥾 ${elementDescription} is clicked `, async (): Promise<void> =>  {
            await elementSelector.scrollIntoViewIfNeeded();
            await elementSelector.click();
            await this._testInfo.attach(`🥾 ${elementDescription} is clicked `,{
                body:`🥾 ${elementDescription} is clicked `,
                contentType: "text/plain"
            })
        })
    }

    public async getSelectorByValue(objElement: {selector: string, description: string}, strValue: string): Promise<any>{
        const elementSelector: string = await objElement.selector.replace('${value}', strValue);
        const elementDescription: string = await objElement.description.replace('${value}', strValue);
        await test.step(`🥾 getting element dynamic selector with value ${elementDescription} `, async (): Promise<void> => {
            await this._testInfo.attach(`🥾 getting element dynamic selector with value ${elementDescription} `,{
                body:`🥾 getting element dynamic selector with value ${elementDescription} with locator ${elementSelector}`,
                contentType: "text/plain"
            })
        })
        return {
            selector: elementSelector,
            description: elementDescription
        };
    }

    public async setValue(objElement: {selector: string, description: string},strValueToSend: string): Promise<void> {
        const elementSelector: Locator = this._page.locator(objElement.selector);
        const elementDescription: string = objElement.description;
        await test.step(`🥾 setting value for element ${elementDescription} with value: ${strValueToSend}`, async (): Promise<void> =>{
            await elementSelector.scrollIntoViewIfNeeded();
            await elementSelector.fill(strValueToSend);
            await this._testInfo.attach(`🥾 setting value for element ${elementDescription} with value: ${strValueToSend}`,{
                body: `🥾 setting value for element ${objElement.description} with value: ${strValueToSend}`,
                contentType: "text/plain"
            })
        });
    }

    public async getText(objElement: {selector: string, description: string}): Promise<string | null> {
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

    public async waitForDomLoad() : Promise<void> {
        await this._page.waitForLoadState('domcontentloaded')
    }

    async getElements(objElements: {selector: string, description: string}): Promise<Locator[]> {
        await this.waitForDomLoad();
        const elementsSelector: Promise<Locator[]> = this._page.locator(objElements.selector).all();
        return elementsSelector;
    }
}
