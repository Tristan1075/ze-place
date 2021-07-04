import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import Navigation from './navigation';
import * as Sentry from 'sentry-expo';

// @ts-ignore
import {ModalPortal} from 'react-native-modals';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import frFR from './localization/fr-FR';
import enUS from './localization/en-US';

import useCachedResources from './hooks/useCachedResources';
import {ModalProvider} from './providers/modalContext';
import {registerForPushNotificationsAsync} from './api/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Sentry.init({
  dsn:
    'https://38094f88326945489d9e31cb91035ed4@o894694.ingest.sentry.io/5840497',
  enableInExpoDevelopment: true,
});

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  i18n.translations = {
    en: enUS,
    fr: frFR,
  };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ModalProvider>
          <Navigation />
          <ModalPortal />
          <StatusBar />
        </ModalProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
