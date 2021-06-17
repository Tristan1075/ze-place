import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          playfair: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
          'playfair-italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
          'playfair-medium': require('../assets/fonts/PlayfairDisplay-Medium.ttf'),
          'playfair-bold': require('../assets/fonts/PlayfairDisplay-Bold.ttf'),
          'playfair-semiBold': require('../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
          poppins: require('../assets/fonts/Poppins-Regular.ttf'),
          'poppins-italic': require('../assets/fonts/Poppins-Italic.ttf'),
          'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'poppins-light': require('../assets/fonts/Poppins-Light.ttf'),
          oswald: require('../assets/fonts/Oswald-Regular.ttf'),
          'oswald-light': require('../assets/fonts/Oswald-Light.ttf'),
          'oswald-bold': require('../assets/fonts/Oswald-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
