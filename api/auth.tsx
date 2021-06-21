import axios, {AxiosResponse} from 'axios';
import {SignupForm} from '../types';
import {registerForPushNotificationsAsync} from './notifications';
import {API_URL} from '../env';

const headers = {
  'Content-Type': 'application/json',
};

type Credentials = {
  email: string;
  password: string;
};

export const login = async (credentials: Credentials) => {
  console.log(API_URL);
  
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
  const pushToken = await registerForPushNotificationsAsync();
  console.log(form);
  
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
        pushToken: pushToken,
      },
      {
        headers: headers,
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return Promise.reject(err);
    });
};
