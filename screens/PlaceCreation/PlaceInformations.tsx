import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {Ionicons} from '@expo/vector-icons';
import {ModalContext} from '../../providers/modalContext';
import SelectPlaceTypeScreen from '../SelectPlaceTypeScreen';
import {CreatePlaceForm, FeatureType, Place, PlaceType} from '../../types';
import FeatureList from '../../components/FeatureList';
import {getPlaceFeatures} from '../../api/type-features';
import i18n from 'i18n-js';

type Props = {
  place?: Place;
  prevStep: () => void;
  nextStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
  errors?: CreatePlaceForm;
  setErrors: Dispatch<SetStateAction<any>>;
};

const PlaceInformations = (props: Props) => {
  const {
    prevStep,
    nextStep,
    createPlaceForm,
    setCreatePlaceForm,
    place,
    errors,
    setErrors,
  } = props;
  const {handleModal} = useContext(ModalContext);
  const [minDate, setMinDate] = useState<string>();
  const [features, setFeatures] = useState<FeatureType[]>([]);

  useEffect(() => {
    if (place) {
    }
  }, []);

  const handleSelectPlaceType = () => {
    handleModal({
      child: <SelectPlaceTypeScreen onPlaceTypePress={handlePlaceTypePress} />,
    });
  };
  useEffect(() => {
    const getCardType = async () => setFeatures(await getPlaceFeatures());
    getCardType();
  }, []);

  const handlePlaceTypePress = (type: PlaceType) => {
    setCreatePlaceForm({...createPlaceForm, placeType: type});
    setErrors({...errors, placeType: undefined});
    handleModal();
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title={i18n.t('place_information_place_type_title')}
        description={i18n.t('place_information_place_type_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        isEditable={false}
        placeholder={i18n.t('place_information_place_type_placeholder')}
        value={createPlaceForm.placeType?.name}
        onPress={handleSelectPlaceType}
        suffix={<Ionicons name="chevron-down" size={20} color={Colors.dark} />}
        error={errors?.placeType?.toString()}
      />
      <TitleWithDescription
        title={i18n.t('place_information_surface_title')}
        description={i18n.t('place_information_surface_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        value={createPlaceForm.surface}
        placeholder={i18n.t('place_information_surface_placeholder')}
        type="number-pad"
        suffix={<Text style={styles.descriptionText}>m²</Text>}
        onChangeText={(value) => {
          setCreatePlaceForm({...createPlaceForm, surface: value});
          setErrors({...errors, surface: ''});
        }}
        error={errors?.surface}
      />
      <TitleWithDescription
        title={i18n.t('place_information_price_title')}
        description={i18n.t('place_information_price_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        value={createPlaceForm.price}
        placeholder={i18n.t('place_information_price_placeholder')}
        style={styles.flex}
        suffix={<Text style={styles.descriptionText}>€</Text>}
        type="number-pad"
        onChangeText={(value) => {
          setCreatePlaceForm({...createPlaceForm, price: value});
          setErrors({...errors, price: ''});
        }}
        error={errors?.price}
      />
      <TitleWithDescription
        title={i18n.t('place_information_description_title')}
        description={i18n.t('place_information_description_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        placeholder={i18n.t('place_information_description_placeholder')}
        multiline={true}
        numberOfLines={1}
        value={createPlaceForm.description}
        onChangeText={(value) => {
          setCreatePlaceForm({...createPlaceForm, description: value});
          setErrors({...errors, surface: ''});
        }}
        error={errors?.description}
      />
      <TitleWithDescription
        title={i18n.t('place_information_feature_title')}
        description={i18n.t('place_information_feature_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <FeatureList
        features={features}
        list={createPlaceForm}
        onChange={setCreatePlaceForm}
        updateError={() => setErrors({...errors, features: undefined})}
        onlyOne={false}
      />
      {errors?.features && <Text style={styles.error}>{errors?.features}</Text>}
      <View style={styles.row}>
        <Button
          value={i18n.t('place_information_back')}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
          onPress={prevStep}
          style={{marginRight: 10, flex: 1}}
        />
        <Button
          value={i18n.t('place_information_continue')}
          backgroundColor={Colors.dark}
          textColor={Colors.white}
          onPress={nextStep}
          style={{marginLeft: 10, flex: 1}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  paddingVertical: {
    paddingVertical: 20,
  },
  map: {
    height: 120,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 20,
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
  bottomModal: {
    paddingBottom: 40,
  },
  descriptionText: {
    color: Colors.gray,
  },
  error: {
    color: Colors.error,
    fontFamily: 'poppins',
    fontSize: 14,
    paddingTop: 10,
  }
});

export default PlaceInformations;
