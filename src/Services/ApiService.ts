import { CustomerModel } from "../Models/Customer";
import { BASE_ADDRESS, COUNTRIES_API, CURRENCIES_API } from "../Utils/Consts";


export const addCustomer = async (data:CustomerModel) => {
    const res = await fetch(BASE_ADDRESS+"customers",{
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          },
    })
    return res.json();
}
export const getAllCustomers = async () => {
    const res =  await fetch(BASE_ADDRESS + "customers",{method:'GET'})
    return res.json();
}
export const getCustomerById = async (id:number) => {
    const res = await fetch(BASE_ADDRESS + "customers/:id?_embed=customersEntities".replace(':id',id.toString()),{method:'GET'});
    return res.json();
}
export const getUtils = async () => {
    const paymentMethods = await fetch(BASE_ADDRESS + "paymentMethods",{method:'GET'});
    const netTerms = await fetch(BASE_ADDRESS + "netTerms",{method:'GET'});
    return [paymentMethods, netTerms];
}
export const deleteCustomerById = async (id:number) => {
    const res = await fetch(BASE_ADDRESS + "customers/" + id,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
      }
    });
}
export const editCustomerById = async (data:CustomerModel) => {
    const res = await fetch(BASE_ADDRESS + "customers/" + data.id,{
        method:'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
      }
    });
    return res;
}
export const getCountries = async () =>{
    const res = await fetch(COUNTRIES_API,{
        method:'GET'
    })
    return res;
};
export const getCurrencies = async () =>{
    const res = await fetch(CURRENCIES_API,{
        method:'GET',
        headers:{
            'Authorization': 'Basic '+btoa('yuli593137896:gebr3hlanis69odosegv5m4u09'),
        }
    })
    return res;
};