import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {ModalPortal} from 'react-native-modals';

import frFR from './localization/fr-FR';
import enUS from './localization/en-US';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {ModalProvider} from './providers/modalContext';

const App = () => {
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
          <StatusBar />
          <ModalPortal />
        </ModalProvider>
      </SafeAreaProvider>
    );
  }
};

export default App;
