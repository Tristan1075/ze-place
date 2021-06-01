import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Button from '../components/Button';
import CalendarPicker from '../components/CalendarPicker';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import {Place} from '../types';
import FeatureList from '../components/FeatureList';
import Modal from '../components/Modal';
import ConfirmationBookingScreen from './ConfirmationBookingScreen';

type Props = {
  place: Place;
};

const BookingScreen = ({place}: Props) => {
  const [confirmationBooking, showConfirmationBooking] = useState(false);
  const [booking, setBooking] = useState({});

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bloc}>
          <TitleWithDescription title="Feature" subtitle={true} />
          <FeatureList features={place.features} />
          <TitleWithDescription title="Booking date" subtitle={true} />
          <CalendarPicker
            showDates={true}
            onChange={(startDate, endDate, duration) =>
              setBooking({
                ...booking,
                bookingPeriod: {
                  startDate: startDate,
                  endDate: endDate,
                  duration,
                },
              })
            }
          />
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
            onPress={() => showConfirmationBooking(true)}
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
});

export default BookingScreen;
