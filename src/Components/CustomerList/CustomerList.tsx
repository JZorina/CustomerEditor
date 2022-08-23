import React from "react";
import { CustomerModel } from "../../Models/Customer";
import CustomerItem from "../CustomerItem/CustomerItem";
import List from '@mui/material/List';

interface Props {
    allCustomers: CustomerModel[];
    deleteCustomer :(id:number)=>void;
    editCustomer :(id:number)=>void;
}
const CustomerList: React.FC<Props> = ({allCustomers, editCustomer, deleteCustomer}) => {
  const renderCustomers = () => {
    return(  
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}> 
     {allCustomers.map(customer => {
      return <CustomerItem
          key={customer.id}
          id={customer.id}
          name={customer.name}
          editCustomer={editCustomer}
          deleteCutomer={deleteCustomer}
        />
     })}
    </List>
  )}
  return(<div className="list">{renderCustomers()}</div>);
};

export default React.memo(CustomerList);
