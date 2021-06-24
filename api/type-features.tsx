import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';
import UserStore from '../store/UserStore';

import {Coords, CreatePlaceForm, FilterForm} from '../types';

export const getPlaceTypes = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`http://localhost:3000/place-type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
        console.log('log');
        
        console.log(response.data);
        
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getPlaceFeatures = async () => {
    const token = await SecureStore.getItemAsync('access-token');
    return await axios
      .get(`http://localhost:3000/place-type/features`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
          console.log('log');
          
          console.log(response.data);
          
        return response.data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

