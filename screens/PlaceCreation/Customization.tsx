import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {RNS3} from 'react-native-aws3';

//@ts-ignore
import Modal, {ModalContent, BottomModal} from 'react-native-modals';
import * as ImagePicker from 'expo-image-picker';
import {StackActions, useNavigation} from '@react-navigation/native';

import {
  REACT_APP_BUCKET_NAME,
  REACT_APP_REGION,
  REACT_APP_ACCESS_ID,
  REACT_APP_ACCESS_KEY,
} from '../../env';
import TitleWithDescription from '../../components/TitleWithDescription';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import SelectableItem from '../../components/SelectableItem';
import {CreatePlaceForm, Place} from '../../types';
import {createPlace, updatePlace} from '../../api/places';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import {compressImage} from '../../utils';

type Props = {
  prevStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
  place?: Place;
  errors?: CreatePlaceForm;
  verifyForm: () => Promise<boolean>;
  setErrors: Dispatch<SetStateAction<any>>;
};

const Customization = (props: Props) => {
  const {
    prevStep,
    createPlaceForm,
    setCreatePlaceForm,
    place,
    verifyForm,
    errors,
    setErrors,
  } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [submitModal, setSubmitModal] = useState<boolean>(false);
  const navigation = useNavigation();

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
      setErrors({...errors, images: undefined});
      setModalVisible(false);
    }
  };

  const uploadToS3 = async () => {
    const id = await SecureStore.getItemAsync('access-token');
    let cpt = 0;
    let cpt2 = 0;

    for (const element of createPlaceForm.images) {
      const newurl = await compressImage(element.url);
      const options = {
        bucket: REACT_APP_BUCKET_NAME,
        region: REACT_APP_REGION,
        accessKey: REACT_APP_ACCESS_ID,
        secretKey: REACT_APP_ACCESS_KEY,
        successActionStatus: 201,
      };
      const file = {
        uri: newurl.uri,
        name: `${createPlaceForm.title}${id}index${cpt}.png`,
        type: 'image/png',
      };

      RNS3.put(file, options).then((response) => {
        if (response.status !== 201)
          throw new Error('Failed to upload image to S3');
      });

      cpt++;
    }
    createPlaceForm.images.forEach((e) => {
      e.url = `https://ze-place.s3.eu-west-3.amazonaws.com/${createPlaceForm.title}${id}index${cpt2}.png`;
      cpt2++;
    });
  };

  const handleSubmitForm = async () => {
    if (await verifyForm()) {
      try {
        if (place) {
          await updatePlace(place._id, createPlaceForm);
          setSubmitModal(false);
          navigation.dispatch(StackActions.pop());
        } else {
          await uploadToS3();
          await createPlace(createPlaceForm);
          setSubmitModal(false);
          navigation.dispatch(StackActions.popToTop());
        }
      } catch (err) {}
    } else {
      setSubmitModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title={i18n.t('customization_image_title')}
        description={i18n.t('customization_image_description')}
        subtitle={true}
        style={styles.paddingVertical}
      />
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {createPlaceForm.images.map((image, index) => (
          <Image key={index} source={{uri: image.url}} style={styles.image} />
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
      {errors?.images && <Text style={styles.error}>{errors?.images}</Text>}
      <View style={styles.row}>
        <Button
          value={i18n.t('customization_back')}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
          onPress={prevStep}
          style={{marginRight: 10, flex: 1}}
        />
        <Button
          value={i18n.t('customization_submit')}
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
            value={i18n.t('customization_take_picture')}
            icon={'camera-outline'}
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <SelectableItem
            value={i18n.t('customization_browse')}
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
          <Text style={styles.modalTitle}>
            {i18n.t('customization_confirm_form')}
          </Text>
          <Text style={styles.modalDescription}>
            {i18n.t('customization_waiting_description')}
          </Text>
          <Button
            backgroundColor={Colors.primary}
            value={i18n.t('customization_confirm')}
            textColor={Colors.white}
            onPress={handleSubmitForm}
          />
          <Text onPress={() => setSubmitModal(false)} style={styles.cancel}>
            {i18n.t('customization_cancel')}
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
  error: {
    color: Colors.error,
    fontFamily: 'poppins',
    fontSize: 14,
    paddingBottom: 20,
  },
});

export default Customization;
