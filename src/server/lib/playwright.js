const { chromium } = require('playwright-chromium');

let browser;
let context;
let page;

const getBrowserInstance = async () => {
  if (!browser) {
    // Launch a persistent browser instance if it doesn't exist
    browser = await chromium.launch({ headless: true });

    // Set up an event to reset the browser on disconnect
    browser.on('disconnected', () => {
      browser = null;
      context = null;
      page = null;
    });
  }

  return browser;
};

const getNewContext = async () => {
  if (!context || !page) {
    const browser = await getBrowserInstance();

    // Reuse the same context and page if they already exist
    if (!context) {
      context = await browser.newContext();
    }

    if (!page) {
      page = await context.newPage();

      // Block unnecessary resources
      await page.route('**/*', (route) => {
        const resourceType = route.request().resourceType();
        if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
          return route.abort();
        }
        return route.continue();
      });
    }
  }

  return { context, page };
};

module.exports = {
  getNewContext,
};
