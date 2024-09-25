const { getNewContext } = require('./playwright');

const scrapeLogin = async (username, password) => {
  const { context, page } = await getNewContext();

  try {
    // Navigate to login page and perform login
    await page.goto('https://jinansystem.com/login.php');
    await page.fill('input[name="USER"]', username);
    await page.fill('input[name="PASS"]', password);
    await page.click('input.submit-buttons[type="submit"]');

    // Set custom timeout of 1 second (1000 ms) for this action only
    await page.waitForSelector('.table_main', { timeout: 1000 });

    // Return cookies and context to persist session for future requests
    return page;
  } catch (error) {
    // Close the context if an error occurs
    await context.close();
    throw error;
  }
};

module.exports = {
  scrapeLogin,
};
