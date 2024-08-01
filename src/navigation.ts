import { Page } from 'playwright';
import { CERTIFICATE_PATH, PASSWORD } from './constants';

export const navigateAndLogin = async (page: Page): Promise<void> => {
  await page.goto('https://www.elster.de/eportal/login/softpse');
  await page.setInputFiles('#loginBox\\.file_cert', CERTIFICATE_PATH);
  await page.fill('#password', PASSWORD);
  await page.click('#bestaetigenButton');
  await page.waitForNavigation({ waitUntil: 'load', timeout: 30000 });

  const url = page.url();
  if (url.includes('/temporaereaufgaben')) {
    const exists = (await page.$('#temporaereaufgaben_nein_button')) !== null;
    if (exists) {
      await page.click('#temporaereaufgaben_nein_button');
    }
  } else if (url.includes('/meinelster')) {
    console.log('User redirected to meinelster page.');
  }

  await page.goto('https://www.elster.de/eportal/formulare-leistungen/alleformulare/est');
  await page.waitForSelector('#zeitraumJahr', { state: 'visible' });
};

export const selectYearAndProceed = async (page: Page, year: string): Promise<void> => {
  await page.evaluate(year => {
    const select = document.querySelector('#zeitraumJahr') as HTMLSelectElement;
    if (select) {
      select.value = `${year}-v1`;
      select.dispatchEvent(new Event('change'));
    }
  }, year);
  console.log(`Year ${year} selected`);

  await page.click('#Enter');
  console.log('Clicked Weiter button');

  const continueButton = await page.$('#Continue');
  if (continueButton) {
    await continueButton.click();
    console.log('Clicked Continue button');
  }
};

export const clickButton = async (page: Page): Promise<void> => {
  await page.click('button.treeView__item.treeView__item--button[data-selector="_treeView.requestCommander"][id="FormData://est-2023-v1/Startseite[0]/VHauptvordruck[0]/StpflPerson[0]"]');
  console.log('Clicked button to navigate to "Steuerpflichtige Person" section');
};
