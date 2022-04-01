import axios from 'axios';
import {appConfig} from '../../../appConfig';

export const api = axios.create({
  baseURL: appConfig.BASE_URL,
  headers: {
    'content-type': 'application/json',
    'X-API-KEY': appConfig.key,
  },
});

axios.interceptors.response.use(async response => {
  return response;
});
