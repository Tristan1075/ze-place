import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PUBLIC_KEY_STRIPE} from '@env';

// @ts-ignore
import {ModalPortal} from 'react-native-modals';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import io from 'socket.io-client';

import frFR from './localization/fr-FR';
import enUS from './localization/en-US';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {ModalProvider} from './providers/modalContext';
import {SocketProvider} from './components/SocketProvider';

const App = () => {
  const [socket, setSocket] = React.useState({});

  React.useEffect(() => {
    const initSocket = {
      socket: io.connect('http://localhost:3000', {
        transports: ['websocket'],
        reconnectionAttempts: 10,
        reconnection: true,
        reconnectionDelay: 15000,
      }),
    };

    initSocket.socket.emit('msgToServer', "Hello World ! I'm the client side");
    // initSocket.socket.emit('events', {name: 'Nest'}, (data) => {
    // console.log(data);
    // console.log('eyooo !');
    // });
    initSocket.socket.on('msgToClient', (socketID: any) => {
      // AppStore.updateSocketID(socketID);
      console.warn('SocketID : ' + socketID);
    });
    setSocket(initSocket);
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
      <SocketProvider socket={socket}>
        <SafeAreaProvider>
          <StripeProvider publishableKey={PUBLIC_KEY_STRIPE}>
            <ModalProvider>
              <Navigation />
              <StatusBar />
              <ModalPortal />
            </ModalProvider>
          </StripeProvider>
        </SafeAreaProvider>
      </SocketProvider>
    );
  }
};

export default App;
