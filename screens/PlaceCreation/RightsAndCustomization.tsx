import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {PlaceType} from '../types';
import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from '../../utils/mapStyle';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  prevStep: () => void;
};

const RightsAndCustomization = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Images"
        description="Choose images to describe your place"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <TouchableOpacity style={styles.buttonImage}>
        <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Button
        value="Back"
        backgroundColor={Colors.dark}
        textColor={Colors.white}
        onPress={props.prevStep}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  buttonImage: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    fontFamily: 'poppins-bold',
    color: Colors.dark,
    marginRight: 25,
    marginLeft: 25,
  },
});

export default RightsAndCustomization;
