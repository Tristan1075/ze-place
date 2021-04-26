import React, {useState, useEffect} from 'react';
import {Modal, Animated, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

import Colors from '../constants/Colors';
import {mapStyle} from '../utils/mapStyle';
import Header from '../components/Header';
import Layout from '../constants/Layout';
import SimpleInput from '../components/SimpleInput';
import Button from '../components/Button';

const MapModal = () => {
  const [search, setSearch] = useState([]);
  const height = new Animated.Value(200);

  useEffect(() => {
    Animated.timing(height, {
      toValue: 500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [search]);

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={styles.header}>
          <Header type="back" />
        </View>
        <Animated.View style={styles.bottomCard}>
          <Text style={styles.title}>Place location</Text>
          <SimpleInput placeholder="Type your address !" />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: Layout.window.height,
  },
  header: {
    position: 'absolute',
    top: 50,
  },
  title: {
    fontSize: 18,
    fontFamily: 'oswald',
    color: Colors.dark,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default MapModal;
