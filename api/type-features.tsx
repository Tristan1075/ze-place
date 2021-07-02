import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';

export const getPlaceTypes = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/place-type`, {
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

export const getPlaceFeatures = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/place-type/features`, {
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
