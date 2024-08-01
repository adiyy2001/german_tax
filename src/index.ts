import { chromium, Browser, Page } from 'playwright';
import fs from 'fs';
import { CERTIFICATE_PATH, PASSWORD, RESPONSE_PATH } from './constants';
import { Person } from './types/Person';
import { navigateAndLogin, selectYearAndProceed, clickButton } from './navigation';
import { fillPersonDetails, fillAdditionalDetails, handleCheckboxes } from './pageUtils';
import { formatToGermanDate } from './utils';

const responseData: Person[] = JSON.parse(fs.readFileSync(RESPONSE_PATH, 'utf-8'));
const personA: Person = responseData[0];

const fillForm = async (page: Page, personA: Person): Promise<void> => {
  await fillPersonDetails(page, personA, 'eruPersonA');

  if (personA.spouses) {
    await fillPersonDetails(page, personA.spouses, 'eruPersonB');
  }

  await page.click('#ExitWizard');
  console.log('Clicked Ohne Anlagenassistent fortfahren button');
};

(async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page: Page = await context.newPage();

  try {
    console.log('Navigating to login page...');
    await navigateAndLogin(page);
    console.log('Login successful');

    console.log('Navigating to form page and setting the year...');
    await selectYearAndProceed(page, personA.year);
    console.log('Year set and proceeded to the form.');

    console.log('Filling the form with data from response.json...');
    await fillForm(page, personA);
    console.log('Form filled and clicked Ohne Anlagenassistent fortfahren.');

    console.log('Handling checkboxes...');
    await handleCheckboxes(page, personA);
    console.log('Checkboxes handled according to response.json data.');

    console.log('Selecting attachments and proceeding...');
    await page.click('#Continue');
    console.log('Attachments selected and proceeded to the next page.');

    console.log('Clicking button to navigate to "Steuerpflichtige Person" section...');
    await clickButton(page);
    console.log('Navigated to "Steuerpflichtige Person" section.');

    console.log('Filling additional details...');
    await fillAdditionalDetails(page, personA);
    console.log('Additional details filled.');
  } catch (err) {
    console.error('Error during:', err);
  } finally {
    // await browser.close();
  }
})();
