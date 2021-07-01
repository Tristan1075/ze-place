import {AntDesign, Ionicons} from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

type Props = {
  type?: string;
  name: string;
  number: string;
  expDate?: string;
  available?: boolean;
  index?: number;
  isDefault?: boolean;
  onAddPress?: () => void;
};

const visa = require('../assets/icons/visa.png');
const paypal = require('../assets/icons/paypal.png');
const mastercard = require('../assets/icons/mastercard.png');

const CreditCardBloc = ({
  type,
  name,
  number,
  expDate,
  isDefault,
  onAddPress,
}: Props) => {
  const [card, setCard] = useState({
    backgroundColor: Colors.primary,
    transparentColor: 'rgba(10, 142, 153, 0.32)',
    logo: visa,
  });

  useEffect(() => {
    if (type) {
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
        case 'add_card':
          setCard({
            backgroundColor: Colors.primaryDark,
            transparentColor: 'rgba(255, 255, 255, 0.3)',
            logo: undefined,
          });
          break;
        default:
          setCard({
            backgroundColor: Colors.primary,
            transparentColor: 'rgba(10, 142, 153, 0.32)',
            logo: visa,
          });
      }
    }
  }, [type]);

  return (
    <TouchableWithoutFeedback onPress={onAddPress && onAddPress}>
      <View
        style={[
          styles.creditCardBloc,
          {backgroundColor: card.backgroundColor},
        ]}>
        <View
          style={[styles.leftCircle, {backgroundColor: card.transparentColor}]}
        />
        <View
          style={[styles.rightCircle, {backgroundColor: card.transparentColor}]}
        />
        {isDefault ? (
          <AntDesign
            name="checkcircle"
            size={28}
            color={Colors.white}
            style={styles.default}
          />
        ) : (
          <View style={styles.invisibleSpace} />
        )}
        <Text style={styles.creditCardNumber}>
          {!number && '...XXXX'}
          {type !== 'add_card' && number}
        </Text>
        {type === 'add_card' && (
          <View style={styles.addContainer}>
            <Ionicons name="add-circle" size={60} color={Colors.white} />
          </View>
        )}
        <Text style={styles.expDate}>{expDate}</Text>
        <Image source={card.logo} />
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: 'center',
  },
  creditCardName: {
    fontFamily: 'poppins',
    fontSize: 14,
    lineHeight: 22,
    paddingVertical: 7,
    color: Colors.white,
  },
  creditCardNumber: {
    fontFamily: 'poppins',
    fontSize: 16,
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
    fontFamily: 'poppins-bold',
    fontSize: 15,
    lineHeight: 16,
    color: Colors.white,
    alignSelf: 'center',
  },
  invisibleSpace: {
    paddingVertical: 14,
  },
  addContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default CreditCardBloc;
