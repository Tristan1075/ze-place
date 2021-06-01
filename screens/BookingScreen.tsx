import {Ionicons} from '@expo/vector-icons';
import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';

import Button from '../components/Button';
import CalendarPicker from '../components/CalendarPicker';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import {initPaymentIntent} from '../api/payment';
import {Place} from '../types';
import {getBookingPriceWithDuration} from '../utils';

type Props = {
  place: Place;
};

const BookingScreen = ({place}: Props) => {
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const {presentPaymentSheet, initPaymentSheet} = useStripe();

  const getClientSecret = async () => {
    const {paymentIntent, ephemeralKey, customer} = await initPaymentIntent(
      getBookingPriceWithDuration(place.price, place.rentingDuration),
    );
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: 'Example Inc.',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
    return paymentIntent;
  };

  const onBookPress = async () => {
    const clientSecret = await getClientSecret();
    await presentPaymentSheet({
      clientSecret,
      confirmPayment: true,
    });
    setPaymentSheetEnabled(false);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}>
      <View style={styles.bloc}>
        <TitleWithDescription title="Booking date" subtitle={true} />
        <CalendarPicker />
        <TitleWithDescription title="Information" subtitle={true} />
        <SimpleInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          placeholder="Precise something"
        />
        <Button
          value="Book"
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          onPress={onBookPress}
        />
      </View>
    </ScrollView>
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
    paddingVertical: 20,
  },
});

export default BookingScreen;
