import {Place, SignupForm, User} from '../types';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';
import UserStore from '../store/UserStore';

export const getUser = async (t?: string): Promise<User> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${t ? t : token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getUserById = async (id?: string) => {
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

export const getUserByEmail = async (email: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/customers/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      if (response.data) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const modifyUser = async (form: SignupForm, id: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  const url = `${API_URL}/customers/update?customerID=${id}`;
  await axios
    .put(
      url,
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
  const url = `${API_URL}/customers/favorite?customerID=${UserStore.user._id}`;
  return await axios
    .get(url, {
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

export const getActivePromos = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  const promoId = UserStore.user.promoCode;
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
      console.log(response.data);

      return response.data;
    })
    .catch((err) => {
      console.log(err);

      return Promise.reject(err);
    });
};
export const getInnactivePromos = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  const promoId = UserStore.user.historyCode;
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
  const url = `${API_URL}/customers/addPromoCode?customerID=${UserStore.user._id}`;
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
      return response.data;
    })
    .catch((err) => {
      console.log(err);

      return Promise.reject(err);
    });
};
