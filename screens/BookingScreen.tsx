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

type Props = {
  place: Place;
};

type Error = {
  features: string;
  date: string;
};

const BookingScreen = ({place}: Props) => {
  const [confirmationBooking, showConfirmationBooking] = useState(false);
  const [minDate, setMinDate] = useState<string>(Date());
  const [booking, setBooking] = useState<Booking>({
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
    let formErrors = {
      features: '',
      date: '',
    };
    let isValid = true;
    if (booking.features.length === 0) {
      formErrors.features = 'You have to choose a feature';
      isValid = false;
    }
    if (booking.startDate?.length === 0 || booking.endDate?.length === 0) {
      formErrors.date = 'You have to choose a period';
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
          <TitleWithDescription title="Feature" subtitle={true} />
          <FeatureList
            features={place.features}
            list={booking}
            onChange={setBooking}
            onlyOne={true}
          />
          {errors.features ? (
            <Text style={styles.error}>{errors.features}</Text>
          ) : null}
          <TitleWithDescription title="Booking date" subtitle={true} />
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
          <TitleWithDescription title="Information" subtitle={true} />
          <SimpleInput
            style={styles.input}
            multiline={true}
            numberOfLines={5}
            placeholder="Precise something"
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
        child={<ConfirmationBookingScreen place={place} booking={booking} />}
        handleModal={() => showConfirmationBooking(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 130,
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
