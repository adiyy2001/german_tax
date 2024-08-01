import { Page } from 'playwright';
import { Person } from './types/Person';
import { formatToGermanDate } from './utils';

export const handleCheckboxes = async (page: Page, person: Person): Promise<void> => {
  if (person.children?.length > 0) await page.check('#VAnlageKind');
  if (person.deductions.double_household.length > 0) await page.check('#VAnlageNDHH');
  if (person.deductions.other_costs.bank_costs.length > 0) await page.check('#VAnlageV');
};

export const fillPersonDetails = async (page: Page, person: { first_name: string; last_name: string }, prefix: string): Promise<void> => {
  await page.fill(`#grundangaben\\(0\\)_fields\\(${prefix}Vorname\\)`, person.first_name);
  await page.fill(`#grundangaben\\(0\\)_fields\\(${prefix}Name\\)`, person.last_name);
};

export const fillAdditionalDetails = async (page: Page, person: Person): Promise<void> => {
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0100201\\)`, person.first_name);
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0100301\\)`, person.last_name);
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0100401\\)`, formatToGermanDate(person.birth_date));
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0101104\\)`, person.street);
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0101206\\)`, person.house_number.replace(/\D/g, ''));
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0101301\\)`, person.street || '');
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0100601\\)`, person.postal_code.replace('-', ''));
  await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0100602\\)`, person.city);

  if (person.spouses) {
    await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0100701\\)`, formatToGermanDate(person.date_of_marriage));
  }

  if (person.country !== 'DE') {
    await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0101405\\)`, person.postal_code.replace('-', ''));
    await page.fill(`#Startseite\\(0\\)_VHauptvordruck\\(0\\)_StpflPerson\\(0\\)_fields\\(eruESt1AAllgAE0101403\\)`, person.country);
  }
};
