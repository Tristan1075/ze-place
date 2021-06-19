import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CreditCardBloc from '../components/CreditCardBloc';
import CreditCard from '../components/CreditCard';
import Colors from '../constants/Colors';
import {CreditCardInformations} from '../types';
import {getCardType} from '../utils';
import Header from '../components/Header';
import {addPaymentMethod} from '../api/payment';
import { PUBLIC_KEY_STRIPE } from '../env';

const stripe = require('stripe-client')(PUBLIC_KEY_STRIPE);

const PaymentMethodForm = () => {
  const [creditCardNumber, setCreditCardNumber] = useState<string>('...XXXX');
  const [expDate, setExpdate] = useState<string>('MM/YY');
  const navigation = useNavigation();

  const handleSubmitCreditCard = async (
    creditCardInformations: CreditCardInformations,
  ) => {
    const {cardNumber, cvcNumber, expMonth, expYear} = creditCardInformations;
    if (cardNumber && cvcNumber && expMonth && expYear) {
      try {
        const card = await stripe.createToken({
          card: {
            number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvcNumber,
            name: 'Tristan',
            address_city: 'Paris',
            address_country: 'France',
            address_line1: '6 rue gandon',
            address_zip: '75013',
            currency: 'eur',
          }
        });
        console.log(card);
        addPaymentMethod(card.id);
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
