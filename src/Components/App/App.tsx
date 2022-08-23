import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Customer from '../../Pages/Customer/Customer';
import CustomerEditor from '../../Pages/CustomerEditor/CustomerEditor';
import { getCountries, getCurrencies } from '../../Services/ApiService';
import { useEffect, useState } from 'react';
import { DataProvider } from '../../Contexts/DataContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ExternalCurrency} from '../../Models/ExternalCurrency';
import { GenericEntityModel } from '../../Models/GenericEntity';

function App() {

  const [data, setData] = useState<{
  externalCountries:any[], externalCurrencies:GenericEntityModel[]}>({externalCountries:[],externalCurrencies:[]});
  const [displaySpinner, setSpinner] = useState<boolean>(true);
  useEffect(()=>{
    initApp();
  },[])

  const initApp = async () => {
    if(data.externalCountries.length == 0 && data.externalCurrencies.length == 0){
      let externalCountries: GenericEntityModel[] = []; 
      getCountries()
      .then(response => response.json())
      .then(json=>{
        json.map((item:any,index:number)=>{
          externalCountries.push({id:index, value: item.name.official,symbol:item.flags.svg})
        })
      });
      let externalCurrencies: GenericEntityModel[] = []; 
      getCurrencies()
      .then(response => response.json())
      .then(json=>{
        json.currencies.map((item:ExternalCurrency,index:number)=>{
          externalCurrencies.push({id:index, value: item.currency_name,symbol:item.iso})
        })
        setSpinner(false);
      });
      setData({externalCountries,externalCurrencies});
    }
  }
  return (
    
    <DataProvider value={data}>
      {displaySpinner ? (
      <LoadingSpinner />
      ) : (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/CustomerEditor" element={<CustomerEditor />} />
        <Route path="/CustomerEditor/:userId" element={<CustomerEditor />} />
      </Routes>
    </BrowserRouter>
     )}
  </DataProvider>
 );
}

export default App;
