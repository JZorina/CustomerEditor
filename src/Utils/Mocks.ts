import { GenericEntityModel } from "../Models/GenericEntity";

export const paymentMethodsOptions:GenericEntityModel[] = [
    {
        id: 1,
        value: "credit card"
      },
      {
        id: 2,
       value: "bank transfer"
      }
];
export const netTermsOptions:GenericEntityModel[] = [
    {
        id: 1,
        value: "no trem"
    },
    {
        id: 2,
        value: "Net 30"
    },
    {
        id: 3,
        value: "Net 60"
    }
];
export const currencyOptions:GenericEntityModel[] = [
    {
        id: 1,
        value: "IL"
    },
    {
        id: 2,
        value: "USA"
    },
    {
        id: 3,
        value: "GBP"
    }
];
export const countryOptions:GenericEntityModel[] = [
    {
        id: 1,
        value: "Israel"
    },
    {
        id: 2,
        value: "Greece"
    },
    {
        id: 3,
        value: "Italy"
    }
];
