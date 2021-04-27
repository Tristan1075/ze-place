import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  style?: ViewStyle;
  value: string;
};

const Button = (props: Props) => {
  const {onPress, backgroundColor, textColor, style, value} = props;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}, style]}
      onPress={onPress}>
      <Text style={[styles.text, {color: textColor}]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: 'poppins-semiBold',
    color: Colors.primary,
  },
});

export default Button;
