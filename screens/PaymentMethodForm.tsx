import React, {useState} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CreditCardBloc from '../components/CreditCardBloc';
import CreditCard from '../components/CreditCard';

import Colors from '../constants/Colors';
import {CreditCardInformations} from '../types';
import {getCardType} from '../utils';
import Header from '../components/Header';

const PaymentMethodForm = () => {
  const [creditCardNumber, setCreditCardNumber] = useState<string>('...XXXX');
  const [expDate, setExpdate] = useState<string>('MM/YY');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleSubmitCreditCard = async (
    creditCardInformations: CreditCardInformations,
  ) => {
    const {cardNumber, cvcNumber, expMonth, expYear} = creditCardInformations;
    if (cardNumber && cvcNumber && expMonth && expYear) {
      setIsFetching(true);
      try {
        // const clientSecret = await api.getClientSecret(UserStore.token);
        // const setupIntent = await stripe.confirmSetupIntent({
        //   clientSecret: clientSecret,
        //   paymentMethod: {
        //     card: {
        //       expMonth: expMonth,
        //       expYear: expYear,
        //       cvc: cvcNumber,
        //       number: cardNumber,
        //     },
        //   },
        // });
        // const card = await api.createPaymentMethod(
        //   setupIntent.paymentMethodId,
        //   UserStore.token,
        // );
        // if (card) {
        //   setIsFetching(false);
        //   navigation.navigate('PaymentMethods');
        // }
      } catch (err) {
        console.log(err);
        setIsFetching(false);
      }
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
            isFetching={isFetching}
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
