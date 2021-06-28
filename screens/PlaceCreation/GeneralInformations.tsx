import React, {Dispatch, SetStateAction, useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Platform} from 'react-native';
import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {CreatePlaceForm, Location} from '../../types';
import {ModalContext} from '../../providers/modalContext';
import SearchPlaceScreen from '../SearchPlaceScreen';
import SearchCard from '../../components/SearchCard';
import {Ionicons} from '@expo/vector-icons';
import i18n from 'i18n-js';

type Props = {
  nextStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const GeneralInformations = (props: Props) => {
  const {nextStep, createPlaceForm, setCreatePlaceForm} = props;
  const {handleModal} = useContext(ModalContext);

  const handleMapPress = () => {
    handleModal({
      child: <SearchPlaceScreen onLocationPress={handleLocationPress} />,
    });
  };

  const handleLocationPress = (location: Location) => {
    setCreatePlaceForm({...createPlaceForm, location: location});
    handleModal();
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title={i18n.t('general_information_title')}
        description={i18n.t('general_information_title_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        value={createPlaceForm.title}
        placeholder={i18n.t('general_information_place_title')}
        onChangeText={(value) => {
          setCreatePlaceForm({...createPlaceForm, title: value});
        }}
      />
      <TitleWithDescription
        title={i18n.t('general_information_location')}
        description={i18n.t('general_information_location_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />

      <SimpleInput
        placeholder={i18n.t('general_information_search')}
        isEditable={false}
        onPress={handleMapPress}
        suffix={<Ionicons name="chevron-down" size={20} color={Colors.dark} />}
      />

      {createPlaceForm.location && (
        <SearchCard
          title={createPlaceForm.location?.address}
          description={`${createPlaceForm.location?.postalCode} ${createPlaceForm.location?.city}`}
          subdescription={createPlaceForm.location?.country}
        />
      )}
      <Button
        value={i18n.t('general_information_continue')}
        backgroundColor={Colors.dark}
        textColor={Colors.white}
        onPress={nextStep}
        style={styles.button}
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
  map: {
    height: 120,
    width: Layout.window.width - 40,
    borderRadius: 10,
    marginBottom: Layout.padding,
    ...Layout.shadow,
  },
  button: {
    marginTop: Layout.padding,
  },
});

export default GeneralInformations;
