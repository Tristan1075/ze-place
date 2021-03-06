import {Feather} from '@expo/vector-icons';
import {RouteProp, useRoute} from '@react-navigation/native';
import I18n from 'i18n-js';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';
import {Rating} from 'react-native-ratings';
import {denyBooking, acceptBooking, getBookingsByPlace} from '../api/bookings';
import {getUserById} from '../api/customer';
import BookingCard from '../components/BookingCard';
import Button from '../components/Button';
import EmptyBloc from '../components/EmptyBloc';
import Header from '../components/Header';
import Popin from '../components/Popin';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import UserStore from '../store/UserStore';
import {HomeParamList, Booking, BookingTab, User} from '../types';

type UserBookingsScreenNavigationProp = RouteProp<
  HomeParamList | BookingTab,
  'UserBookings'
>;

const UserBookingsScreen = ({navigation}) => {
  const params = useRoute<UserBookingsScreenNavigationProp>().params;
  const userBooking = params.userBooking && params.userBooking[0];
  const [activeBooking, setActiveBooking] = useState<Booking>(userBooking);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [deny, setDeny] = useState<boolean>(false);
  const [owner, setOwner] = useState<User>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const init = useCallback(async () => {
    if (activeBooking) {
      setOwner(await getUserById(activeBooking.ownerId));
    } else {
      setBookings(await getBookingsByPlace(params.placeId));
    }
  }, [activeBooking, params.placeId]);

  useEffect(() => {
    init();
  }, [init]);

  const handleAcceptPress = async (bookingId: string) => {
    await acceptBooking(bookingId);
    setBookings(await getBookingsByPlace(params.placeId));
    setConfirmation(false);
  };

  const handleDenyPress = async (bookingId: string) => {
    const booking = await denyBooking(bookingId);
    if (activeBooking) {
      setActiveBooking(booking);
    }
    setBookings(await getBookingsByPlace(params.placeId));
    setDeny(false);
  };

  const renderItems = ({item}: {item: Booking}) => {
    return (
      <BookingCard
        item={item}
        onDenyPress={(bookingId) => {
          setDeny(true);
          setSelectedBooking(bookingId);
        }}
        onAcceptPress={(bookingId) => {
          setConfirmation(true);
          setSelectedBooking(bookingId);
        }}
        onSendMessagePress={() => handleSendMessagePress(item)}
        isUser={item.userId === UserStore.user._id}
      />
    );
  };

  const handleSendMessagePress = (item: Booking) => {
    navigation.navigate('Conversation', {
      conversation: {
        placeId: item.placeId,
        userId: item.userId,
        ownerId: UserStore.user._id,
      },
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <Header type="back" />
      <View style={styles.content}>
        {owner && (
          <View style={styles.ownerContainer}>
            <Image source={{uri: owner?.avatar}} style={styles.avatar} />
            <View>
              <Text style={styles.ownerName}>
                {owner?.first_name} {owner?.last_name}
              </Text>
              <View style={styles.row}>
                <Text
                  style={styles.sendMessageText}
                  onPress={() => {
                    navigation.navigate('Conversation', {
                      conversation: {
                        placeId: activeBooking.placeId,
                        userId: activeBooking.userId,
                        ownerId: activeBooking.ownerId,
                      },
                    });
                  }}>
                  {I18n.t('user_booking_send_message')}
                </Text>
              </View>
            </View>
          </View>
        )}
        {activeBooking && (
          <BookingCard
            item={activeBooking}
            onDenyPress={(bookingId) => {
              setDeny(true);
              setSelectedBooking(bookingId);
            }}
            onAcceptPress={(bookingId) => {
              setConfirmation(true);
              setSelectedBooking(bookingId);
            }}
            onSendMessagePress={() => handleSendMessagePress(activeBooking)}
            isUser={activeBooking.userId === UserStore.user._id}
          />
        )}
        {bookings.length > 0 ? (
          <>
            <TitleWithDescription
              title={I18n.t('user_booking_reservations')}
              subtitle={true}
              style={styles.paddingHorizontal}
            />
            <View style={styles.list}>
              <FlatList
                scrollEnabled={false}
                data={bookings.filter((booking) => booking.isPast !== true)}
                renderItem={renderItems}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        ) : !activeBooking ? (
          <EmptyBloc
            size={80}
            image={require('../assets/images/sad.png')}
            title={I18n.t('user_booking_no_data')}
          />
        ) : null}
        {bookings.length > 0 && (
          <>
            <TitleWithDescription
              title={I18n.t('user_booking_history')}
              subtitle={true}
              style={styles.paddingHorizontal}
            />
            <View style={styles.list}>
              <FlatList
                scrollEnabled={false}
                data={bookings.filter((booking) => booking.isPast === true)}
                renderItem={renderItems}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        )}
      </View>
      <Popin
        isVisible={confirmation}
        onConfirmPress={() => handleAcceptPress(selectedBooking)}
        onCancelPress={() => setConfirmation(false)}
        title={I18n.t('user_booking_confirm_action')}
        description={I18n.t('user_booking_confirm_action_description')}
      />
      <Popin
        isFetching={isFetching}
        isVisible={deny}
        onConfirmPress={() => handleDenyPress(selectedBooking)}
        onCancelPress={() => setDeny(false)}
        title={I18n.t('user_booking_confirm_action')}
        description={I18n.t('user_booking_confirm_action_description')}
      />
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
    marginBottom: 10,
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
  rate: {
    alignSelf: 'flex-start',
    flex: 1,
    paddingTop: 5,
  },
  sendMessageText: {
    fontFamily: 'oswald-light',
    marginRight: 5,
    alignSelf: 'flex-start',
  },
});

export default UserBookingsScreen;
