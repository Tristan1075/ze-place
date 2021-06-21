import axios, {AxiosResponse} from 'axios';
import { BugForm} from '../types';
import {registerForPushNotificationsAsync} from './notifications';
import {API_URL} from '../env';
import * as SecureStore from 'expo-secure-store';



export const createBug = async (form: BugForm) => {
    const token = await SecureStore.getItemAsync('access-token');    
    return await axios
      .post(
        `${API_URL}/bug-ticket`,
        {
          name:form.name,
          description:form.description,
          senderId:form.senderId
        },
        {
          headers:{
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
  