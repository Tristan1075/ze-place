import {Feather, Ionicons} from '@expo/vector-icons';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import {getUser, getUserById} from '../api/customer';
import {acceptBooking, getBookings} from '../api/places';
import BookingCard from '../components/BookingCard';
import Header from '../components/Header';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {HomeParamList, Booking, BookingTab, User} from '../types';

type UserBookingsScreenNavigationProp = RouteProp<
  HomeParamList | BookingTab,
  'UserBookings'
>;

const UserBookingsScreen = () => {
  const params = useRoute<UserBookingsScreenNavigationProp>().params;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [owner, setOwner] = useState<User>();
  const [user, setUser] = useState<User>();
  const [userBooking, setUserBooking] = useState<Booking>();

  const init = useCallback(async () => {
    setUser(await getUser());
    setOwner(await getUserById(params.ownerId));
    setBookings(await getBookings(params.placeId));
  }, [params.ownerId, params.placeId]);

  useEffect(() => {
    init();
  }, [init]);

  const handleAcceptPress = async (bookingId: string) => {
    setBookings(await acceptBooking(params.placeId, bookingId));
  };

  const renderItems = ({item}: {item: Booking}) => {
    if ((params.isBooked && item.userId === user?._id) || !params.isBooked) {
      return (
        <BookingCard
          item={item}
          onAcceptPress={handleAcceptPress}
          isUser={item.userId === user?._id}
        />
      );
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <Header type="back" />
      <View style={styles.content}>
        {user?._id !== owner?._id && (
          <View style={styles.ownerContainer}>
            <Image source={{uri: owner?.avatar}} style={styles.avatar} />
            <View>
              <Text style={styles.ownerName}>
                {owner?.first_name} {owner?.last_name}
              </Text>
              <View style={styles.row}>
                <Text style={styles.text}>Envoyer un message</Text>
                <Feather name="message-circle" size={16} />
              </View>
            </View>
          </View>
        )}
        {bookings.length > 0 && (
          <>
            <TitleWithDescription
              title="Pending reservation"
              subtitle={true}
              style={styles.paddingHorizontal}
            />
            <View style={styles.list}>
              {bookings.length > 0 && (
                <FlatList
                  scrollEnabled={false}
                  data={bookings.filter(
                    (booking) => booking.isAccepted !== true,
                  )}
                  renderItem={renderItems}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
            <TitleWithDescription
              title="Accepted reservation"
              subtitle={true}
              style={styles.paddingHorizontal}
            />
            <View style={styles.list}>
              <FlatList
                scrollEnabled={false}
                data={bookings.filter((booking) => booking.isAccepted === true)}
                renderItem={renderItems}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  ownerContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    ...Layout.shadow,
  },
  avatar: {
    borderRadius: 20,
    width: 100,
    height: 100,
    marginRight: 10,
  },
  ownerName: {
    fontFamily: 'oswald',
    fontSize: 18,
    flex: 1,
  },
  text: {
    fontFamily: 'poppins-light',
    fontSize: 12,
    paddingRight: 10,
  },
});

export default UserBookingsScreen;
