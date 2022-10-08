import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_ADDRESS } from '../Apis/Paths';

axios.defaults.baseURL = BASE_ADDRESS;

export const useAxios = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const operation = async (params: AxiosRequestConfig<any>) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, operation };
};

export default useAxios;
