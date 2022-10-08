import { externalDataApiService } from './ExternalApiService';

const { getCountries, getCurrencies } = externalDataApiService;

async function fetchCountries() {
  let { data } = await getCountries();
  return data.map((item: any, index: number) => ({
    id: index,
    value: item.name.official,
    symbol: item.flags.svg,
    prefix: item.idd.root + item.idd.suffixes,
  }));
}

async function fetchCurrencies() {
  let { data } = await getCurrencies();
  return data.currencies.map((item: any, index: number) => ({
    id: index,
    value: item.currency_name,
    symbol: item.iso,
    prefix: null,
  }));
}

export async function fetchExternalData() {
  const [externalCountries, externalCurrencies] = await Promise.all([
    fetchCountries(),
    fetchCurrencies(),
  ]);
  return { externalCountries, externalCurrencies };
}
