import {Ionicons} from '@expo/vector-icons';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
// @ts-ignore
import Slider from 'react-native-slider';
import i18n from 'i18n-js';

import {searchPlaces} from '../api/places';
import Button from '../components/Button';
import Feature from '../components/Feature';
import Modal from '../components/Modal';
import SearchCard from '../components/SearchCard';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import {features} from '../mocks';
import {
  FeatureType,
  Location,
  PlaceType,
  FilterForm,
  HomeParamList,
} from '../types';

import SearchPlaceScreen from './SearchPlaceScreen';
import SelectPlaceTypeScreen from './SelectPlaceTypeScreen';
import {getPlaceFeatures} from '../api/type-features';

type HomeScreenNavigationProp = StackNavigationProp<HomeParamList, 'PlaceList'>;

type Props = {
  onSearchPress: (filter: FilterForm) => void;
};

const SearchFilterScreen = ({onSearchPress}: Props) => {
  // const {navigation} = props;
  const [showSearchLocation, setShowSearchLocation] = useState<boolean>(false);
  const [showPlaceType, setShowPlaceType] = useState<boolean>(false);
  const [filterForm, setFilterForm] = useState<FilterForm>({
    price: undefined,
    surface: undefined,
    features: [],
    placeType: undefined,
    location: undefined,
  });
  const [features, setFeatures] = useState<FeatureType[]>([]);
  useEffect(() => {
    const getCardType = async () => setFeatures(await getPlaceFeatures());
    getCardType();
  }, []);

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

  const handleSearchPress = async () => {
    const places = await searchPlaces(filterForm);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollView}>
        <View style={styles.paddingHorizontal}>
          <TitleWithDescription
            title={i18n.t('search_filter_type')}
            subtitle={true}
          />
          
              <SimpleInput
                style={styles.input}
                placeholder={i18n.t('search_filter_choose_type')}
                value={filterForm.placeType?.name}
                isEditable={false}
                onPress={() => setShowPlaceType(true)}
                suffix={
                  <Ionicons name="chevron-down" size={20} color={Colors.dark} />
                }
              />
              
          
          <TitleWithDescription
            title={i18n.t('search_filter_price')}
            subtitle={true}
            description={i18n.t('search_filter_maximum_price')}
          />
          <Slider
            minimumValue={0}
            maximumValue={3000}
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
            title={i18n.t('search_filter_surface')}
            subtitle={true}
            description={i18n.t('search_filter_minimum_surface')}
          />
          <SimpleInput
            placeholder={i18n.t('search_filter_enter_surface')}
            style={styles.input}
            suffix={<Text>m²</Text>}
            type="number-pad"
            onChangeText={(value) =>
              setFilterForm({...filterForm, surface: parseInt(value, 10)})
            }
          />
          <TitleWithDescription
            title={i18n.t('search_filter_select_feature')}
            subtitle={true}
          />
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featureList}>
          {features &&
            features.map((feature, index) => (
              <Feature
                feature={feature}
                key={index}
                isActive={filterForm.features.includes(feature)}
                onPress={() => handleFeaturePress(feature)}
              />
            ))}
        </ScrollView>
        <View style={styles.paddingHorizontal}>
          <TitleWithDescription
            title={i18n.t('search_filter_location')}
            subtitle={true}
          />
          <View style={styles.input}>
          
              <SimpleInput
                placeholder={i18n.t('search_filter_search')}
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
            value={i18n.t('search_filter_search')}
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
    paddingTop: 100,
  },
  center: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
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
    paddingBottom: 80,
  },
  featureList: {
    paddingLeft: 20,
  },
});

export default SearchFilterScreen;
