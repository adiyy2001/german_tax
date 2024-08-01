export interface DoubleHousehold {
  household_postal_code: string;
  household_city: string;
  household_country: string;
  household_date_from: string;
  residence_at_place_of_employment_postal_code: string;
  residence_at_place_of_employment_city: string;
  period_of_residence_at_place_of_employment: {
    lower: string;
    upper: string;
  };
  residence_at_place_of_employment_costs: string;
}
