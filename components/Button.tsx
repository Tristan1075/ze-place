import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  style?: ViewStyle;
  value: string;
  isFetching?: boolean;
};

const Button = (props: Props) => {
  const {
    onPress,
    backgroundColor,
    textColor,
    style,
    value,
    isFetching = false,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}, style]}
      onPress={onPress}>
      {isFetching ? (
        <Flow size={20} color={textColor} />
      ) : (
        <Text style={[styles.text, {color: textColor}]}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    ...Layout.shadow,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 50,
  },
  text: {
    fontFamily: 'poppins-semiBold',
    color: Colors.primary,
  },
});

export default Button;
