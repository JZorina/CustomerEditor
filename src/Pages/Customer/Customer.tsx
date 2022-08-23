import React, { lazy, Suspense, useEffect, useState } from 'react';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import Button from '@mui/material/Button';
import { CustomerModel } from '../../Models/Customer';
import "./Customer.css";
import { useNavigate } from 'react-router-dom';
import { deleteCustomerById, getAllCustomers } from '../../Services/ApiService';
import { words } from '../../Utils/Texts';
const CustomersList = lazy(() => import("../../Components/CustomerList/CustomerList"));

const Customer = () => {
  const  navigate = useNavigate();
  const [allCustomers, setAllCustomers] = useState<CustomerModel[]>([]);
  const [displaySpinner, setSpinner] = useState<boolean>(true);
  const {mainPage:{AddButtonContent}} = words;

  useEffect(() => {
    fetchCustomers();
    }, []);
  
  const fetchCustomers = async () => {
    const customersList = await getAllCustomers();
    setAllCustomers(customersList);
    setSpinner(false);
  };

  const addNewCustomer = () => {
    navigate("/CustomerEditor");
  }
  const deleteCustomer = async (id:number) => {
    await deleteCustomerById(id);
    await fetchCustomers();
  }
  const editCustomer = async (id:number) => {
    navigate("/CustomerEditor/" + id);
  }
  return (
      <div className="main">
          {displaySpinner ? (
          <LoadingSpinner />
          ) : (
          <>
          <div className='mainButtonContainer'>
            <Button variant="contained" onClick = {() => addNewCustomer()}>{AddButtonContent}</Button>
          </div>
          <div className='mainListContainer'>
          <Suspense fallback={<LoadingSpinner />}>
            <CustomersList 
            allCustomers={allCustomers} 
            deleteCustomer = {deleteCustomer}
            editCustomer = {editCustomer}
            />
          </Suspense>
          </div>
        </>
    )}
  </div>
  )

}
export default Customer;