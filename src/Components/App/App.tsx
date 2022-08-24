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
import { ExternalData } from '../../Models/ExternalData';

function App() {
  let externalCountries: GenericEntityModel[]
  let externalCurrencies: GenericEntityModel[]
  const [data, setData] = useState<ExternalData>({externalCountries:[],externalCurrencies:[]});
  const [displaySpinner, setSpinner] = useState<boolean>(true);
  useEffect(()=>{
    initApp();
  },[])

  const initApp = async () => {
    if(data.externalCountries.length == 0 && data.externalCurrencies.length == 0){
      getCountries()
      .then(response => response.json())
      .then(json=>{
         externalCountries = json.map((item:any,index:number)=>({
          id:index, 
          value: item.name.official,
          symbol:item.flags.svg, 
          prefix:item.idd.root+item.idd.suffixes
        }))
        setData({externalCountries,externalCurrencies});
      });
      getCurrencies()
      .then(response => response.json())
      .then(json=>{
        externalCurrencies = json.currencies.map((item:ExternalCurrency,index:number)=>({
          id:index, value: item.currency_name,symbol:item.iso
        }))
        setData({externalCountries,externalCurrencies});
        console.log(externalCurrencies)
        setSpinner(false);
      });

      
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
