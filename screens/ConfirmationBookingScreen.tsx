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
import i18n from 'i18n-js';

import Button from '../components/Button';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import {Booking, Place, Promo} from '../types';
import {ModalContext} from '../providers/modalContext';
import {bookPlace} from '../api/bookings';
import Modal from '../components/Modal';
import Layout from '../constants/Layout';
import PaymentModal from '../components/PaymentModal';
import BookingPromoScreen from './BookingPromoScreen';
import { setToHistory, getUser } from '../api/customer';
import UserStore from '../store/UserStore';

type Props = {
  place: Place;
  booking: Booking;
  navigation: any;
};

const creditCard = require('../assets/images/card.png');

const ConfirmationBookingScreen = ({place, booking, navigation}: Props) => {
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState(0);
  const [promotionalCode, showPromotionalCode] = useState<boolean>(false);
  const [placeBook, setPlace] = useState<Place>(place);
  const [bookPromo, setBooking] = useState<Booking>(booking);
  const [promoCode, setPromoCode] = useState<Promo>();

  const {handleModal} = useContext(ModalContext);
  

  const showPromotionalCodeModal = async () => {
    showPromotionalCode(true);

    
  };

  const updatePlace = (placePromo:number,promo:Promo) => {
    setPlace({...placeBook , price:placePromo})  
    setBooking({...bookPromo, price:(placePromo*bookPromo.duration)})
    setPromoCode(promo)
  console.log('parent',placeBook.price);
  }
  const onBookPress = async (paymentIntent: any) => {

    console.log('book',placeBook);
    console.log('bookingPromo',bookPromo);
    console.log('promo',promoCode);
    
    await setToHistory(promoCode);
    UserStore.updateUser(await getUser())
    
    await bookPlace(placeBook, bookPromo, paymentIntent.id);

    setPaymentSheetEnabled(false);
    handleModal();
    navigation.navigate('BookingAndPlaces');
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={creditCard} style={styles.creditCard} />
        <View style={styles.content}>
          <TitleWithDescription
            title={placeBook.title}
            subtitle={true}
            description={`${placeBook.location.city}, ${placeBook.location.postalCode} ${placeBook.location.country}`}
          />
          <Text style={styles.title}>
            {i18n.t('confirmation_booking_arrival')}
          </Text>
          <Text style={styles.description}>{bookPromo.startDate}</Text>
          <Text style={styles.title}>
            {i18n.t('confirmation_booking_departure')}
          </Text>
          <Text style={styles.description}>{bookPromo.endDate}</Text>
        </View>
        <View style={styles.paymentBloc}>
          <TitleWithDescription
            title={i18n.t('confirmation_booking_payment_title')}
            subtitle={true}
          />
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
            {/* <TouchableWithoutFeedback onPress={() => setActivePaymentMethod(1)}>
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
            </TouchableWithoutFeedback>*/}
            <View style={styles.flex} />
            <TouchableOpacity
              onPress={() => showPromotionalCodeModal()}>
              <Text style={styles.title}>
                {i18n.t('confirmation_booking_promotionnal_code')}
              </Text>
            </TouchableOpacity> 
          </View>
          {promotionalCode && (
            <View style={styles.row}>
              <SimpleInput
                style={styles.input}
                placeholder={i18n.t(
                  'confirmation_booking_promotionnal_code_input',
                )}
              />
              <Button
                value={i18n.t('confirmation_booking_promotionnal_code_submit')}
                backgroundColor={Colors.dark}
                textColor={Colors.white}
                style={styles.button}
                onPress={() => {}}
              />
            </View>
          )}
          <View style={styles.paymentRow}>
            <Text style={styles.keyBold}>
              {bookPromo.duration}{' '}
              {bookPromo.duration && bookPromo.duration > 1
                ? i18n.t('confirmation_booking_days')
                : i18n.t('confirmation_booking_day')}
            </Text>
            {bookPromo.duration && (
              <Text style={styles.value}>
                {bookPromo.duration * placeBook.price}€
              </Text>
            )}
          </View>
          <View style={styles.border} />
          <View style={styles.paymentRow}>
            <Text style={styles.key}>
              {i18n.t('confirmation_booking_servicing_charge')}
            </Text>
            {bookPromo.duration && (
              <Text style={styles.value}>
                {(placeBook.price * bookPromo.duration * 0.2).toFixed(2)}€
              </Text>
            )}
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.key}>
              {' '}
              {i18n.t('confirmation_booking_tva')}
            </Text>
            <Text style={styles.value}>{((placeBook.price * bookPromo.duration + placeBook.price * 0.2) * 0.2).toFixed(2)}€</Text>
          </View>
          <View style={styles.resume}>
            <View style={styles.totalRow}>
              <Text style={styles.total}>
                {i18n.t('confirmation_booking_total')}{' '}
              </Text>
              {bookPromo.duration && (
                <Text style={styles.total}>

                  {(placeBook.price * bookPromo.duration + placeBook.price * 0.2) * 1.2}€
                </Text>
              )}
            </View>
            <Button
              onPress={() => setPaymentSheetEnabled(true)}
              value="Confirm booking"
              backgroundColor={Colors.primary}
              textColor={Colors.white}
            />
          </View>
        </View>
      </ScrollView>
      {paymentSheetEnabled && <View style={styles.overlay} />}
      <Modal
        type="bottom"
        visible={paymentSheetEnabled}
        child={
          <PaymentModal
            onTouchOutside={() => setPaymentSheetEnabled(false)}
            onBookPress={onBookPress}
            bookingPrice={
              (place.price * bookPromo.duration + place.price * 0.2) * 1.2
            }
          />
        }
        handleModal={() => setPaymentSheetEnabled(false)}
      />

      <Modal
        visible={promotionalCode}
        child={
          <BookingPromoScreen
          place={place}
          onPromoSelected={updatePlace}

          />
        }
        handleModal={() => showPromotionalCode(false)}
      />  
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    position: 'relative',
    backgroundColor: Colors.background,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 50,
  },
  content: {
    paddingTop: 150,
    paddingHorizontal: 20,
    width: 240,
    flex: 1,
  },
  creditCard: {
    top: 150,
    right: -100,
    position: 'absolute',
    width: 270,
    height: 270,
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
  bottomModal: {
    zIndex: 999,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    width: '100%',
  },
});

export default ConfirmationBookingScreen;
