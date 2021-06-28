import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
type Props = {
  message: string;
  value: string;
};

const ProfilText = (props: Props) => {
  const {message} = props;
  const {value} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    fontFamily: 'poppins-light',
    fontSize: 14,
    color: Colors.dark,
    flex: 1,
  },
  subtitle: {
    fontFamily: 'poppins-light',
    fontSize: 14,
    color: Colors.gray,
  },
});

export default ProfilText;
