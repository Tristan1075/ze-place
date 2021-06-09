import {API_URL} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';

import {Booking, Coords, CreatePlaceForm, Place} from '../types';
import {getUser} from './customer';

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

export const getPlacesNearbyCoordinates = async (
  coords: Coords,
  distance: number,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/places`,
      {
        coords: coords,
        distance: distance,
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
      return Promise.reject(err);
    });
};

export const createPlace = async (form: CreatePlaceForm) => {
  const token = await SecureStore.getItemAsync('access-token');
  const ownerId = await getUser();
  return await axios
    .post(
      `${API_URL}/places/create`,
      {
        title: form.title,
        location: form.location,
        surface: form.surface && parseInt(form.surface, 10),
        placeType: form.placeType,
        price: form.price && parseInt(form.price, 10),
        description: form.description,
        features: form.features,
        startDate: form.startDate,
        endDate: form.endDate,
        images: form.images,
        authorizeAnimals: form.authorizeAnimals,
        authorizeMusic: form.authorizeMusic,
        authorizeSmoking: form.authorizeSmoking,
        authorizeFire: form.authorizeFire,
        authorizeFoodAndDrink: form.authorizeFoodAndDrink,
        ownerId: ownerId._id,
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

export const bookPlace = async (place: Place, booking: Booking) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/places/booking`,
      {
        placeId: place._id,
        booking: booking,
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

export const getBookings = async (placeId: string): Promise<Booking[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/places/${placeId}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.bookings;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const acceptBooking = async (
  placeId: string,
  bookingId: string,
): Promise<Booking[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/places/booking/accept`,
      {
        placeId,
        bookingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data.bookings;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};

export const getSimilarPlaces = async (placeID: String) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/places/similarPlaces`,
      {
        placeID: placeID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data.places;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};
