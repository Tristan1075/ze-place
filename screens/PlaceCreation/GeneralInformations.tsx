import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {PlaceType} from '../types';
import TitleWithDescription from '../../components/TitleWithDescription';
import SimpleInput from '../../components/SimpleInput';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from '../../utils/mapStyle';
import Button from '../../components/Button';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type Props = {
  nextStep: () => void;
};

const GeneralInformations = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TitleWithDescription
        title="Title"
        description="Choose an attractive name !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput placeholder="Place's title" />
      <TitleWithDescription
        title="Description"
        description="Description of your !"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <SimpleInput placeholder="Choose" multiline={true} numberOfLines={1} />
      <TitleWithDescription
        title="Location"
        description="Where is located your place ?"
        subtitle={true}
        style={styles.paddingVertical}
      />
      <MapView
        onPress={() => navigation.navigate('MapModal')}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        scrollEnabled={false}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Button
        value="Continuer"
        backgroundColor={Colors.dark}
        textColor={Colors.white}
        onPress={props.nextStep}
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
    borderRadius: 10,
    marginBottom: Layout.padding,
  },
});

export default GeneralInformations;
