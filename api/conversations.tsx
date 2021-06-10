import axios, {AxiosResponse} from 'axios';
import {API_URL} from '../env';
import {conversation} from '../mocks';

export const getConversationById = async (id: string) => {
  return await axios(`${API_URL}/conversation/${id}`, {
    headers: {Authorization: 'Bearer 123567aaaa'},
  })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return conversation;
    });
};
