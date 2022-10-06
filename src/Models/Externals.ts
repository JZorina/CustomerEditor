import { GenericEntityModel } from './Generics';

export interface Currency {
  iso: string;
  currency_name: string;
  is_obsolete: boolean;
}

export interface ExternalData {
  externalCountries: any[] | null;
  externalCurrencies: GenericEntityModel[] | null;
}
