import * as Location from 'expo-location';

export const isEmailValid = (email: String) => {
  const re = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getUserLocation = async () => {
  let {status} = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    return;
  }

  return await Location.getCurrentPositionAsync({});
};

export const getCardType = (cardNum: string) => {
  let payCardType = '';
  let regexMap = [
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

export default {getCardType, isCreditCard};
