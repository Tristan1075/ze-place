import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// @ts-ignore
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import {CreatePlaceForm} from '../types';
import GeneralInformations from './PlaceCreation/GeneralInformations';
import PlaceInformations from './PlaceCreation/PlaceInformations';
import RightsAndCustomization from './PlaceCreation/RightsAndCustomization';

const CreatePlaceModal = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [createPlaceForm, setCreatePlaceForm] = useState<CreatePlaceForm>();

  const prevStep = () => setActiveStep((step) => step - 1);

  const nextStep = () => setActiveStep((step) => step + 1);

  return (
    <View style={styles.container}>
      <Header type="back" />
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
                setCreateFormPlace={setCreatePlaceForm}
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
                setCreatePlaceForm={setCreatePlaceForm}
              />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
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
});

export default CreatePlaceModal;
