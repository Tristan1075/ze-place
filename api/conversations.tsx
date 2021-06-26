import axios, {AxiosResponse} from 'axios';
import {API_URL} from '../env';
import {conversation} from '../mocks';
import * as SecureStore from 'expo-secure-store';
import { Conversation, User } from '../types';

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

export const createConversation = async (
  placeId: string,
  senderId: string,
  ownerId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/conversations/create`,
      {
        placeId,
        senderId,
        ownerId,
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

export const sendMessage = async (
  conversation: Conversation,
  sender: User,
  reciever: User,
  text: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/conversations/create`,
      {
        placeId,
        senderId,
        ownerId,
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