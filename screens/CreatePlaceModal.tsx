import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';
import {useNavigation} from '@react-navigation/native';

// @ts-ignore
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Button from '../components/Button';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import {CreatePlaceForm} from '../types';
import GeneralInformations from './PlaceCreation/GeneralInformations';
import PlaceInformations from './PlaceCreation/PlaceInformations';
import RightsAndCustomization from './PlaceCreation/RightsAndCustomization';

const CreatePlaceModal = () => {
  const navigation = useNavigation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [createPlaceForm, setCreatePlaceForm] = useState<CreatePlaceForm>({
    title: undefined,
    aboutMe: undefined,
    surface: undefined,
    placeType: undefined,
    price: undefined,
    locationDuration: {
      title: 'Day',
      value: 'day',
    },
    description: undefined,
    features: [],
    images: [],
  });

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
            label="General informations"
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
            label="Places informations"
            removeBtnRow={true}
            scrollViewProps={{showsVerticalScrollIndicator: false}}>
            <View>
              <PlaceInformations
                prevStep={prevStep}
                nextStep={nextStep}
                createPlaceForm={createPlaceForm}
                setCreatePlaceForm={setCreatePlaceForm}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Rights and customization"
            removeBtnRow={true}
            scrollViewProps={{showsVerticalScrollIndicator: false}}>
            <View>
              <RightsAndCustomization
                prevStep={prevStep}
                createPlaceForm={createPlaceForm}
                setCreatePlaceForm={setCreatePlaceForm}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Modal
        width={0.7}
        visible={exitModal}
        rounded
        style={{zIndex: 1000}}
        onTouchOutside={() => {
          setExitModal(false);
        }}>
        <ModalContent style={styles.modal}>
          <Text style={styles.modalTitle}>Are you sure you want to quit ?</Text>
          <Text style={styles.modalDescription}>
            You will lose what you've done and you will not be able to continue
          </Text>
          <Button
            backgroundColor={Colors.primary}
            value="Confirm"
            textColor={Colors.white}
            onPress={handleBackPress}
          />
          <Text onPress={() => setExitModal(false)} style={styles.cancel}>
            Cancel
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

export default CreatePlaceModal;
