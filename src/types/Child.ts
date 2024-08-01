export interface Child {
  first_name: string;
  last_name: string;
  birth_date: string;
  lived_whole_year: number;
  residence: {
    address: string;
    country: string;
    residence_period: {
      lower: string;
      upper: string;
    };
  };
}
