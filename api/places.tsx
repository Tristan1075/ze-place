import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';
import UserStore from '../store/UserStore';

import {Coords, CreatePlaceForm, FilterForm} from '../types';

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

export const getPlaceById = async (id: string) => {
  console.log('ID', id);
  console.log(`${API_URL}/places/${id}`);
  
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/places/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
      
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
  console.log(form);
  
//   return await axios
//     .post(
//       `${API_URL}/places/create`,
//       {
//         title: form.title,
//         location: form.location,
//         surface: form.surface && parseInt(form.surface, 10),
//         placeType: form.placeType,
//         price: form.price && parseInt(form.price, 10),
//         description: form.description,
//         features: form.features,
//         startDate: form.startDate,
//         endDate: form.endDate,
//         images: form.images,
//         authorizeAnimals: form.authorizeAnimals,
//         authorizeMusic: form.authorizeMusic,
//         authorizeSmoking: form.authorizeSmoking,
//         authorizeFire: form.authorizeFire,
//         authorizeFoodAndDrink: form.authorizeFoodAndDrink,
//         ownerId: UserStore.user._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//     .then((response: AxiosResponse<any>) => {
//       return response.data.place;
//     })
//     .catch((err) => {
//       return Promise.reject(err.response.data);
//     });
// };

// export const getSimilarPlaces = async (placeID: String) => {
//   const token = await SecureStore.getItemAsync('access-token');
//   return await axios
//     .post(
//       `${API_URL}/places/similarPlaces`,
//       {
//         placeID: placeID,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//     .then((response: AxiosResponse<any>) => {
//       return response.data.places;
//     })
//     .catch((err) => {
//       return Promise.reject(err.response.data);
//     });
};

export const searchPlaces = async (filterForm: FilterForm) => {
  const token = await SecureStore.getItemAsync('access-token');

  return await axios
    .post(
      `${API_URL}/places/searchPlaces`,
      {
        placeTypeName: filterForm.placeType?.name,
        price: filterForm.price,
        surface: filterForm.surface,
        features: filterForm.features,
        location: filterForm.location,
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
