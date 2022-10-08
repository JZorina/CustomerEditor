import { countriesAxios, currenciesAxios } from './configs';
import { COUNTRIES_API, CURRENCIES_API } from './Paths';

export const externalDataApiService = {
  async getCountries() {
    return await countriesAxios.get(COUNTRIES_API);
  },

  async getCurrencies() {
    return await currenciesAxios.get(CURRENCIES_API);
  },
};
