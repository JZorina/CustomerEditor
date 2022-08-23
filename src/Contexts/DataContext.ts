import React from 'react'
const DataContext = React.createContext<{externalCountries:any[], externalCurrencies:any[]}>({externalCountries:[],externalCurrencies:[]})
export const DataProvider = DataContext.Provider
export default DataContext;

