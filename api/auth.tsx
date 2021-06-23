import axios, {AxiosResponse} from 'axios';
import {SignupForm} from '../types';
import {registerForPushNotificationsAsync} from './notifications';
import {API_URL} from '../env';
import {Token} from '../screens/SignupScreen';

const headers = {
  'Content-Type': 'application/json',
};

type Credentials = {
  email: string;
  password: string;
};

export const login = async (
  credentials: Credentials,
): Promise<AxiosResponse> => {
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
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};

export const register = async (form: SignupForm, IDFiles): Promise<Token> => {
  const pushToken = await registerForPushNotificationsAsync();
  return await axios
    .post(
      `${API_URL}/auth/register`,
      {
        gender: form.gender,
        avatar: form.avatar,
        first_name: form.firstname,
        last_name: form.lastname,
        birthdate: form.birthdate,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
        description: form.description,
        IDRecto: IDFiles[0],
        IDVerso: IDFiles[1],
        location: form.location,
        pushToken: pushToken,
      },
      {
        headers: headers,
      },
    )
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const uploadID = async (IDRecto: string, IDVerso: string) => {
  const formData = new FormData();
  formData.append(
    'Files',
    JSON.parse(
      JSON.stringify({
        uri: IDRecto,
        type: 'image/jpeg',
        name: 'IDRecto.jpg',
      }),
    ),
  );
  formData.append(
    'Files',
    JSON.parse(
      JSON.stringify({
        uri: IDVerso,
        type: 'image/jpeg',
        name: 'IDVerso.jpg',
      }),
    ),
  );
  return await axios({
    url: `${API_URL}/auth/uploadID`,
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error from image :', error);
    });
};
