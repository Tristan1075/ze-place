import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Platform} from 'react-native';

//@ts-ignore
import {ModalContent, BottomModal} from 'react-native-modals';

import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {Ionicons} from '@expo/vector-icons';
import CalendarPicker from '../../components/CalendarPicker';
import Feature from '../../components/Feature';
import {ModalContext} from '../../providers/modalContext';
import SelectPlaceTypeScreen from '../SelectPlaceTypeScreen';
import SelectableItem from '../../components/SelectableItem';
import {CreatePlaceForm, FeatureType, PlaceType} from '../../types';
import Constants from '../../utils/Constants';
import FeatureList from '../../components/FeatureList';
import {getPlaceFeatures} from '../../api/type-features';
import i18n from 'i18n-js';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const PlaceInformations = (props: Props) => {
  const {prevStep, nextStep, createPlaceForm, setCreatePlaceForm} = props;
  const {handleModal} = useContext(ModalContext);
  const [minDate, setMinDate] = useState<string>();
  const [features, setFeatures] = useState<FeatureType[]>([]);

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
        placeholder={i18n.t('place_information_place_type_placeholder')}
        value={createPlaceForm.placeType?.name}
        isEditable={false}
        onPress={handleSelectPlaceType}
        suffix={<Ionicons name="chevron-down" size={20} color={Colors.dark} />}
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
        onChangeText={(value) =>
          setCreatePlaceForm({...createPlaceForm, surface: value})
        }
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
        onChangeText={(value) =>
          setCreatePlaceForm({...createPlaceForm, price: value})
        }
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
        onChangeText={(value) =>
          setCreatePlaceForm({...createPlaceForm, description: value})
        }
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
        onlyOne={false}
      />
      <TitleWithDescription
        title={i18n.t('place_information_availability_title')}
        description={i18n.t('place_information_availability_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <CalendarPicker
        startDate={createPlaceForm.startDate}
        endDate={createPlaceForm.endDate}
        minDate={minDate}
        showDates={true}
        onChange={(startDate, endDate, duration) => {
          startDate && setMinDate(startDate);
          if (duration) {
            setCreatePlaceForm({
              ...createPlaceForm,
              startDate: startDate,
              endDate: endDate,
            });
          }
        }}
      />
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
    marginTop: 80,
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
});

export default PlaceInformations;
