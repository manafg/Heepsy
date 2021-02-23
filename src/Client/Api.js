import axios from 'axios';

var Client = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 5000,
    headers: {
      Accept: 'application/json;charset=UTF-8',
  },
  });
  //ss
 export default Client;