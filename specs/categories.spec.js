const { chromium } = require('playwright');
const { pageProvider } = require('../framework');
const chai = require('chai');
const expect = chai.expect
chai.use(require('chai-string'));

describe('OSHOP - MAIN PAGE TESTS', () => {
    let browser, page

    beforeEach(async () => {
        browser = await chromium.launch({headless: false, slowMo: 250 });
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://agular-test-shop-cb70d.firebaseapp.com/');
    })

    afterEach(async () => {
        await browser.close();
    })

    it("Verify 'All Categories' menu items", async () => {
        const mainPage = pageProvider(page).main();
        //await page.waitForTimeout(5000);
        expect(await mainPage.getSiteBrandName()).to.equal('Organic Shop Training Project')
    })

    const categoryMenus = ['Bread', 'Dairy', 'Fruits', 'Seasonings and Spices', 'Vegetables']
    categoryMenus.forEach(category => {
        it(`User select '${category}' category - items should be filetered by category`, async () => {
            const mainPage = pageProvider(page).main()
            await mainPage.selectCategory(`${category}`);

            //Assert
            let expectedEnding = null;
            if (category === 'Seasonings and Spices')
                expectedEnding = category.split(' ')[0].toLowerCase();
            else expectedEnding = category.toLowerCase();    

            expect(await page.url()).to.endsWith(`?category=${expectedEnding}`);
        })
    })    
})