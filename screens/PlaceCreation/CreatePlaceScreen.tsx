import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';
import {useNavigation, useRoute} from '@react-navigation/native';

// @ts-ignore
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Button from '../../components/Button';

import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import {CreatePlaceForm, Place} from '../../types';
import GeneralInformations from './GeneralInformations';
import PlaceInformations from './PlaceInformations';
import PlaceAuthorization from './PlaceAuthorization';
import Customization from './Customization';
import i18n from 'i18n-js';

const CreatePlaceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const place: Place = route.params?.place;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [createPlaceForm, setCreatePlaceForm] = useState<CreatePlaceForm>({
    title: undefined,
    location: undefined,
    surface: undefined,
    placeType: undefined,
    price: undefined,
    description: undefined,
    features: [],
    images: [],
    authorizeAnimals: true,
    authorizeMusic: true,
    authorizeSmoking: true,
    authorizeFire: true,
    authorizeFoodAndDrink: true,
  });

  useEffect(() => {
    if (place) {
      setCreatePlaceForm({
        title: place.title,
        location: place.location,
        surface: place.surface.toString(),
        placeType: place.placeType,
        price: place.price.toString(),
        description: place.description,
        features: place.features,
        images: place.images,
        authorizeAnimals: place.authorizeAnimals,
        authorizeMusic: place.authorizeMusic,
        authorizeSmoking: place.authorizeSmoking,
        authorizeFire: place.authorizeFire,
        authorizeFoodAndDrink: place.authorizeFoodAndDrink,
      });
    }
  }, []);

  const handleBackPress = () => {
    setExitModal(false);
    navigation.goBack();
  };

  const prevStep = () => setActiveStep((step) => step - 1);

  const nextStep = () => setActiveStep((step) => step + 1);

  return (
    <View style={styles.container}>
      <Header type="back" onBackPress={() => setExitModal(true)} />
      <View style={styles.scrollView}>
        <ProgressSteps
          activeStep={activeStep}
          labelFontFamily={'poppins-light'}
          labelFontSize={10}
          activeStepIconBorderColor={Colors.primary}
          activeLabelColor={Colors.primary}
          completedStepIconColor={Colors.primary}
          completedProgressBarColor={Colors.primary}
          progressBarColor={Colors.primary}>
          <ProgressStep
            label={i18n.t('create_place_general')}
            removeBtnRow={true}
            scrollViewProps={{showsVerticalScrollIndicator: false}}>
            <View>
              <GeneralInformations
                nextStep={nextStep}
                createPlaceForm={createPlaceForm}
                setCreatePlaceForm={setCreatePlaceForm}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label={i18n.t('create_place_detail')}
            removeBtnRow={true}
            scrollViewProps={{showsVerticalScrollIndicator: false}}>
            <View>
              <PlaceInformations
                place={place}
                prevStep={prevStep}
                nextStep={nextStep}
                createPlaceForm={createPlaceForm}
                setCreatePlaceForm={setCreatePlaceForm}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label={i18n.t('create_place_authorization')}
            removeBtnRow={true}
            scrollViewProps={{showsVerticalScrollIndicator: false}}>
            <View>
              <PlaceAuthorization
                prevStep={prevStep}
                nextStep={nextStep}
                createPlaceForm={createPlaceForm}
                setCreatePlaceForm={setCreatePlaceForm}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label={i18n.t('create_place_customization')}
            removeBtnRow={true}
            scrollViewProps={{showsVerticalScrollIndicator: false}}>
            <View>
              <Customization
                prevStep={prevStep}
                createPlaceForm={createPlaceForm}
                setCreatePlaceForm={setCreatePlaceForm}
                place={place}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Modal
        width={0.7}
        visible={exitModal}
        rounded={true}
        onTouchOutside={() => {
          setExitModal(false);
        }}>
        <ModalContent style={styles.modal}>
          <Text style={styles.modalTitle}>
            {i18n.t('create_place_quit_message')}
          </Text>
          <Text style={styles.modalDescription}>
            {i18n.t('create_place_quit_description')}
          </Text>
          <Button
            backgroundColor={Colors.primary}
            value={i18n.t('create_place_confirm')}
            textColor={Colors.white}
            onPress={handleBackPress}
          />
          <Text onPress={() => setExitModal(false)} style={styles.cancel}>
            {i18n.t('create_place_cancel')}
          </Text>
        </ModalContent>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: 50,
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
  },
  nextButton: {
    fontFamily: 'poppins',
    backgroundColor: Colors.dark,
    color: Colors.white,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    width: 100,
    margin: 0,
  },
  modal: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  modalTitle: {
    fontFamily: 'poppins',
    color: Colors.dark,
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalDescription: {
    fontFamily: 'poppins-light',
    color: Colors.dark,
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 20,
  },
  cancel: {
    paddingTop: 20,
    textAlign: 'center',
    fontFamily: 'poppins',
    color: Colors.dark,
    textDecorationLine: 'underline',
  },
});

export default CreatePlaceScreen;
