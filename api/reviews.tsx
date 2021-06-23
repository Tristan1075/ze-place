import {Place, SignupForm, User, Review, ReviewForm} from '../types';
import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';
import UserStore from '../store/UserStore';

const headers = {
  'Content-Type': 'application/json',
};
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
      return response.data.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getPlaceReviewByUser = async (placeId:string,writerId:string): Promise<Review[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  console.log(`${API_URL}/review-place/getByUser`);
  
  return await axios
  .post(
    `${API_URL}/review-place/getByUser`,
    {
      placeId:placeId,
      writerId:writerId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((response: AxiosResponse<any>) => {   
      console.log('Bonjour',response.data.data);
           
      return response.data.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const createReview = async (
  form: ReviewForm,
): Promise<AxiosResponse> => {
  console.log(`${API_URL}/review-placer`);
  
  return await axios
    .post(
      `${API_URL}/review-place`,
      {
       name:form.name,
       description:form.description,
       writerId:form.writerId,
       placeId:form.placeId,
       rate:form.rate,
      },
      {
        headers: headers,
      },
    )
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};