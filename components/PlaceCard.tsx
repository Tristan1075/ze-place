import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import {Place} from '../types';
import {Rating} from 'react-native-ratings';
import Layout from '../constants/Layout';
import i18n from 'i18n-js';

type Props = {
  onFavoritePress?: (place: Place) => void;
  onPress: () => void;
  place: Place;
  isFavorite: boolean;
};

const PlaceCard = (props: Props) => {
  const {place, onPress, onFavoritePress, isFavorite} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: place.images[0].url}} style={styles.image} />
      <View style={styles.informations}>
        <View style={styles.row}>
          <Text style={styles.title}>{place.title}</Text>
          {onFavoritePress && (
            <TouchableOpacity onPress={() => onFavoritePress(place)}>
              <Ionicons
                size={28}
                name="heart-circle"
                color={isFavorite ? Colors.primary : Colors.gray}
                style={styles.locationIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.row}>
          <Ionicons
            size={12}
            name="map"
            color={Colors.primary}
            style={styles.locationIcon}
          />
          <Text style={styles.location}>{place.location.city}</Text>
        </View>
        <View style={styles.row}>
          <Rating
            startingValue={place.rate}
            imageSize={10}
            tintColor={Colors.white}
          />
          <Text style={styles.rate}>{place.rate}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{place.price}€</Text>
          <Text style={styles.durationType}>
            {i18n.t('component_place_card_day')}
          </Text>
          {/* <Text style={styles.badge}>Place available</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...Layout.shadow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  locationIcon: {
    marginRight: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  informations: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'oswald',
    color: Colors.dark,
    fontSize: 16,
    flex: 1,
  },
  location: {
    fontFamily: 'poppins',
    color: Colors.dark,
    fontSize: 12,
  },
  footer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'poppins',
    color: Colors.secondary,
    fontSize: 12,
  },
  durationType: {
    fontFamily: 'poppins',
    color: Colors.gray,
    fontSize: 12,
    flex: 1,
  },
  badge: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    overflow: 'hidden',
  },
  rate: {
    paddingLeft: 5,
    fontFamily: 'poppins',
    color: Colors.primary,
    fontSize: 10,
  },
});

export default PlaceCard;
