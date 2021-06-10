import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';

export const initPaymentIntent = async (bookingPrice) => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log(`${API_URL}/payment/init`);

  return await axios
    .post(
      'http://localhost:3000/payment/init',
      {
        bookingPrice: bookingPrice,
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
