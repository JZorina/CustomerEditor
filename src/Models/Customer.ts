import { CustomerEntityModel } from "./CustomerEntity";

export interface CustomerModel {
    id?:number | undefined;
    name:string | undefined;
    avatar?:string | undefined;
    email:string | undefined;
    currency:string | undefined;
    country:string | undefined;
    state:string | undefined;
    phoneNumberPrefix:string | undefined;
    phoneNumber:string | undefined;
    EIN:string | undefined;
    Entities?:CustomerEntityModel[] | undefined;
}
