import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const getClient = () => {
  const client = axios.create(prepareConfig());
  return client;
};
function prepareConfig(): AxiosRequestConfig {
  const token = fetchLocalTokenIfExists();
  console.log(`Found token in local: ${token}`);

  const requestHeader: AxiosRequestHeaders = {
    'Content-type': 'application/json',
  };
  if (token !== null) {
    requestHeader.Authorization = `Bearer ${fetchLocalTokenIfExists()}`;
  }

  return {
    baseURL: 'http://localhost:8079/',
    headers: requestHeader,
  };
}

export function fetchLocalTokenIfExists() {
  const tkn = localStorage.getItem('token');
  return tkn;
}

export default getClient;
