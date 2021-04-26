import React from 'react';
import {View, Text, StyleSheet, Image, ViewStyle} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Button from './Button';

type Props = {
  title: string;
  description: string;
  style?: ViewStyle;
  subtitle?: boolean;
};

const TitleWithDescription = (props: Props) => {
  const {title, description, style, subtitle} = props;
  return (
    <View style={style}>
      <Text style={subtitle ? styles.subtitle : styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.dark,
    fontFamily: 'oswald-bold',
    fontSize: 24,
  },
  subtitle: {
    color: Colors.dark,
    fontFamily: 'oswald-light',
    fontSize: 20,
  },
  description: {
    color: Colors.gray,
    fontFamily: 'poppins',
  },
});

export default TitleWithDescription;
