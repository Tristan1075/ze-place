import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';

export const initPaymentIntent = async (bookingPrice, ownerId) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/init`,
      {
        bookingPrice: bookingPrice,
        ownerId: ownerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const createToken = async () => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const addPaymentMethod = async (cardToken: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/paymentMethod/add`,
      {
        cardToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getConnectedAccount = async (accountId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/payment/bankAccount/${accountId}`, {
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

export const addBankAccount = async (accountId: string, data) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/bankAccount/new`,
      {
        accountId: accountId,
        holderName: data.holderName,
        bank_name: data.bankName,
        account_number: data.iban,
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

export const updateDefaultBankAccount = async (
  accountId: string,
  bankAccountId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/bankAccount/update`,
      {
        accountId,
        bankAccountId,
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

export const removeBankAccount = async (
  accountId: string,
  bankAccountId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/bankAccount/remove`,
      {
        accountId,
        bankAccountId,
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
