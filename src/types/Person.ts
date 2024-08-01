import { Child } from './Child';
import { Spouse } from './Spouse';

export interface Person {
  disable_validation: boolean;
  first_name: string;
  last_name: string;
  country: string;
  street: string;
  city: string;
  postal_code: string;
  house_number: string;
  birth_date: string;
  date_of_marriage: string;
  date_of_divorce: string;
  iban: string;
  year: string;
  spouses?: Spouse;
  deductions: Deductions;
  children: Child[]; // Nowe pole
}
