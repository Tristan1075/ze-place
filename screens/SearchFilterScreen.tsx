import {Ionicons} from '@expo/vector-icons';
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Modal} from 'react-native';
import Slider from 'react-native-slider';
import Button from '../components/Button';

import Feature from '../components/Feature';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';

import Colors from '../constants/Colors';
import {features} from '../mocks';
import {ModalContext} from '../providers/modalContext';
import SelectPlaceTypeScreen from './SelectPlaceTypeScreen';

const SearchFilterScreen = () => {
  const {handleModal} = useContext(ModalContext);
  const [price, setPrice] = useState<number>(100);
  const [surface, setSurface] = useState<string>('');

  const handlePlaceTypePress = (type: PlaceType) => {
    //setCreatePlaceForm({...createPlaceForm, placeType: type});
    handleModal();
  };

  const handleSelectPlaceType = () => (
    <Modal visible={true}>
      <SelectPlaceTypeScreen onPlaceTypePress={handlePlaceTypePress} />
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <TitleWithDescription title="Type" subtitle={true} />
        <SimpleInput
          style={styles.input}
          placeholder="Choose a place type"
          //value={createPlaceForm.placeType?.name}
          isEditable={false}
          onPress={handleSelectPlaceType}
          suffix={
            <Ionicons name="chevron-down" size={20} color={Colors.dark} />
          }
        />
        <TitleWithDescription
          title="Price"
          subtitle={true}
          description="Set the maximum price"
        />
        <Slider
          minimumValue={0}
          maximumValue={10000}
          value={price}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.primary}
          onValueChange={(value: number) => setPrice(value)}
        />
        <Text style={styles.price}>{price.toFixed(0).toString()}€</Text>
        <TitleWithDescription
          title="Surface"
          subtitle={true}
          description="Set the minimum size"
        />
        <SimpleInput
          placeholder="Enter the size"
          style={styles.input}
          suffix={<Text style={styles.descriptionText}>m²</Text>}
          type="number-pad"
          onChangeText={(value) => setSurface(value)}
        />
        <TitleWithDescription title="Select a feature" subtitle={true} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.facilitiesContainer}>
          {features.map((feature, index) => (
            <Feature feature={feature} key={index} />
          ))}
        </ScrollView>
        <Button
          value="Search"
          backgroundColor={Colors.primary}
          textColor={Colors.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: 140,
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  input: {
    paddingVertical: 20,
  },
  price: {
    textAlign: 'right',
    fontFamily: 'poppins',
  },
});

export default SearchFilterScreen;
