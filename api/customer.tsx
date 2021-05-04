import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';



export const getUser = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log(token);
  return await axios
    .get(`${API_URL}/auth/me`, {
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

}