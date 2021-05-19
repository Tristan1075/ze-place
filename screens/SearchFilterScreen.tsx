import {Ionicons} from '@expo/vector-icons';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Slider from 'react-native-slider';

import Button from '../components/Button';

import Feature from '../components/Feature';
import Modal from '../components/Modal';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';

import Colors from '../constants/Colors';
import {features} from '../mocks';
import {ModalContext} from '../providers/modalContext';
import {FeatureType, PlaceType} from '../types';
import SelectPlaceTypeScreen from './SelectPlaceTypeScreen';

type FilterForm = {
  placeType?: PlaceType;
  price: number;
  surface: string;
  features: Array<FeatureType>;
};

const SearchFilterScreen = () => {
  const [filterForm, setFilterForm] = useState<FilterForm>({
    price: 0,
    surface: '',
    features: [],
    placeType: {
      id: '',
      name: '',
    },
  });
  const [showPlaceType, setShowPlaceType] = useState<boolean>(false);

  const handlePlaceTypePress = (type: PlaceType) => {
    setFilterForm({...filterForm, placeType: type});
    setShowPlaceType(false);
  };

  const handleFeaturePress = (feature: FeatureType) => {
    if (filterForm.features.includes(feature)) {
      setFilterForm({
        ...filterForm,
        features: filterForm.features.filter((item) => item !== feature),
      });
    } else {
      setFilterForm({
        ...filterForm,
        features: [...filterForm.features, feature],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <TitleWithDescription title="Type" subtitle={true} />
        <SimpleInput
          style={styles.input}
          placeholder="Choose a place type"
          value={filterForm.placeType?.name}
          isEditable={false}
          onPress={() => setShowPlaceType(true)}
          suffix={
            <Ionicons name="chevron-down" size={20} color={Colors.dark} />
          }
        />
        <TitleWithDescription
          title="Price"
          subtitle={true}
          description="Set the maximum price"
        />
        <Slider
          minimumValue={0}
          maximumValue={10000}
          value={filterForm.price}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.primary}
          onValueChange={(value: number) =>
            setFilterForm({...filterForm, price: value})
          }
        />
        <Text style={styles.price}>
          {filterForm.price.toFixed(0).toString()}€
        </Text>
        <TitleWithDescription
          title="Surface"
          subtitle={true}
          description="Set the minimum size"
        />
        <SimpleInput
          placeholder="Enter the size"
          style={styles.input}
          suffix={<Text>m²</Text>}
          type="number-pad"
          onChangeText={(value) =>
            setFilterForm({...filterForm, surface: value})
          }
        />
        <TitleWithDescription title="Select a feature" subtitle={true} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {features.map((feature, index) => (
            <Feature
              feature={feature}
              key={index}
              isActive={filterForm.features.includes(feature)}
              onPress={() => handleFeaturePress(feature)}
            />
          ))}
        </ScrollView>
        <Button
          value="Search"
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          onPress={() => {}}
        />
      </View>
      <Modal
        visible={showPlaceType}
        child={
          <SelectPlaceTypeScreen onPlaceTypePress={handlePlaceTypePress} />
        }
        handleModal={() => setShowPlaceType(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: 140,
  },
  center: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  input: {
    paddingVertical: 20,
  },
  price: {
    textAlign: 'right',
    fontFamily: 'poppins',
  },
});

export default SearchFilterScreen;
