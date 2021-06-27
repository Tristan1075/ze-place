import axios, {AxiosResponse} from 'axios';
import {API_URL} from '../env';
import {conversation} from '../mocks';
import * as SecureStore from 'expo-secure-store';
import {Conversation, User} from '../types';

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
  userId: string,
  ownerId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/conversations/create`,
      {
        placeId,
        userId,
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

export const getConversationByPlaceAndUser = async (
  placeId: string,
  userId: string,
  ownerId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/conversations/place/user`,
      {
        placeId,
        userId,
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

export const getConversationByPlace = async (placeId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/conversations/place/${placeId}`, {
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

export const sendMessageApi = async (
  conversationId: string,
  senderId: string,
  text: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/messages/create`,
      {
        conversationId,
        senderId,
        text,
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

export const getMessageByConversation = async (conversationId: string) => {
  console.log(conversationId);
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/messages/conversation/${conversationId}`, {
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
