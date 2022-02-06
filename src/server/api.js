import axios from 'axios';

const request = (tokenExternal) => {
  const baseURL = 'http://api.payslip.devmaykinho.click/api/';
    
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenExternal}`,
      'Access-Control-Allow-Origin': '*',
    },
  };

  return {
    get: async (url, payload = {}) => await axios.get(baseURL + url, { ...payload, ...options }),
    post: async (url, payload) => await axios.post(baseURL + url, payload, options),
    put: async (url, payload) => await axios.put(baseURL + url, payload, options),
    delete: async (url, payload = {}) => await axios.delete(baseURL + url, { ...payload, ...options }),
  };
};

export const downloadRequest = (tokenExternal) => {
  const baseURL = 'http://api.payslip.devmaykinho.click/api/';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${tokenExternal}`,
      'Access-Control-Allow-Origin': '*',
      responseType: 'blob',
    },
    responseType: 'blob',
  };
  return async (url) => await axios.get(baseURL + url, options);
};

export default request;
