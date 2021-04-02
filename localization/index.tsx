import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import frFR from './fr-FR';
import enUS from './en-US';

i18n.translations = {
  en: enUS,
  fr: frFR,
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;
