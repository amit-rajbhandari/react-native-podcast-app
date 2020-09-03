import axios from 'axios';
import tokenService from '../services/token.service';
import {APIURL} from 'react-native-dotenv';
import {Alert} from 'react-native';

const request = axios.create({
  baseURL: APIURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default request;

// Add a request interceptor
request.interceptors.request.use(
  async function(config) {
    // Do something before request is sent
    config.headers.Authorization = 'Bearer ' + (await tokenService.getToken());
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      tokenService.clearToken();
    }
    return Promise.reject(error);
  },
);
