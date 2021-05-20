import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {FeatureType} from '../types';

type Props = {
  feature: FeatureType;
  onPress?: () => void;
  isActive?: boolean;
};

export const features = [
  {
    name: 'Lunch',
    icon: {
      url: require('../assets/icons/lunch.png'),
    },
  },
  {
    name: 'Storage',
    icon: {
      url: require('../assets/icons/storage.png'),
    },
  },
  {
    name: 'Gardening',
    icon: {
      url: require('../assets/icons/garden.png'),
    },
  },
  {
    name: 'Party',
    icon: {
      url: require('../assets/icons/party.png'),
    },
  },
  {
    name: 'Parking',
    icon: {
      url: require('../assets/icons/parking.png'),
    },
  },
  {
    name: 'Work place',
    icon: {
      url: require('../assets/icons/workplace.png'),
    },
  },
  {
    name: 'Camping',
    icon: {
      url: require('../assets/icons/camping.png'),
    },
  },
  {
    name: 'Spectacle',
    icon: {
      url: require('../assets/icons/spectacle.png'),
    },
  },
];

const Feature = (props: Props) => {
  const {feature, onPress, isActive} = props;

  const handleFeaturePress = () => {
    onPress && onPress();
  };

  const getImageRessource = (item: FeatureType) => {
    const featureRessource = features.find((f) => f.name === item.name);
    return featureRessource?.icon.url;
  };

  return (
    <TouchableOpacity
      style={[styles.feature, isActive && styles.featureActive]}
      onPress={handleFeaturePress}>
      <Image source={getImageRessource(feature)} style={styles.featureIcon} />
      <Text
        style={[styles.featureTitle, isActive && styles.featureTitleActive]}>
        {feature.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  feature: {
    backgroundColor: 'rgb(228, 236, 249)',
    marginRight: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Layout.shadow,
  },
  featureActive: {
    backgroundColor: Colors.primary,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  featureTitle: {
    fontFamily: 'poppins-light',
    fontSize: 12,
    color: Colors.secondary,
  },
  featureTitleActive: {
    color: Colors.white,
    fontFamily: 'poppins-bold',
  },
});

export default Feature;
