import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {acceptBooking, getBookings} from '../api/places';
import BookingCard from '../components/BookingCard';
import CalendarPicker from '../components/CalendarPicker';
import Header from '../components/Header';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {HomeParamList, Booking, BookingTab} from '../types';

type UserBookingsScreenNavigationProp = RouteProp<
  HomeParamList | BookingTab,
  'UserBookings'
>;

const UserBookingsScreen = () => {
  const params = useRoute<UserBookingsScreenNavigationProp>().params;
  const [bookings, setBookings] = useState<Booking[]>([params.userBooking]);

  useEffect(() => {
    if (!params.userBooking) {
      getBookings(params.placeId).then((bookingsResult) =>
        setBookings(bookingsResult),
      );
    }
  }, [params.placeId, params.userBooking]);

  const handleAcceptPress = async (bookingId: string) => {
    setBookings(await acceptBooking(params.placeId, bookingId));
  };

  const renderItems = ({item}: {item: Booking}) => {
    return (
      <BookingCard
        item={item}
        onAcceptPress={handleAcceptPress}
        isUser={Boolean(params.userBooking)}
      />
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <Header type="back" />
      <View style={styles.content}>
        <View style={styles.paddingHorizontal}>
          <CalendarPicker bookings={bookings} />
        </View>
        <TitleWithDescription
          title={
            params.userBooking != null ? 'Reservation' : 'Pending Bookings'
          }
          subtitle={true}
          style={styles.paddingHorizontal}
        />
        <View style={styles.list}>
          {bookings.length > 0 && (
            <FlatList
              scrollEnabled={false}
              data={bookings.filter((booking) => booking.isAccepted !== true)}
              renderItem={renderItems}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        {params.userBooking === null && (
          <>
            <TitleWithDescription
              title="Accepted Bookings"
              subtitle={true}
              style={styles.paddingHorizontal}
            />
            <View style={styles.list}>
              {bookings.length > 0 && (
                <FlatList
                  scrollEnabled={false}
                  data={bookings.filter(
                    (booking) => booking.isAccepted === true,
                  )}
                  renderItem={renderItems}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    flex: 1,
  },
  scrollView: {
    paddingBottom: 50,
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white,
    ...Layout.shadow,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
});

export default UserBookingsScreen;
