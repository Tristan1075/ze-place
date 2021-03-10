import {API_URL, API_TOKEN} from '@env';
import axios, {AxiosResponse} from 'axios';
import { conversation } from '../mocks';

const headers = {
  'api-key': API_TOKEN,
};

export const getConversationById = async (id: string) => {
  return await axios(`${API_URL}/conversation/${id}`, {
    headers: {...headers, Authorization: 'Bearer 123567aaaa'},
  })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      return conversation;
      //return Promise.reject(err);
    });
};
