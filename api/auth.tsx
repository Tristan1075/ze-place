import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import {Credentials, SignupForm} from '../types';

const headers = {
  'Content-Type': 'application/json',
};

export const login = async (credentials: Credentials) => {
  
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
      return Promise.reject(err.response.data);
    });
};

export const register = async (form: SignupForm) => {
  console.log(API_URL);
  return await axios
    .post(
      `${API_URL}/auth/register`,
      {
        avatar: form.avatar,
        first_name: form.firstname,
        last_name: form.lastname,
        birthdate: form.birthdate,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
        description: form.description,
      },
      {
        headers: headers,
      },
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return Promise.reject(err);
    });
};
