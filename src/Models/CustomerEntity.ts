import { GenericEntityModel } from "./GenericEntity";

export interface CustomerEntityModel {
    id:number | undefined;
    customerId:number | undefined;
    address:string | undefined;
    paymentMethodId :number | undefined;
    netTermsId : number | undefined;
    VAT:number | undefined;
}