import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {
  onPress?: () => void;
  onChange?: () => void;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder: string;
  isEditable?: boolean;
  value?: string;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  suffix?: any;
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
    suffix,
  } = props;

  return (
    <View style={styles.flex}>
      <View style={styles.inputContainer}>
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
        {suffix}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...Layout.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
  },
  input: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    fontFamily: 'poppins',
  },
  textArea: {
    flex: 1,
    height: 100,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'poppins',
    marginVertical: 10,
  },
  error: {
    paddingBottom: 10,
    color: Colors.error,
    fontFamily: 'poppins',
  },
});

export default SimpleInput;
