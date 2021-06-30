import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';

import Button from '../components/Button';
import CalendarPicker from '../components/CalendarPicker';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import {Booking, Place} from '../types';
import FeatureList from '../components/FeatureList';
import Modal from '../components/Modal';
import ConfirmationBookingScreen from './ConfirmationBookingScreen';
import i18n from 'i18n-js';

type Props = {
  place: Place;
  navigation?: any;
};

type Error = {
  features: string;
  date: string;
};

const BookingScreen = ({place, navigation}: Props) => {
  const [confirmationBooking, showConfirmationBooking] = useState(false);
  const [minDate, setMinDate] = useState<string>(Date());
  const [booking, setBooking] = useState<Booking>({
    placeId: '',
    features: [],
    startDate: '',
    endDate: '',
    duration: undefined,
    price: undefined,
    description: '',
  });
  const [errors, setErrors] = useState<Error>({
    features: '',
    date: '',
  });

  const verifyForm = () => {
    const formErrors = {
      features: '',
      date: '',
    };
    let isValid = true;
    if (booking.features.length === 0) {
      formErrors.features = i18n.t('booking_feature_error');
      isValid = false;
    }
    if (booking.startDate?.length === 0 || booking.endDate?.length === 0) {
      formErrors.date = i18n.t('booking_date_error');
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleBookPress = () => {
    if (verifyForm()) {
      showConfirmationBooking(true);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bloc}>
          <TitleWithDescription
            title={i18n.t('booking_feature_title')}
            subtitle={true}
          />
          <FeatureList
            features={place.features}
            list={booking}
            onChange={setBooking}
            onlyOne={true}
          />
          {errors.features ? (
            <Text style={styles.error}>{errors.features}</Text>
          ) : null}
          <TitleWithDescription
            title={i18n.t('booking_date')}
            subtitle={true}
          />
          <CalendarPicker
            showDates={true}
            availabilities={place.availabilities}
            onChange={(startDate, endDate, duration) => {
              startDate && setMinDate(startDate);
              if (duration) {
                setBooking({
                  ...booking,
                  startDate,
                  endDate,
                  duration,
                  price: place.price * duration,
                });
              }
            }}
          />
          {errors.date ? <Text style={styles.error}>{errors.date}</Text> : null}
          <TitleWithDescription
            title={i18n.t('booking_information_title')}
            subtitle={true}
          />
          <SimpleInput
            style={styles.input}
            multiline={true}
            numberOfLines={5}
            placeholder={i18n.t('booking_ask_to_owner')}
            onChangeText={(value) =>
              setBooking({...booking, description: value})
            }
          />
          <Button
            value="Book"
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            onPress={handleBookPress}
          />
        </View>
      </ScrollView>
      <Modal
        visible={confirmationBooking}
        child={
          <ConfirmationBookingScreen
            place={place}
            booking={booking}
            navigation={navigation}
          />
        }
        handleModal={() => showConfirmationBooking(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 130,
    backgroundColor: Colors.background,
  },
  scrollView: {
    paddingBottom: 200,
  },
  bloc: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  error: {
    color: Colors.error,
    paddingTop: 10,
    fontFamily: 'poppins',
  },
});

export default BookingScreen;
