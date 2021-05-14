import {API_URL} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';

export const getAllPlaces = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/places`, {
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
