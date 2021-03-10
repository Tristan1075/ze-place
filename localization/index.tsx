import { Platform, NativeModules } from 'react-native'
import type {LocalizationType} from './type';

import fr from './fr-FR';
import en from './en-US';

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;


export const translate = (index: string) => {
  const langFR: LocalizationType = fr;
  switch(deviceLanguage){
    case 'fr':
      return langFR[index];


    case: 'en':
      return en[index]; 
  };
};