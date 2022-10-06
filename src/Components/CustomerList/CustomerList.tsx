import React from 'react';
import { Customer } from '../../Models/Customer';
import CustomerItem from '../CustomerItem/CustomerItem';
import List from '@mui/material/List';

interface Props {
  allCustomers: Customer[] | null;
  deleteCustomer: (id: number) => void;
  editCustomer: (id: number) => void;
}
const CustomerList: React.FC<Props> = ({
  allCustomers,
  editCustomer,
  deleteCustomer,
}) => {
  return (
    <div className="list">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {allCustomers?.map((customer) => {
          return (
            <CustomerItem
              key={customer.id}
              id={customer.id}
              name={customer.name}
              editCustomer={editCustomer}
              deleteCutomer={deleteCustomer}
            />
          );
        })}
      </List>
    </div>
  );
};

export default CustomerList;
