import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';

type Props = {
  onPress?: () => void;
  onChange?: () => void;
  onChangeText: (v: string) => void;
  error: string;
  placeholder: string;
  isEditable?: boolean;
  value?: string;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
};

const SimpleInput = (props: Props) => {
  const {
    onChange,
    onChangeText,
    onPress,
    error,
    placeholder,
    isEditable,
    value,
    secureTextEntry = false,
    numberOfLines,
    multiline,
  } = props;

  return (
    <View>
      <TextInput
        onTouchStart={onPress}
        editable={isEditable}
        onChange={onChange}
        onChangeText={onChangeText}
        style={multiline ? styles.textArea : styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor={Colors.gray}
        value={value}
        secureTextEntry={secureTextEntry}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    fontFamily: 'poppins',
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    backgroundColor: Colors.white,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    fontFamily: 'poppins',
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  error: {
    paddingBottom: 10,
    color: Colors.error,
    fontFamily: 'poppins',
  },
});

export default SimpleInput;
