import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getBookingByUser} from '../api/bookings';
import EmptyBloc from '../components/EmptyBloc';
import i18n from 'i18n-js';

import PlaceCardSquare from '../components/PlaceCardSquare';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Booking} from '../types';

const BookingListScreen = (props: Props) => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const init = useCallback(async () => {
    setBookings(await getBookingByUser());
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handlePlacePress = (placeId?: string) => {
    navigation.navigate('PlaceDetail', {
      place: placeId,
    });
  };

  const renderItem = ({item, index}: {item: Booking; index: number}) => {
    return (
      <PlaceCardSquare key={index} item={item} onPress={handlePlacePress} />
    );
  };

  const renderHistory = ({item, index}: {item: Booking; index: number}) => {
    return <PlaceCardSquare key={index} item={item} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TitleWithDescription
          title={i18n.t('booking_list_title')}
          subtitle={true}
          description={i18n.t('booking_list_description')}
        />
        {bookings &&
        bookings.filter((booking) => booking.isPast !== true).length > 0 ? (
          <FlatList
            data={bookings.filter((booking) => booking.isPast !== true)}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyBloc
            size={80}
            image={require('../assets/images/sad.png')}
            title={i18n.t('booking_list_empty')}
          />
        )}
        {bookings.filter((booking) => booking.isPast === true).length > 0 && (
          <TitleWithDescription
            title={i18n.t('booking_list_history_title')}
            subtitle={true}
            description={i18n.t('booking_list_history_description')}
          />
        )}
        <FlatList
          data={bookings.filter((booking) => booking.isPast === true)}
          renderItem={renderHistory}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Layout.padding,
    flex: 1,
  },
  headerBloc: {
    backgroundColor: Colors.dark,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 250,
  },
});

export default BookingListScreen;