import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {Ionicons} from '@expo/vector-icons';
import CalendarPicker from '../../components/CalendarPicker';
import {features} from '../../mocks';
import Feature from '../../components/Feature';
import {ModalContext} from '../../providers/modalContext';
import SelectPlaceTypeScreen from '../SelectPlaceTypeScreen';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

const PlaceInformations = (props: Props) => {
  const navigation = useNavigation();
  const {handleModal} = useContext(ModalContext);

  const handleSelectPlaceType = () => {
    handleModal({child: <SelectPlaceTypeScreen />});
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Place type"
        description="What is the type of the ?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        placeholder="Choose"
        isEditable={false}
        onPress={handleSelectPlaceType}
        suffix={<Ionicons name="chevron-down" size={20} color={Colors.dark} />}
      />
      <TitleWithDescription
        title="Surface"
        description="How many square meters is your place ?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput placeholder="Enter the size in m2" />
      <TitleWithDescription
        title="Price"
        description="How much do you want to rent your place ?"
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
        {features.map((feature, index) => (
          <Feature feature={feature} key={index} />
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
    marginLeft: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...Layout.shadow,
  },
  text: {
    fontFamily: 'poppins',
    marginRight: 10,
  },
  facilitiesContainer: {
    marginVertical: 20,
  },
});

export default PlaceInformations;
