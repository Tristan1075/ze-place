import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ViewStyle, View} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  rate: string;
}

const RatingStars = (props: Props) => {
  const {rate} =  props;
  console.log(rate);
  return(
    <View style={styles.shadow}>
      
    </View>
  );
};


const styles = StyleSheet.create({
  
});

export default RatingStars;