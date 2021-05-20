import {Ionicons} from '@expo/vector-icons';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import Slider from 'react-native-slider';

import Button from '../components/Button';
import Feature from '../components/Feature';
import Modal from '../components/Modal';
import SearchCard from '../components/SearchCard';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';

import Colors from '../constants/Colors';
import {features} from '../mocks';
import {FeatureType, Location, PlaceType, FilterForm} from '../types';

import SearchPlaceScreen from './SearchPlaceScreen';
import SelectPlaceTypeScreen from './SelectPlaceTypeScreen';

type Props = {
  onSearchPress: (filter: FilterForm) => void;
};

const SearchFilterScreen = ({onSearchPress}: Props) => {
  const [showSearchLocation, setShowSearchLocation] = useState<boolean>(false);
  const [showPlaceType, setShowPlaceType] = useState<boolean>(false);
  const [filterForm, setFilterForm] = useState<FilterForm>({
    price: undefined,
    surface: undefined,
    features: [],
    placeType: undefined,
    location: undefined,
  });

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

  const handleLocationPress = (location: Location) => {
    setFilterForm({...filterForm, location: location});
    setShowSearchLocation(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollView}>
        <View style={styles.paddingHorizontal}>
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
            {filterForm.price && filterForm.price.toFixed(0).toString()}€
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
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featureList}>
          {features.map((feature, index) => (
            <Feature
              feature={feature}
              key={index}
              isActive={filterForm.features.includes(feature)}
              onPress={() => handleFeaturePress(feature)}
            />
          ))}
        </ScrollView>
        <View style={styles.paddingHorizontal}>
          <TitleWithDescription title="Location" subtitle={true} />
          <View style={styles.input}>
            <SimpleInput
              placeholder="Search"
              isEditable={false}
              onPress={() => setShowSearchLocation(true)}
              suffix={
                <Ionicons name="chevron-down" size={20} color={Colors.dark} />
              }
            />
          </View>
          {filterForm.location && (
            <SearchCard
              title={filterForm.location?.address}
              description={`${filterForm.location?.postalCode} ${filterForm.location?.city}`}
              subdescription={filterForm.location?.country}
            />
          )}
          <Button
            value="Search"
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            onPress={() => onSearchPress(filterForm)}
            style={styles.marginVertical}
          />
        </View>
      </ScrollView>
      <Modal
        visible={showPlaceType}
        child={
          <SelectPlaceTypeScreen onPlaceTypePress={handlePlaceTypePress} />
        }
        handleModal={() => setShowPlaceType(false)}
      />
      <Modal
        visible={showSearchLocation}
        child={<SearchPlaceScreen onLocationPress={handleLocationPress} />}
        handleModal={() => setShowSearchLocation(false)}
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
    paddingTop: 130,
  },
  center: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
  },
  input: {
    paddingVertical: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  price: {
    textAlign: 'right',
    fontFamily: 'poppins',
  },
  marginVertical: {
    marginVertical: 20,
  },
  contentScrollView: {
    paddingBottom: 50,
  },
  featureList: {
    paddingLeft: 20,
    marginVertical: 20,
  },
});

export default SearchFilterScreen;
