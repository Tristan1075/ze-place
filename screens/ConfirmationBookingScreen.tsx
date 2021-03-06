import {AntDesign} from '@expo/vector-icons';
import React, {useContext, useState, useEffect} from 'react';
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
import {Booking, Place, Promo, Charges} from '../types';
import {ModalContext} from '../providers/modalContext';
import {bookPlace, getTVA, getService} from '../api/bookings';
import Modal from '../components/Modal';
import Layout from '../constants/Layout';
import PaymentModal from '../components/PaymentModal';
import BookingPromoScreen from './BookingPromoScreen';
import {setToHistory, getUser} from '../api/customer';
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
  const [TVA, setTVA] = useState<Charges>();
  const [Services, setService] = useState<Charges>();

  const {handleModal} = useContext(ModalContext);

  useEffect(() => {
    const getTVACharges = async () => setTVA(await getTVA());
    const getServiceCharges = async () => setService(await getService());

    getTVACharges();
    getServiceCharges();
  }, []);

  const showPromotionalCodeModal = async () => {
    showPromotionalCode(true);
  };

  const updatePlace = (placePromo: number, promo?: Promo) => {
    setPlace({...placeBook, price: placePromo});
    setBooking({...bookPromo, price: placePromo * bookPromo.duration});
    setPromoCode(promo);
  };

  const tva = TVA ? TVA.value / 100 : 0.3;
  const fees = Services ? Services.value / 100 : 0.2;
  const priceHT: number = parseFloat(
    (bookPromo.duration * placeBook.price).toFixed(2),
  );
  const priceFee = priceHT * fees;
  const priceTVA = (priceHT + priceFee) * tva;
  const priceTTC = priceHT + priceFee + priceTVA;

  const onBookPress = async (paymentIntent: any) => {
    if (promoCode) {
      await setToHistory(promoCode);
      UserStore.updateUser(await getUser());
    }
    bookPromo.price = parseFloat(priceTTC.toFixed(2));
    await bookPlace(placeBook, bookPromo, paymentIntent.id);
    setPaymentSheetEnabled(false);
    handleModal();
    navigation.navigate(i18n.t('tap_bar_booking_title'));
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
            <View style={styles.flex} />
            <TouchableOpacity onPress={() => showPromotionalCodeModal()}>
              <Text style={styles.title}>
                {i18n.t('confirmation_booking_promotionnal_code')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.keyBold}>
              {bookPromo.duration}{' '}
              {bookPromo.duration && bookPromo.duration > 1
                ? i18n.t('confirmation_booking_days')
                : i18n.t('confirmation_booking_day')}
            </Text>

            {bookPromo.duration && (
              <Text style={styles.value}>{priceHT.toFixed(2)}???</Text>
            )}
          </View>
          {promoCode && (
            <View style={styles.paymentRow}>
              <Text style={styles.keyBold}>{promoCode.name}</Text>
              <Text style={styles.value}>{promoCode.value}%</Text>
            </View>
          )}
          <View style={styles.border} />
          <View style={styles.paymentRow}>
            <Text style={styles.key}>
              {i18n.t('confirmation_booking_servicing_charge')}
            </Text>

            {bookPromo.duration && (
              <Text style={styles.value}>{priceFee.toFixed(2)}???</Text>
            )}
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.key}>
              {' '}
              {i18n.t('confirmation_booking_tva')}
            </Text>
            <Text style={styles.value}>{priceTVA.toFixed(2)}???</Text>
          </View>
          <View style={styles.resume}>
            <View style={styles.totalRow}>
              <Text style={styles.total}>
                {i18n.t('confirmation_booking_total')}{' '}
              </Text>

              {bookPromo.duration && (
                <Text style={styles.total}>{priceTTC.toFixed(2)}???</Text>
              )}
            </View>
            <Button
              onPress={() => setPaymentSheetEnabled(true)}
              value={i18n.t('confirmation_booking_confirm')}
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
            bookingPrice={parseFloat(priceTTC.toFixed(2))}
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
            navigation={navigation}
            promo={promoCode}
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
