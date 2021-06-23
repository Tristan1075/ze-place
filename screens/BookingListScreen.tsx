import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {getBookingByUser} from '../api/bookings';
import EmptyBloc from '../components/EmptyBloc';

import Header from '../components/Header';
import PlaceCardSquare from '../components/PlaceCardSquare';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Booking, Place, User} from '../types';

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
          title="Active bookings"
          subtitle={true}
          description="Find nearby you the available places to rent"
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
            title="You don't have bookings for the moment..."
          />
        )}
        {bookings.filter((booking) => booking.isPast === true).length > 0 && (
          <TitleWithDescription
            title="History"
            subtitle={true}
            description="Find the old announnces booked"
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
});

export default BookingListScreen;
