import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import {Place} from '../types';
import Layout from '../constants/Layout';

type Props = {
  onPress: () => void;
  place: Place;
};

const CardWithRate = (props: Props) => {
  const {onPress, place} = props;
  return (
    <TouchableWithoutFeedback style={styles.carouselItem} onPress={onPress}>
      <View style={styles.shadow}>
        <Image source={{uri: place.images[0].url}} style={styles.image} />
        <View style={styles.rate}>
          <Ionicons size={14} name="star" color={Colors.yellow} />
          <Text style={styles.rateValue}>{place.rate}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.subtitle}>{place.location.city}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    position: 'relative',
  },
  shadow: {
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  rate: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateValue: {
    color: Colors.white,
    fontFamily: 'poppins-bold',
  },
  image: {
    backgroundColor: Colors.white,
    width: 220,
    height: 300,
    borderRadius: 15,
  },
  content: {
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  title: {
    fontFamily: 'oswald',
    fontSize: 24,
    color: Colors.white,
  },
  subtitle: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: Colors.white,
  },
});

export default CardWithRate;
