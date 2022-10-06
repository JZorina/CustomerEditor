import { Customer } from '../Models/Customer';
import {
  COUNTRIES_API,
  CURRENCIES_API,
  CUSTOMERS,
  CUSTOMER_BY_ID,
  CUSTOMER_ENTITIES_BY_ID,
  NET_TERMS,
  PAYMENT_METHODS,
} from './Paths';

export async function addCustomer(data: Customer) {
  const res = await fetch(CUSTOMERS, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}

export async function getAllCustomers() {
  const res = await fetch(CUSTOMERS);
  return res.json();
}

export async function getCustomerById(id: number) {
  const res = await fetch(
    CUSTOMER_ENTITIES_BY_ID.replace(':id', id.toString()),
  );
  return res.json();
}

export async function getUtils() {
  Promise.all([fetch(PAYMENT_METHODS), fetch(NET_TERMS)])
    .then(([paymentMethodResponse, netTermsResponse]) => {
      return Promise.all([
        paymentMethodResponse.json(),
        netTermsResponse.json(),
      ]);
    })
    .then(([paymentMethodsJSON, netTermsJSON]) => {
      return [paymentMethodsJSON, netTermsJSON];
    });
}

export async function deleteCustomerById(id: number) {
  await fetch(CUSTOMER_BY_ID.replace(':id', id.toString()), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function editCustomerById(data: Customer) {
  return await fetch(`${CUSTOMERS}/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getCountries() {
  return await fetch(COUNTRIES_API);
}

export async function getCurrencies() {
  debugger;
  return await fetch(CURRENCIES_API, {
    headers: {
      Authorization: 'Basic ' + btoa('yul51929458:60bmuhd03rtjmqm28mjoa38ab'),
    },
  });
}
