import axios, {AxiosResponse} from 'axios';
import {API_URL} from '../env';
import {Booking, BookingTab, Place, Charges} from '../types';
import * as SecureStore from 'expo-secure-store';

export const bookPlace = async (
  place: Place,
  booking: Booking,
  paymentId: string,
) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .post(
      `${API_URL}/bookings/create`,
      {
        booking: {
          paymentId: paymentId,
          ownerId: place.ownerId,
          ...booking,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response: AxiosResponse<any>) => {
      return response.data.place;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};

export const getBookingByUser = async (): Promise<Booking[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/bookings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.bookings;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getTVA = async (): Promise<Charges> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/charges/getTVA`, {})
    .then((response: AxiosResponse<any>) => {
      return response.data.charges;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const getService = async (): Promise<Charges> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/charges/getService`, {})
    .then((response: AxiosResponse<any>) => {
      return response.data.charges;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getBookingByPlaceAndUser = async (
  placeId: string,
): Promise<Booking[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/bookings/${placeId}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.bookings;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getBookingsByPlace = async (
  placeId: string,
): Promise<Booking[]> => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/bookings/${placeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.bookings;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const acceptBooking = async (bookingId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/bookings/${bookingId}/accept`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.booking;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};

export const denyBooking = async (bookingId: string) => {
  const token = await SecureStore.getItemAsync('access-token');
  return await axios
    .get(`${API_URL}/bookings/${bookingId}/deny`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: AxiosResponse<any>) => {
      return response.data.booking;
    })
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
};
