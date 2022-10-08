import axios from 'axios';
import { BASE_ADDRESS, COUNTRIES_API, CURRENCIES_API } from './Paths';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const mainAxios = axios.create({
  baseURL: BASE_ADDRESS,
});

const countriesAxios = axios.create({
  baseURL: COUNTRIES_API,
});

const currenciesAxios = axios.create({
  baseURL: CURRENCIES_API,
  headers: {
    Authorization: 'Basic ' + btoa('yuli143312240:d5sptsf1am0u8ufun56v501lk4'),
  },
});

export { mainAxios, countriesAxios, currenciesAxios };
