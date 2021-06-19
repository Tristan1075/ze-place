import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';

export const initPaymentIntent = async (bookingPrice, ownerId) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/init`,
      {
        bookingPrice: bookingPrice,
        ownerId: ownerId,
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

export const createToken = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/token`,
      {},
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

export const addPaymentMethod = async (cardToken: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/paymentMethod/add`,
      {
        cardToken,
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
