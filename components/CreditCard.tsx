import {Ionicons} from '@expo/vector-icons';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {CardIOModule} from 'react-native-awesome-card-io';

import Colors from '../constants/Colors';
import {CreditCardInformations} from '../types';

import Button from './Button';

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
        <TextInput
          style={[styles.input, error.number && styles.error]}
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={19}
          returnKeyType="next"
          textContentType="creditCardNumber"
          value={creditCardNumber}
          onChangeText={(number) => creditCardNumberManager(number)}
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
          <TextInput
            style={[styles.input, error.expDate && styles.error]}
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={5}
            returnKeyType="next"
            textContentType="none"
            value={expDate}
            placeholder="MM/AA"
            onChangeText={(number) => expirationDateManager(number)}
          />
        </View>
        <View style={styles.embedInput}>
          <Text style={styles.label}>Code CVC</Text>
          <TextInput
            style={[styles.input, error.cvc && styles.error]}
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={3}
            returnKeyType="done"
            textContentType="none"
            value={cvc}
            placeholder="XXX"
            onChangeText={(number) => cvcManager(number)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          backgroundColor={Colors.primary}
          value={'Confirmer'}
          textColor={Colors.white}
          onPress={handleSubmitCreditCardPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  title: {
    paddingVertical: 5,
    fontSize: 18,
    lineHeight: 20,
    color: Colors.primary,
    fontFamily: 'Avenir',
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 14,
    color: Colors.dark,
    fontFamily: 'Metropolis-Medium',
    paddingBottom: 10,
  },
  embedInput: {
    flex: 1,
    marginVertical: 10,
  },
  input: {
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: 50,
    letterSpacing: 2,
    color: Colors.dark,
    fontFamily: 'Metropolis-SemiBold',
    fontSize: 14,
    backgroundColor: Colors.lightblue,
    borderRadius: 10,
  },
  error: {
    backgroundColor: Colors.inputError,
    color: Colors.error,
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
  buttonContainer: {
    alignItems: 'center',
  },
});

export default CreditCard;
