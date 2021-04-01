import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import {Credentials} from '../types';

const headers = {
  'Content-Type': 'application/json',
};

export const login = async (credentials: Credentials) => {
  console.log(credentials);
  return await axios
    .post(
      `${API_URL}/auth/login`,
      {
        username: credentials.email,
        password: credentials.password,
      },
      {
        headers: headers,
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
