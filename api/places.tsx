import {API_URL} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';

import {CreatePlaceForm} from '../types';

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

export const createPlace = async (form: CreatePlaceForm) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/places/create`,
      {
        title: form.title,
        aboutUser: form.aboutUser,
        location: form.location,
        surface: form.surface,
        placeType: form.placeType,
        price: form.price && parseInt(form.price, 10),
        rentingDuration: form.locationDuration.value,
        description: form.description,
        features: form.features,
        images: form.images,
        authorizeAnimals: form.authorizeAnimals,
        authorizeMusic: form.authorizeMusic,
        authorizeSmoking: form.authorizeSmoking,
        authorizeFire: form.authorizeFire,
        authorizeFoodAndDrink: form.authorizeFoodAndDrink,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data.place;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};
