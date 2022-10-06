import { getCountries, getCurrencies } from '../Apis/Api';
import { Currency } from '../Models/Externals';

export function validateAmericanEIN(value: string, state: string) {
  let [country] = value.split('-');
  let inputState = state?.toLowerCase().trim();
  if (inputState) {
    return (
      Object.keys(states).includes(inputState) &&
      states[inputState].includes(country)
    );
  }
  return false;
}
const states: any = {
  massachusetts: ['10', '12'],
  andover: ['10', '12'],
  atlanta: ['60', '67'],
  austin: ['50', '53'],
  newyork: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '11',
    '13',
    '14',
    '16',
    '21',
    '22',
    '23',
    '25',
    '34',
    '51',
    '52',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '65',
  ],
  brookhaven: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '11',
    '13',
    '14',
    '16',
    '21',
    '22',
    '23',
    '25',
    '34',
    '51',
    '52',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '65',
  ],
  cincinnati: ['30', '32', '35', '36', '37', '38', '61'],
  fresno: ['15', '24'],
  kansascity: ['40', '44'],
  memphis: ['94', '95'],
  utah: ['80', '90'],
  ogden: ['80', '90'],
  philadelphia: [
    '33',
    '39',
    '41',
    '42',
    '43',
    '48',
    '62',
    '63',
    '64',
    '66',
    '68',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '91',
    '92',
    '93',
    '98',
    '99',
  ],
  internet: ['20', '26', '27', '45', '46', '47', '81'],
  sba: ['31'],
};

function fetchCountries() {
  return getCountries()
    .then((response) => response.json())
    .then((countries) =>
      countries.map((item: any, index: number) => ({
        id: index,
        value: item.name.official,
        symbol: item.flags.svg,
        prefix: item.idd.root + item.idd.suffixes,
      })),
    );
}

function fetchCurrencies() {
  return getCurrencies()
    .then((response) => response.json())
    .then((json) =>
      json.currencies.map((item: any, index: number) => ({
        id: index,
        value: item.currency_name,
        symbol: item.iso,
        prefix: '',
      })),
    );
}

export function fetchExternalData() {
  return Promise.all([fetchCountries(), fetchCurrencies()]).then(
    ([externalCountries, externalCurrencies]) => ({
      externalCountries,
      externalCurrencies,
    }),
  );
}
