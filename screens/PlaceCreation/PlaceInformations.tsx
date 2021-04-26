import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from '../../components/CalendarPicker';
import {facilities} from '../../mocks';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

const PlaceInformations = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Place type"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput placeholder="Choose" />
      <TitleWithDescription
        title="Size"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput placeholder="Type your size in m2" />
      <TitleWithDescription
        title="Price"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <View style={styles.row}>
        <SimpleInput placeholder="Type your price" />
        <View style={styles.durationBloc}>
          <Text style={styles.text}>Day</Text>
          <Ionicons name="chevron-down" size={20} color={Colors.dark} />
        </View>
      </View>
      <TitleWithDescription
        title="Description"
        description="Description of your !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput placeholder="Choose" multiline={true} numberOfLines={1} />
      <TitleWithDescription
        title="Features"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.facilitiesContainer}>
        {facilities.map((facility, index) => (
          <View style={styles.facilities} key={index}>
            <Image source={facility.url} style={styles.facilityIcon} />
            <Text style={styles.facilityTitle}>Stockage</Text>
          </View>
        ))}
      </ScrollView>
      <TitleWithDescription
        title="Availability"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <CalendarPicker />
      <View style={styles.row}>
        <Button
          value="Back"
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          onPress={props.prevStep}
          style={{marginRight: 10}}
        />
        <Button
          value="Continue"
          backgroundColor={Colors.dark}
          textColor={Colors.white}
          onPress={props.nextStep}
          style={{marginLeft: 10}}
        />
      </View>
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
  map: {
    height: 120,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  durationBloc: {
    marginLeft: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: 100,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...Layout.shadow,
  },
  text: {
    fontFamily: 'poppins',
    marginRight: 5,
  },
  facilities: {
    backgroundColor: 'rgb(228, 236, 249)',
    marginRight: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  facilityTitle: {
    fontFamily: 'poppins-light',
    fontSize: 12,
    color: Colors.secondary,
  },
  facilitiesContainer: {
    marginVertical: 20,
  },
});

export default PlaceInformations;
