import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StripeProvider} from '@stripe/stripe-react-native';
import {Subscription} from '@unimodules/core';
import {PUBLIC_KEY_STRIPE} from './env';
import * as Notifications from 'expo-notifications';

// @ts-ignore
import {ModalPortal} from 'react-native-modals';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
// import io from 'socket.io-client';

import frFR from './localization/fr-FR';
import enUS from './localization/en-US';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {ModalProvider} from './providers/modalContext';
// import {SocketProvider} from './components/SocketProvider';
import {NavigationContainerRef} from '@react-navigation/core';
import {registerForPushNotificationsAsync} from './api/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [
    notification,
    setNotification,
  ] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
      if (token) {
        setExpoPushToken(token);
        console.log(token);
      }
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notif) => {
        setNotification(notif);
      },
    );
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigate('Menu', {});
      },
    );

    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
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
      // <SocketProvider socket={socket}>
      <SafeAreaProvider>
        <StripeProvider publishableKey={PUBLIC_KEY_STRIPE}>
          <ModalProvider>
            <Navigation />
            <StatusBar />
            <ModalPortal />
          </ModalProvider>
        </StripeProvider>
      </SafeAreaProvider>
      // </SocketProvider>
    );
  }
};

export default App;
