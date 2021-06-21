import {Place, SignupForm, User, Review} from '../types';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';
import UserStore from '../store/UserStore';

export const getPlaceReview = async (placeId:string): Promise<Review[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log(`${API_URL}/review-place/get`);
  
  return await axios
  .post(
    `${API_URL}/review-place/get`,
    {
      placeId:placeId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((response: AxiosResponse<any>) => {   
      console.log(response.data.data);
           
      return response.data.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};