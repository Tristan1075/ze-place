import {Place, SignupForm, User} from '../types';
import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';

export const getUser = async (): Promise<User> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getUserById = async (id: string) => {
  console.log(`${API_URL}/customers/${id}`);
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const modifyUser = async (form: SignupForm, id: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log('form', form);
  const url = `${API_URL}/customers/update?customerID=${id}`;
  await axios
    .put(
      url,
      //"http://localhost:3000/customers/update?id=609147e8d9812e8d373f0846",
      //"http://localhost:3000/auth/register",
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const addFavorite = async (place: Place) => {
  const token = await SecureStore.getItemAsync('access-token');
  await axios
    .post(`${API_URL}/customers/favorite/create`, place, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const removeFavorite = async (place: Place) => {
  const token = await SecureStore.getItemAsync('access-token');
  await axios
    .delete(`${API_URL}/customers/favorite/delete/${place._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getFavorites = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  const user = await getUser();
  const url = `${API_URL}/customers/favorite?customerID=${user._id}`;
  console.log(url);
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getActivePromos = async () => {
  const token = await SecureStore.getItemAsync('access-token');

  const user = await getUser();
  const promoId = user.promoCode;
  console.log(promoId);

  const url = `${API_URL}/promo/getSevralCode`;

  return await axios
    .post(
      url,
      //"http://localhost:3000/customers/update?id=609147e8d9812e8d373f0846",
      //"http://localhost:3000/auth/register",
      {
        code: promoId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);

      return Promise.reject(err);
    });
};
export const getInnactivePromos = async () => {
  const token = await SecureStore.getItemAsync('access-token');

  const user = await getUser();
  const promoId = user.historyCode;
  console.log(promoId);

  const url = `${API_URL}/promo/getSevralCode`;

  return await axios
    .post(
      url,
      {
        code: promoId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);

      return Promise.reject(err);
    });
};

export const addPromoCode = async (promoTitle: string) => {
  const token = await SecureStore.getItemAsync('access-token');

  const user = await getUser();
  const url = `${API_URL}/customers/addPromoCode?customerID=${user._id}`;

  await axios
    .post(
      url,
      {
        name: promoTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);

      return Promise.reject(err);
    });
};
