import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

import {getPlacesNearbyCoordinates} from '../api/places';
import PlaceCard from '../components/PlaceCard';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Coords, Place} from '../types';

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

const initialCoords: Coords = {
  longitude: 2.34767746925354,
  latitude: 48.853797912597656,
};

const MapScreen = ({place}: Props) => {
  const {longitude, latitude} = place.location;
  const [places, setPlaces] = useState<Array<Place>>([]);
  const [coords, setCoords] = useState<Coords>({
    longitude: longitude || initialCoords.longitude,
    latitude: latitude || initialCoords.latitude,
  });
  let mapRef: any;

  useEffect(() => {
    const init = async () => {
      setPlaces(await getPlacesNearbyCoordinates(coords, 5000));
    };
    init();
  }, [coords]);

  const renderCarouselItem = ({item}: {item: Place}) => {
    return <PlaceCard place={item} />;
  };

  const onRegionChange = (c: Coords) => {
    setCoords({longitude: c.longitude, latitude: c.latitude});
  };

  const onItemSlide = (index: number) => {
    mapRef.animateCamera({
      center: {
        longitude: places[index].location.longitude,
        latitude: places[index].location.latitude,
      },
    });
  };

  return (
    <View style={styles.flex}>
      <MapView
        ref={(ref) => (mapRef = ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.flex}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {places.map((place: Place) => {
          const {longitude, latitude} = place.location;
          return (
            <Marker coordinate={{longitude, latitude}}>
              <CustomMarker />
            </Marker>
          );
        })}
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
          onSnapToItem={onItemSlide}
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
