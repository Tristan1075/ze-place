import {FontAwesome5} from '@expo/vector-icons';
import React from 'react';
import {Text, StyleSheet, View, Switch} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  onChange: (value: boolean) => void;
  title: string;
  icon: any;
  value: boolean;
};

const ToggleWithTitle = (props: Props) => {
  const {onChange, title, icon, value} = props;
  return (
    <View style={styles.row}>
      {icon}
      <Text style={[styles.text, !value && styles.error]}>{title}</Text>
      <Switch
        trackColor={{false: '#767577', true: Colors.primary}}
        thumbColor={value ? Colors.white : Colors.primary}
        ios_backgroundColor={Colors.white}
        onValueChange={(v) => onChange(v)}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  text: {
    fontFamily: 'poppins',
    color: Colors.dark,
    flex: 1,
    paddingLeft: 10,
  },
  error: {
    color: Colors.error,
  },
});

export default ToggleWithTitle;
