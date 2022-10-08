import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Customer as CustomerModel } from '../../Models/Customer';
import './Customer.css';
import { useNavigate } from 'react-router-dom';
import { words } from '../../Utils/Theme/Languages/En';
import CustomerList from '../../Components/CustomerList/CustomerList';
import { customerApiService } from '../../Apis/CustomerApiService';

const Customer = () => {
  const navigate = useNavigate();
  const [allCustomers, setAllCustomers] = useState<CustomerModel[] | null>(
    null,
  );
  const {
    mainPage: { addButtonContent },
  } = words;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const customersList = await customerApiService.getCustomers();
    setAllCustomers(customersList);
  };

  const addNewCustomer = () => {
    navigate('/CustomerEditor');
  };
  const deleteCustomer = async (id: string) => {
    await customerApiService.deleteCustomerById(id);
    await fetchCustomers();
  };
  const editCustomer = async (id: string) => {
    navigate(`/CustomerEditor/${id}`);
  };
  return (
    <div className="main">
      <>
        <div className="mainButtonContainer">
          <Button variant="contained" onClick={() => addNewCustomer()}>
            {addButtonContent}
          </Button>
        </div>
        <div className="mainListContainer">
          <CustomerList
            allCustomers={allCustomers}
            deleteCustomer={deleteCustomer}
            editCustomer={editCustomer}
          />
        </div>
      </>
    </div>
  );
};
export default Customer;
