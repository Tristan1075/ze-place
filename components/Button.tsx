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
};

const Button = (props: Props) => {
  const {onPress, backgroundColor, textColor, style} = props;
  return (
    <View style={styles.shadow}>
      <TouchableOpacity
        style={[styles.container, {backgroundColor}, style]}
        onPress={onPress}>
        <Text style={[styles.text, {color: textColor}]}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.84,
    elevation: 5,
  },
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 20,
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
    fontFamily: 'poppins-bold',
    color: Colors.primary,
  },
});

export default Button;
