import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {FeatureType} from '../types';

type Props = {
  feature: FeatureType;
  onPress?: () => void;
  isActive?: boolean;
};

const Feature = (props: Props) => {
  const {feature, onPress, isActive} = props;

  const handleFeaturePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={handleFeaturePress}>
      <View style={[styles.feature, isActive && styles.featureActive]}>
        <Image source={{uri: feature.image}} style={styles.featureIcon} />
        <Text
          style={[styles.featureTitle, isActive && styles.featureTitleActive]}>
          {feature.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
