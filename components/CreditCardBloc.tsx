import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  type: string;
  name: string;
  number: string;
  expDate?: string;
  available?: boolean;
  index?: number;
  isDefault?: boolean;
};

const visa = require('../assets/icons/visa.png');
const paypal = require('../assets/icons/paypal.png');
const mastercard = require('../assets/icons/mastercard.png');

const CreditCardBloc = ({
  type,
  name,
  number,
  available,
  expDate,
  isDefault,
}: Props) => {
  const [card, setCard] = useState({
    backgroundColor: '',
    transparentColor: '',
    logo: visa,
  });

  useEffect(() => {
    switch (type) {
      case 'visa':
        setCard({
          backgroundColor: Colors.primary,
          transparentColor: 'rgba(10, 142, 153, 0.32)',
          logo: visa,
        });
        break;
      case 'paypal':
        setCard({
          backgroundColor: Colors.yellow,
          transparentColor: 'rgba(2, 94, 155, 0.29)',
          logo: paypal,
        });
        break;
      case 'mastercard':
        setCard({
          backgroundColor: Colors.error,
          transparentColor: 'rgba(6, 156, 233, 0.32)',
          logo: mastercard,
        });
        break;
      default:
        setCard({
          backgroundColor: Colors.primary,
          transparentColor: 'rgba(10, 142, 153, 0.32)',
          logo: visa,
        });
    }
  }, [type]);

  return (
    <View
      style={[styles.creditCardBloc, {backgroundColor: card.backgroundColor}]}>
      {/* {!available && <Image source={notif} style={styles.notif} />} */}
      <View
        style={[styles.leftCircle, {backgroundColor: card.transparentColor}]}
      />
      <View
        style={[styles.rightCircle, {backgroundColor: card.transparentColor}]}
      />
      {isDefault ? (
        <Text style={styles.creditCardName}>{name}</Text>
      ) : (
        <View style={styles.invisibleSpace} />
      )}
      <Text style={styles.creditCardNumber}>
        {!number && '...XXXX'}
        {number}
      </Text>
      <Text style={styles.expDate}>{expDate}</Text>
      <Image source={card.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  creditCardBloc: {
    borderRadius: 20,
    height: 200,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  creditCardName: {
    fontFamily: 'Metropolis-Medium',
    fontSize: 14,
    lineHeight: 22,
    paddingVertical: 7,
    color: Colors.white,
  },
  creditCardNumber: {
    fontFamily: 'Metropolis-SemiBold',
    fontSize: 16,
    lineHeight: 16,
    color: Colors.white,
    flex: 2,
  },
  leftCircle: {
    position: 'absolute',
    left: -80,
    width: 220,
    height: 220,
    borderBottomLeftRadius: 320,
    borderTopLeftRadius: 320,
    borderTopRightRadius: 320,
    borderBottomRightRadius: 320,
  },
  rightCircle: {
    position: 'absolute',
    right: -80,
    bottom: -80,
    width: 220,
    height: 220,
    borderBottomLeftRadius: 320,
    borderTopLeftRadius: 320,
    borderTopRightRadius: 320,
    borderBottomRightRadius: 320,
  },
  notif: {
    position: 'absolute',
    right: 5,
    top: 10,
  },
  expDate: {
    flex: 1,
    fontFamily: 'Metropolis-SemiBold',
    fontSize: 15,
    lineHeight: 16,
    color: Colors.white,
    alignSelf: 'center',
  },
  invisibleSpace: {
    paddingVertical: 14,
  },
});

export default CreditCardBloc;
