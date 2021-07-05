import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  Text,
  View,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';
import BookingListScreen from './BookingListScreen';
import MyPlaceScreen from './MyPlaceScreen';
import { useCallback, useEffect, useState } from 'react';
import { getBookingByUser } from '../api/bookings';
import { useNavigation } from '@react-navigation/native';
import { Booking, Place } from '../types';
import { getUser } from '../api/customer';
import { StatusBar } from 'expo-status-bar';

const BookingAndPlacesScreen = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: i18n.t('booking_and_place_booking_title')},
    {key: 'second', title: i18n.t('booking_and_place_place_title')},
  ]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  const init = useCallback(async () => {
    setBookings(await getBookingByUser());
    const user = await getUser();
    setPlaces(user.ownedPlaces);
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <BookingListScreen bookings={bookings} />;
      case 'second':
        return <MyPlaceScreen places={places} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.primary}}
      style={{backgroundColor: Colors.background}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: Colors.dark,
            margin: 0,
            fontFamily: 'oswald',
            fontSize: 22,
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay} />
      <Header type="menu" showProfil={true} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overlay: {
    backgroundColor: Colors.dark,
  },
  tabBar: {
    backgroundColor: Colors.background,
  },
});

export default BookingAndPlacesScreen;
