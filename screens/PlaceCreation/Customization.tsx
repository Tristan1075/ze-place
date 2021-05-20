import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

//@ts-ignore
import Modal, {ModalContent, BottomModal} from 'react-native-modals';
import * as ImagePicker from 'expo-image-picker';

import TitleWithDescription from '../../components/TitleWithDescription';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import SelectableItem from '../../components/SelectableItem';
import {CreatePlaceForm} from '../../types';
import Layout from '../../constants/Layout';
import {createPlace} from '../../api/places';

type Props = {
  prevStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const Customization = (props: Props) => {
  const {prevStep, createPlaceForm, setCreatePlaceForm} = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [submitModal, setSubmitModal] = useState<boolean>(false);

  const handleChooseImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const image = {
        url: result.uri,
      };
      setCreatePlaceForm({
        ...createPlaceForm,
        images: [...createPlaceForm.images, image],
      });
      setModalVisible(false);
    }
  };

  const handleSubmitForm = async () => {
    try {
      const place = await createPlace(createPlaceForm);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Images"
        description="Choose images to describe your place"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {createPlaceForm.images.map((image) => (
          <Image source={{uri: image.url}} style={styles.image} />
        ))}
        <TouchableOpacity
          style={styles.buttonImage}
          onPress={() => setModalVisible(true)}>
          <Ionicons
            name="add-circle-outline"
            size={36}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.row}>
        <Button
          value="Back"
          backgroundColor={Colors.white}
          textColor={Colors.dark}
          onPress={prevStep}
          style={{marginRight: 10, flex: 1}}
        />
        <Button
          value="Submit"
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          onPress={() => setSubmitModal(true)}
          style={{marginLeft: 10, flex: 1}}
        />
      </View>
      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        width={1}
        onSwipeOut={() => setModalVisible(false)}>
        <ModalContent style={styles.bottomModal}>
          <SelectableItem
            value="Take a picture"
            icon={'camera-outline'}
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <SelectableItem
            value="Browse"
            icon={'folder'}
            onPress={handleChooseImagePress}
          />
        </ModalContent>
      </BottomModal>
      <Modal
        width={0.7}
        visible={submitModal}
        rounded={true}
        onTouchOutside={() => {
          setSubmitModal(false);
        }}>
        <ModalContent style={styles.modal}>
          <Text style={styles.modalTitle}>Confirm the form</Text>
          <Text style={styles.modalDescription}>
            Your announce will be available as soon as possible
          </Text>
          <Button
            backgroundColor={Colors.primary}
            value="Confirm"
            textColor={Colors.white}
            onPress={handleSubmitForm}
          />
          <Text onPress={() => setSubmitModal(false)} style={styles.cancel}>
            Cancel
          </Text>
        </ModalContent>
      </Modal>
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
  scrollView: {
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
    ...Layout.shadow,
  },
  buttonImage: {
    width: 120,
    height: 120,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'poppins-bold',
    color: Colors.dark,
    marginRight: 25,
    marginLeft: 25,
  },
  bottomModal: {
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
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

export default Customization;
