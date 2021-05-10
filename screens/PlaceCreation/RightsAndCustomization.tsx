import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

//@ts-ignore
import {ModalContent, BottomModal} from 'react-native-modals';
import * as ImagePicker from 'expo-image-picker';

import TitleWithDescription from '../../components/TitleWithDescription';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import SelectableItem from '../../components/SelectableItem';
import {CreatePlaceForm} from '../../types';
import Layout from '../../constants/Layout';

type Props = {
  prevStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const RightsAndCustomization = (props: Props) => {
  const {prevStep, createPlaceForm, setCreatePlaceForm} = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
      <TitleWithDescription
        title="Authorization"
        description="Choose images to describe your place"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <Button
        value="Back"
        backgroundColor={Colors.dark}
        textColor={Colors.white}
        onPress={prevStep}
      />
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
});

export default RightsAndCustomization;
