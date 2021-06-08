import {AntDesign} from '@expo/vector-icons';
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';

import Button from '../components/Button';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import {initPaymentIntent} from '../api/payment';
import {Booking, Place} from '../types';
import {getBookingPriceWithDuration} from '../utils';
import {bookPlace} from '../api/places';
import {ModalContext} from '../providers/modalContext';

type Props = {
  place: Place;
  booking: Booking;
};

const creditCard = require('../assets/images/card.png');

const ConfirmationBookingScreen = ({place, booking}: Props) => {
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const {presentPaymentSheet, initPaymentSheet} = useStripe();
  const [activePaymentMethod, setActivePaymentMethod] = useState(0);
  const [promotionalCode, showPromotionalCode] = useState<boolean>(false);
  const {handleModal} = useContext(ModalContext);

  const getClientSecret = async () => {
    const {paymentIntent, ephemeralKey, customer} = await initPaymentIntent(
      place.price * 100 * booking.duration,
    );
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Example Inc.',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
    return paymentIntent;
  };

  const onBookPress = async () => {
    const clientSecret = await getClientSecret();
    const {error} = await presentPaymentSheet({
      clientSecret,
      confirmPayment: true,
    });
    if (!error) {
      bookPlace(place, booking);
      handleModal();
    }
    setPaymentSheetEnabled(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollView}>
      <Image source={creditCard} style={styles.creditCard} />
      <View style={styles.content}>
        <TitleWithDescription
          title={place.title}
          subtitle={true}
          description={`${place.location.city}, ${place.location.postalCode} ${place.location.country}`}
        />
        <Text style={styles.title}>Arrival</Text>
        <Text style={styles.description}>{booking.startDate}</Text>
        <Text style={styles.title}>Departure</Text>
        <Text style={styles.description}>{booking.endDate}</Text>
      </View>
      <View style={styles.paymentBloc}>
        <TitleWithDescription title="Payment and details" subtitle={true} />
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => setActivePaymentMethod(0)}>
            <View
              style={[
                styles.paymentMethodContainer,
                activePaymentMethod === 0 && styles.isActive,
              ]}>
              <Image
                source={require('../assets/icons/credit-card.png')}
                style={styles.paymentMethodIcon}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setActivePaymentMethod(1)}>
            <View
              style={[
                styles.paymentMethodContainer,
                activePaymentMethod === 1 && styles.isActive,
              ]}>
              <AntDesign
                name="apple1"
                color={activePaymentMethod === 1 ? Colors.white : Colors.dark}
                size={20}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setActivePaymentMethod(2)}>
            <View
              style={[
                styles.paymentMethodContainer,
                activePaymentMethod === 2 && styles.isActive,
              ]}>
              <Image
                source={require('../assets/icons/google.png')}
                style={styles.googleIcon}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.flex} />
          <TouchableOpacity
            onPress={() => showPromotionalCode(!promotionalCode)}>
            <Text style={styles.title}>Promotionnal code</Text>
          </TouchableOpacity>
        </View>
        {promotionalCode && (
          <View style={styles.row}>
            <SimpleInput style={styles.input} placeholder="ENTER YOUR CODE" />
            <Button
              value="OK"
              backgroundColor={Colors.dark}
              textColor={Colors.white}
              style={styles.button}
            />
          </View>
        )}
        <View style={styles.paymentRow}>
          <Text style={styles.keyBold}>{booking.duration} days</Text>
          {booking.duration && (
            <Text style={styles.value}>{booking.duration * place.price}€</Text>
          )}
        </View>
        <View style={styles.border} />
        <View style={styles.paymentRow}>
          <Text style={styles.key}>Servicing charge</Text>
          {booking.duration && (
            <Text style={styles.value}>
              {place.price * booking.duration * 0.2}€
            </Text>
          )}
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.key}>TVA 20%</Text>
          <Text style={styles.value}>{place.price * 0.2}€</Text>
        </View>
        <View style={styles.resume}>
          <View style={styles.totalRow}>
            <Text style={styles.total}>TOTAL </Text>
            {booking.duration && (
              <Text style={styles.total}>
                {place.price * 0.4 +
                  place.price * 0.2 +
                  booking.duration * place.price}
                €
              </Text>
            )}
          </View>
          <Button
            onPress={onBookPress}
            value="Confirm booking"
            backgroundColor={Colors.primary}
            textColor={Colors.white}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    position: 'relative',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 50,
  },
  content: {
    paddingTop: 200,
    paddingHorizontal: 20,
    width: 240,
    flex: 1,
  },
  creditCard: {
    top: 150,
    right: -100,
    position: 'absolute',
    width: 300,
    height: 300,
  },
  title: {
    fontFamily: 'oswald',
    color: Colors.primary,
    fontSize: 16,
  },
  description: {
    fontFamily: 'poppins-light',
    color: Colors.gray,
    fontSize: 14,
    paddingBottom: 20,
  },
  paymentBloc: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  paymentMethodContainer: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#d5e9ed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 20,
  },
  paymentMethodIcon: {
    width: 30,
    height: 30,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  keyBold: {
    flex: 1,
    fontFamily: 'oswald',
    fontSize: 18,
  },
  key: {
    flex: 1,
    fontFamily: 'oswald-light',
    fontSize: 16,
  },
  value: {
    fontFamily: 'oswald-light',
    fontSize: 16,
  },
  border: {
    height: 1,
    backgroundColor: '#d5e9ed',
    marginVertical: 10,
  },
  button: {
    marginLeft: 20,
  },
  resume: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    flex: 1,
  },
  total: {
    fontFamily: 'oswald-light',
    color: Colors.dark,
    fontSize: 18,
  },
  input: {
    flex: 1,
  },
  isActive: {
    backgroundColor: Colors.primary,
  },
});

export default ConfirmationBookingScreen;
