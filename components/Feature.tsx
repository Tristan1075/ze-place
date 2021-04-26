import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {FeatureType} from '../types';

type Props = {
  feature: FeatureType;
  onPress?: () => void;
};

const Feature = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const {feature, onPress} = props;

  const handleFeaturePress = () => {
    console.log(feature);
    setIsActive(!isActive);
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.feature, isActive && styles.featureActive]}
      onPress={handleFeaturePress}>
      <Image source={feature.icon.url} style={styles.featureIcon} />
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
