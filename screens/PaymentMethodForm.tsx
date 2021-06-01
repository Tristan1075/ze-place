import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  PaymentMethodCreateParams,
  useStripe,
} from '@stripe/stripe-react-native';

import CreditCardBloc from '../components/CreditCardBloc';
import CreditCard from '../components/CreditCard';
import Colors from '../constants/Colors';
import {CreditCardInformations} from '../types';
import {getCardType} from '../utils';
import Header from '../components/Header';
import {initPaymentMethod} from '../api/payment';

const PaymentMethodForm = () => {
  const [creditCardNumber, setCreditCardNumber] = useState<string>('...XXXX');
  const [expDate, setExpdate] = useState<string>('MM/YY');
  const {
    confirmSetupIntent,
    createPaymentMethod,
    presentPaymentSheet,
    createToken,
    initPaymentSheet,
  } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>();
  const navigation = useNavigation();

  useEffect(() => {
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    initialisePaymentSheet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialisePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} = await initPaymentMethod();
    setClientSecret(paymentIntent);
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: 'Example Inc.',
      style: 'alwaysDark',
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await presentPaymentSheet({
      clientSecret,
      confirmPayment: true,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'The payment was confirmed successfully');
    }
    setPaymentSheetEnabled(false);
  };

  const handleSubmitCreditCard = async (
    creditCardInformations: CreditCardInformations,
  ) => {
    const {cardNumber, cvcNumber, expMonth, expYear} = creditCardInformations;
    if (cardNumber && cvcNumber && expMonth && expYear) {
      try {
        openPaymentSheet();
      } catch (err) {}
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBloc}>
        <Header type="back" />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.creditCardBloc}>
          <CreditCardBloc
            type={getCardType(creditCardNumber)}
            name={'Default'}
            number={creditCardNumber}
            expDate={expDate}
            available={true}
          />
        </View>
        <View style={styles.validationCodeContainer}>
          <CreditCard
            onSubmitCreditCard={handleSubmitCreditCard}
            onChangeCreditCard={setCreditCardNumber}
            onChangeExpDate={setExpdate}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerBloc: {
    backgroundColor: Colors.dark,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 200,
  },
  contentContainer: {
    marginTop: -50,
    flex: 1,
  },
  creditCardBloc: {
    marginHorizontal: 65,
  },
  validationCodeContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.background,
  },
});

export default PaymentMethodForm;
