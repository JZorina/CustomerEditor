import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchExternalData } from '../Apis/ExternalApiHelpers';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { ExternalData } from '../Models/Externals';

const DataContext = createContext<ExternalData>({
  externalCountries: null,
  externalCurrencies: null,
});

type DataContextProps = React.PropsWithChildren<{}>;
export const ExternalDataProvider = ({ children }: DataContextProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchExternalData().then(setData);
  }, []);
  if (!data) return <LoadingSpinner />;
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useExternalData = () => {
  return useContext(DataContext);
};
