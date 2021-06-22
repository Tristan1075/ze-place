import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {getBookingByUser} from '../api/bookings';
import EmptyBloc from '../components/EmptyBloc';

import Header from '../components/Header';
import PlaceCardSquare from '../components/PlaceCardSquare';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Booking, Place, User, Review} from '../types';
import { ModalContext } from '../providers/modalContext';
import WriteReviewScreen from './WriteReviewScreen';
import UserStore from '../store/UserStore';
import { getPlaceReviewByUser } from '../api/reviews';

const BookingListScreen = (props: Props) => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  var review;
  const {handleModal} = useContext(ModalContext);
  const {user} = UserStore;

  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var dateTime = date;

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
  const handleReviewPress = (placeId:string)=>{
    handleModal({
      child: <WriteReviewScreen userId={user._id} placeId={placeId} />
    });
  };



  const renderItem =  ({item, index}: {item: Booking; index: number}) => {

    return (
      <View>
      <PlaceCardSquare key={index} item={item} onPress={handlePlacePress} />
      
      {(item.endDate.slice(0,10)< dateTime) && 
        <Text onPress={() => handleReviewPress(item.placeId)} style={styles.reviewersText}>
        Ecrire une review
      </Text>
      }
      </View>
    );
  };

  return (

    <View style={styles.container}>
    <View style={styles.headerBloc}>
        <Header type="back" />
      </View>
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
        {bookings.filter((booking) => booking.isPast === true).length > 0 &&
        <TitleWithDescription
          title="History"
          subtitle={true}
          description="Find the old announnces booked"
        />}
        <FlatList
          data={bookings.filter((booking) => booking.isPast === true)}
          renderItem={renderItem}
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
  reviewersText: {
    fontFamily: 'poppins',
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
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
