import React, {Dispatch, SetStateAction, useContext} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {CreatePlaceForm} from '../../types';
import {ModalContext} from '../../providers/modalContext';
import SearchPlaceScreen from '../SearchPlaceScreen';

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
      child: (
        <SearchPlaceScreen
          createPlaceForm={createPlaceForm}
          setCreatePlaceForm={setCreatePlaceForm}
        />
      ),
    });
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Title"
        description="Choose an attractive name !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        value={createPlaceForm.title}
        placeholder="Place's title"
        onChangeText={(value) => {
          setCreatePlaceForm({...createPlaceForm, title: value});
        }}
      />
      <TitleWithDescription
        title="Description"
        description="Description of your !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        value={createPlaceForm.aboutMe}
        placeholder="Choose"
        multiline={true}
        numberOfLines={1}
        onChangeText={(value) => {
          setCreatePlaceForm({...createPlaceForm, aboutMe: value});
        }}
      />
      <TitleWithDescription
        title="Location"
        description="Where is located your place ?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <TouchableWithoutFeedback onPress={handleMapPress}>
        <Image
          source={require('../../assets/images/map.png')}
          style={styles.map}
        />
      </TouchableWithoutFeedback>
      <Button
        value="Continuer"
        backgroundColor={Colors.dark}
        textColor={Colors.white}
        onPress={nextStep}
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
});

export default GeneralInformations;
