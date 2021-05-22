import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {Place, SignupForm} from '../types';



export const getUser = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      console.log(response.data._id);

      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });

}

export const modifyUser = async (form:SignupForm,id:string) => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log("form",form);
  console.log(id);
  const url = `${API_URL}/customers/update?customerID=${id}`
  console.log(url);

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

  },{
    headers: {
      Authorization: `Bearer ${token}`,
    },}

    ).then((response: AxiosResponse<any>) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const addFavorite = async (place: Place) => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log('place : ' + place);
  console.log('place description : ' + place.description);
  const user = await getUser();
  const url = `${API_URL}/customers/favorite/create?customerID=${user._id}`;
  console.log(url);
  await axios
    .put(
      url,
      {
        test: 'toto',
        place: place,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response);
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
