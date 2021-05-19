import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {SignupForm} from '../types';



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
  const url = `${API_URL}/customers/update?id=${id}`
  console.log(url);

  await axios
  .post(
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