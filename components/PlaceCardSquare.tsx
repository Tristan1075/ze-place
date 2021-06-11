import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Place} from '../types';

const PlaceCardSquare = ({item}: {item: Place}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePlacePress(item)}>
      <ImageBackground
        source={{
          uri:
            'https://www.leden-spa-aqua-forme.fr/wp-content/uploads/2018/05/jk-placeholder-image.jpg',
        }}
        style={styles.cover}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>4</Text>
        </View>
        <View style={styles.flex} />
        <Text style={styles.title}>{item.title}</Text>
        {item.location && <Text style={styles.text}>{item.location.city}</Text>}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 150,
    backgroundColor: Colors.white,
    ...Layout.shadow,
  },
  title: {
    fontFamily: 'oswald-bold',
    color: Colors.white,
  },
  cover: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
  },
  badgeContainer: {
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  badge: {
    fontFamily: 'oswald',
    color: Colors.dark,
    fontSize: 12,
  },
  text: {
    fontFamily: 'oswald',
    color: Colors.white,
  },
});

export default PlaceCardSquare;