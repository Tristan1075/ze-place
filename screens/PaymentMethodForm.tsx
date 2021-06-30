import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import CreditCardBloc from '../components/CreditCardBloc';
import CreditCard from '../components/CreditCard';
import Colors from '../constants/Colors';
import {CreditCardInformations} from '../types';
import {getCardType} from '../utils';
import Header from '../components/Header';
import {addPaymentMethod} from '../api/payment';
import {PUBLIC_KEY_STRIPE} from '../env';
import stripe from 'react-native-stripe-client';
import UserStore from '../store/UserStore';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView } from 'react-native-gesture-handler';

const stripeClient = stripe(PUBLIC_KEY_STRIPE);

type Props = {
  closeModal: () => void;
  onSubmit: () => void;
};

const PaymentMethodForm = ({closeModal, onSubmit}: Props) => {
  const [creditCardNumber, setCreditCardNumber] = useState<string>('...XXXX');
  const [expDate, setExpdate] = useState<string>('MM/YY');
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmitCreditCard = async (
    creditCardInformations: CreditCardInformations,
  ) => {
    const {cardNumber, cvcNumber, expMonth, expYear} = creditCardInformations;
    if (cardNumber && cvcNumber && expMonth && expYear) {
      setIsFetching(true);
      try {
        const paymentMethod = await stripeClient.createPaymentMethod('card', {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvcNumber,
        });
        const res = await addPaymentMethod(
          UserStore.user.customerId,
          paymentMethod.id,
        );
        setIsFetching(false);
        if (res) {
          onSubmit();
        }
      } catch (err) {}
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBloc} />
      <ScrollView style={styles.contentContainer}>
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
            isFetching={isFetching}
          />
        </View>
        <KeyboardSpacer topSpacing={20} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 20,
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
    padding: 30,
    backgroundColor: Colors.background,
  },
});

export default PaymentMethodForm;
