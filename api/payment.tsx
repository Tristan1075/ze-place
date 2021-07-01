import axios, {AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../env';

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
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const createPaymentIntent = async (
  customerId: string,
  paymentMethodId: string,
  bookingPrice: number,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/paymentIntent/create`,
      {
        customerId,
        paymentMethodId,
        bookingPrice,
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
      console.log(err);
      return Promise.reject(err);
    });
};

export const getCustomer = async (customerId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/payment/paymentMethods/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const getPaymentMethods = async (customerId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/payment/paymentMethods/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const addPaymentMethod = async (
  customerId: string,
  paymentMethodId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/paymentMethods/add`,
      {
        customerId,
        paymentMethodId,
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
      console.log(err);
      return Promise.reject(err);
    });
};

export const updatePaymentMethod = async (
  customerId: string,
  paymentMethodId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/paymentMethods/update`,
      {
        customerId,
        paymentMethodId,
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
      console.log(err);
      return Promise.reject(err);
    });
};

export const removePaymentMethod = async (
  paymentMethodId: string,
  customerId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/paymentMethods/remove`,
      {
        paymentMethodId,
        customerId,
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
      console.log(err);
      return Promise.reject(err);
    });
};

export const hasBankAccount = async (accountId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/payment/bankAccount/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.external_accounts.data.length > 0;
    })
    .catch((err) => {
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

export const getBalance = async (accountId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/balance`,
      {
        accountId,
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

export const initSetupIntent = async (
  customerId: string,
  paymentMethodId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/payment/setupIntent/create`,
      {
        customerId,
        paymentMethodId,
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
      console.log(err);
      return Promise.reject(err);
    });
};
