import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

import {getAllPlaces} from '../api/places';
import PlaceCard from '../components/PlaceCard';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Place} from '../types';

import {mapStyle} from '../utils/mapStyle';

type Props = {
  place: Place;
};

const CustomMarker = () => {
  return (
    <View style={styles.calloutContainer}>
      <View style={styles.callout}>
        <Image
          source={require('../assets/images/home_banner.jpg')}
          style={styles.calloutImage}
        />
      </View>
      <View style={styles.pinCircleOpacity}>
        <View style={styles.pinCircle} />
      </View>
    </View>
  );
};

const MapScreen = ({place}: Props) => {
  const {longitude, latitude} = place.location;
  const [places, setPlaces] = useState<Array<Place>>([]);

  useEffect(() => {
    const init = async () => {
      setPlaces(await getAllPlaces());
    };
    init();
  }, []);

  const renderCarouselItem = ({item}: {item: Place}) => {
    return <PlaceCard place={item} />;
  };

  return (
    <View style={styles.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.flex}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: (latitude && parseFloat(latitude)) || 0,
          longitude: (longitude && parseFloat(longitude)) || 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker coordinate={{longitude, latitude}}>
          <CustomMarker />
        </Marker>
      </MapView>
      <View style={styles.carousel}>
        <Carousel
          contentContainerCustomStyle={{paddingLeft: Layout.padding}}
          useScrollView={true}
          data={places}
          renderItem={renderCarouselItem}
          sliderWidth={Layout.window.width}
          inactiveSlideOpacity={0.9}
          activeSlideAlignment="start"
          itemWidth={Layout.window.width - 80}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: 'relative',
  },
  location: {
    width: 40,
    height: 40,
  },
  callout: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    ...Layout.shadow,
  },
  calloutImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  calloutContainer: {
    alignItems: 'center',
  },
  pinCircleOpacity: {
    marginTop: 10,
    backgroundColor: Colors.primaryOpacity,
    width: 20,
    height: 20,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinCircle: {
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
    borderRadius: 40,
  },
  carousel: {
    position: 'absolute',
    bottom: 20,
  },
});

export default MapScreen;
