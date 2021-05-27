import {Ionicons} from '@expo/vector-icons';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {CardIOModule} from 'react-native-awesome-card-io';

import Colors from '../constants/Colors';
import {CreditCardInformations} from '../types';

import Button from './Button';
import SimpleInput from './SimpleInput';

const scanCardConfig = {
  useCardIOLogo: true,
  hideCardIOLogo: true,
  suppressManualEntry: true,
  suppressConfirmation: true,
  guideColor: Colors.white,
};

type Props = {
  onSubmitCreditCard: (creditCardInformations: CreditCardInformations) => void;
  onChangeCreditCard: (value: string) => void;
  onChangeExpDate: (value: string) => void;
  isFetching: boolean;
};

const CreditCard = (props: Props) => {
  const {
    onSubmitCreditCard,
    onChangeCreditCard,
    onChangeExpDate,
    isFetching,
  } = props;
  const [creditCardNumber, setCreditCardNumber] = useState<string>();
  const [expDate, setExpDate] = useState<string>('');
  const [cvc, setCVC] = useState<string>();
  const [error, setError] = useState({
    number: false,
    expDate: false,
    cvc: false,
  });

  const scanCard = () => {
    // CardIOModule.scanCard(scanCardConfig)
    //   .then((card) => {
    //     creditCardNumberManager(card.cardNumber);
    //     const month =
    //       card.expiryMonth < 10 ? `0${card.expiryMonth}` : card.expiryMonth;
    //     const year = card.expiryYear.toString().substr(2);
    //     setExpDate(`${month}/${year}`);
    //     onChangeExpDate(`${month}/${year}`);
    //   })
    //   .catch(() => {
    //     console.log('cancel');
    //   });
  };

  const creditCardNumberManager = (number: string) => {
    setError({...error, number: false});
    onChangeCreditCard(number);
    setCreditCardNumber(
      number
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  };

  const expirationDateManager = (number: string) => {
    setError({...error, expDate: false});
    const currentYear = parseInt(
      new Date().getFullYear().toString().substr(2),
      10,
    );
    const expirationYear = parseInt(number.substr(3, expDate.length), 10);
    const expirationMonth = parseInt(number.substr(0, 2), 10);
    if (expirationMonth < 1 || expirationMonth > 12) {
      setError({...error, expDate: true});
    }
    if (
      (expirationYear < currentYear || expirationYear > currentYear + 4) &&
      expDate.length === 4
    ) {
      setError({...error, expDate: true});
    }
    if (number.indexOf('.') >= 0 || number.length > 5) {
      return;
    }
    if (number.length === 2 && expDate.length === 1) {
      number += '/';
    }
    setExpDate(number);
    onChangeExpDate(number);
  };

  const cvcManager = (number: string) => {
    setError({...error, cvc: false});
    setCVC(number);
  };

  const getCreditCardInformation = (): CreditCardInformations => ({
    cardNumber: creditCardNumber,
    expMonth: parseInt(expDate.slice(0, 2), 10),
    expYear: parseInt(expDate.slice(3, expDate.length), 10),
    cvcNumber: cvc,
  });

  const handleSubmitCreditCardPress = () => {
    let isValid = true;
    if (creditCardNumber?.length !== 19) {
      setError({...error, number: true});
      isValid = false;
    }
    if (expDate.length !== 5) {
      setError({...error, expDate: true});
      isValid = false;
    }
    if (cvc?.length !== 3) {
      setError({...error, cvc: true});
      isValid = false;
    }
    if (isValid && !isFetching) {
      onSubmitCreditCard(getCreditCardInformation());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numéro de carte</Text>
      <View>
        <SimpleInput
          onChangeText={creditCardNumberManager}
          value={creditCardNumber}
          placeholder="4242 4242 4242 4242"
        />
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            onPress={scanCard}
            style={styles.touchableContainer}>
            <Ionicons name="camera" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.row}>
        <View style={[styles.embedInput, styles.marginRight]}>
          <Text style={styles.label}>Expire le</Text>
          <SimpleInput
            onChangeText={expirationDateManager}
            value={expDate}
            placeholder="MM/YY"
          />
        </View>
        <View style={styles.embedInput}>
          <Text style={styles.label}>Code CVC</Text>
          <SimpleInput
            onChangeText={cvcManager}
            value={cvc}
            placeholder="123"
          />
        </View>
      </View>
      <Button
        backgroundColor={Colors.primary}
        value={'Save card'}
        textColor={Colors.white}
        onPress={handleSubmitCreditCardPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    color: Colors.dark,
    fontFamily: 'poppins',
    paddingVertical: 10,
  },
  embedInput: {
    flex: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  touchableContainer: {
    position: 'absolute',
    width: 32,
    height: 32,
    right: 5,
    bottom: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  marginRight: {
    marginRight: 20,
  },
});

export default CreditCard;
