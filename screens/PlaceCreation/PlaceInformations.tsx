import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//@ts-ignore
import {ModalContent, BottomModal} from 'react-native-modals';

import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {Ionicons} from '@expo/vector-icons';
import CalendarPicker from '../../components/CalendarPicker';
import {features} from '../../mocks';
import Feature from '../../components/Feature';
import {ModalContext} from '../../providers/modalContext';
import SelectPlaceTypeScreen from '../SelectPlaceTypeScreen';
import SelectableItem from '../../components/SelectableItem';
import {CreatePlaceForm, FeatureType, PlaceType} from '../../types';

const locationDuration = [
  {title: 'Day', value: 'day'},
  {title: 'Night', value: 'night'},
  {title: 'Week', value: 'week'},
  {title: 'Month', value: 'month'},
];

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  createPlaceForm: CreatePlaceForm;
  setCreatePlaceForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const PlaceInformations = (props: Props) => {
  const {prevStep, nextStep, createPlaceForm, setCreatePlaceForm} = props;
  const {handleModal} = useContext(ModalContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSelectPlaceType = () => {
    handleModal({
      child: <SelectPlaceTypeScreen onPlaceTypePress={handlePlaceTypePress} />,
    });
  };

  const handlePlaceTypePress = (type: PlaceType) => {
    setCreatePlaceForm({...createPlaceForm, placeType: type});
    handleModal();
  };

  const handleFeaturePress = (feature: FeatureType) => {
    if (createPlaceForm.features.includes(feature)) {
      setCreatePlaceForm({
        ...createPlaceForm,
        features: createPlaceForm.features.filter((item) => item !== feature),
      });
    } else {
      setCreatePlaceForm({
        ...createPlaceForm,
        features: [...createPlaceForm.features, feature],
      });
    }
  };

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Place type"
        description="What is the type of your place?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        placeholder="Choose a place type"
        value={createPlaceForm.placeType?.name}
        isEditable={false}
        onPress={handleSelectPlaceType}
        suffix={<Ionicons name="chevron-down" size={20} color={Colors.dark} />}
      />
      <TitleWithDescription
        title="Surface"
        description="How many square meters is your place ?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        value={createPlaceForm.surface}
        placeholder="Please enter the size"
        type="number-pad"
        suffix={<Text style={styles.descriptionText}>m²</Text>}
        onChangeText={(value) =>
          setCreatePlaceForm({...createPlaceForm, surface: value})
        }
      />
      <TitleWithDescription
        title="Price"
        description="How much do you want to rent your place ?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <View style={styles.row}>
        <SimpleInput
          value={createPlaceForm.price}
          placeholder="Type your price"
          style={styles.flex}
          suffix={<Text style={styles.descriptionText}>€</Text>}
          type="number-pad"
          onChangeText={(value) =>
            setCreatePlaceForm({...createPlaceForm, price: value})
          }
        />
        <TouchableOpacity
          style={styles.durationBloc}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.text}>
            {createPlaceForm.locationDuration.title}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.dark} />
        </TouchableOpacity>
      </View>
      <TitleWithDescription
        title="Description"
        description="Description of your !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput
        placeholder="Choose"
        multiline={true}
        numberOfLines={1}
        value={createPlaceForm.description}
        onChangeText={(value) =>
          setCreatePlaceForm({...createPlaceForm, description: value})
        }
      />
      <TitleWithDescription
        title="Features"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.facilitiesContainer}>
        {features.map((feature, index) => (
          <Feature
            feature={feature}
            key={index}
            isActive={createPlaceForm.features.includes(feature)}
            onPress={() => handleFeaturePress(feature)}
          />
        ))}
      </ScrollView>
      <TitleWithDescription
        title="Availability"
        description="Select  the type that fit your place !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <CalendarPicker />
      <View style={styles.row}>
        <Button
          value="Back"
          backgroundColor={Colors.white}
          textColor={Colors.dark}
          onPress={prevStep}
          style={{marginRight: 10, flex: 1}}
        />
        <Button
          value="Continue"
          backgroundColor={Colors.dark}
          textColor={Colors.white}
          onPress={nextStep}
          style={{marginLeft: 10, flex: 1}}
        />
      </View>
      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        width={1}
        onSwipeOut={() => setModalVisible(false)}>
        <ModalContent style={styles.bottomModal}>
          {locationDuration.map((duration) => (
            <SelectableItem
              value={duration.title}
              onPress={() => {
                setCreatePlaceForm({
                  ...createPlaceForm,
                  locationDuration: duration,
                });
                setModalVisible(false);
              }}
              isActive={
                createPlaceForm.locationDuration.value === duration.value
              }
            />
          ))}
        </ModalContent>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    marginBottom: 20,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  map: {
    height: 120,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
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