import * as Location from 'expo-location';
import Colors from '../constants/Colors';
import {Availability} from '../types';
import Constants from './Constants';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import {LocationObject} from 'expo-location';

export const isEmailValid = (email: string) => {
  const re = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getUserLocation = async (): Promise<
  LocationObject | undefined
> => {
  const {status} = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  }

  return await Location.getCurrentPositionAsync({});
};

export const getBookingPriceWithDuration = (
  price: number,
  duration: string,
) => {
  switch (duration) {
    case Constants.DAY:
      return 1 * (price * 100);
    case Constants.NIGHT:
      return 1 * (price * 100);
    case Constants.WEEK:
      return 7 * (price * 100);
    case Constants.MONTH:
      return 30 * (price * 100);
  }
};

export const getCardType = (cardNum: string) => {
  let payCardType = '';
  const regexMap = [
    {regEx: /^4[0-9]{0,15}$/, cardType: 'visa'},
    {regEx: /^5$|^5[1-5][0-9]{0,14}$/, cardType: 'mastercard'},
    {regEx: /^3$|^3[47][0-9]{0,13}$/, cardType: 'amex'},
    {
      regEx: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
      cardType: 'mastro',
    },
  ];

  for (let j = 0; j < regexMap.length; j++) {
    if (cardNum.replace(/ /g, '').match(regexMap[j].regEx)) {
      payCardType = regexMap[j].cardType;
      break;
    }
  }

  return payCardType;
};

export const isCreditCard = (number: string) => {
  const regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  return regexp.test(number);
};

export const compressImage = async (uri, format = SaveFormat.PNG) => {
  // SaveFormat.PNG
  const result = await manipulateAsync(uri, [{resize: {width: 400}}], {
    compress: 1,
    format,
  });
  return {name: `${Date.now()}.${format}`, type: `image/${format}`, ...result};
  // return: { name, type, width, height, uri }
};

export default {getCardType, isCreditCard};

export const dateToAvailabilities = (
  start: string,
  startDate: Date,
  end: string,
  endDate: Date,
) => {
  let dates = {};
  let currentDate: Date = startDate,
    addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    const month = `${currentDate.getMonth() < 10 ? '0' : ''}${
      currentDate.getMonth() + 1
    }`;
    const day = `${
      currentDate.getDate() < 10 ? '0' : ''
    }${currentDate.getDate()}`;
    const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
    dates = {
      ...dates,
      [formatDate]: {color: Colors.primary, textColor: Colors.white},
    };
    currentDate = addDays.call(currentDate, 1);
  }
  delete dates[start];
  delete dates[end];
  return dates;
};

export const isRangeAvailable = (
  startDate: Date,
  endDate: Date,
  availabilities: Availability[],
) => {
  let currentDate: Date = startDate,
    addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    const month = `${currentDate.getMonth() < 10 ? '0' : ''}${
      currentDate.getMonth() + 1
    }`;
    const day = `${
      currentDate.getDate() < 10 ? '0' : ''
    }${currentDate.getDate()}`;
    const formatDate = `${currentDate.getFullYear()}-${month}-${day}`;
    if (
      availabilities.find((availability) => availability.date === formatDate)
    ) {
      return false;
    }
    currentDate = addDays.call(currentDate, 1);
  }
  return true;
};

export const getDuration = (start: string) => {
  const today = new Date();
  const startDate = new Date(start);
  return parseInt((startDate - today) / (1000 * 60 * 60 * 24), 10);
};
