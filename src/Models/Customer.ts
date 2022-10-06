export interface Customer {
  id?: number;
  name?: string;
  avatar?: string;
  email?: string;
  currency?: string;
  country?: string;
  state?: string;
  phoneNumberPrefix?: string;
  phoneNumber?: string;
  EIN?: string;
  Entities?: CustomerEntity[];
}

export interface CustomerEntity {
  id?: number;
  customerId?: number;
  address?: string;
  paymentMethodId?: number;
  netTermsId?: number;
  VAT?: number;
}
