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
import Modal from '../components/Modal';
import PlaceDetailScreen from './PlaceDetailScreen';

const CustomMarker = ({isActive, image}) => {
  return (
    <View style={styles.calloutContainer}>
      <View style={styles.callout}>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.calloutImage, isActive && styles.activeImage]}
        />
      </View>
      <View style={styles.pinCircleOpacity}>
        <View style={styles.pinCircle} />
      </View>
    </View>
  );
};

type Props = {
  initialCoords: Coords;
  onItemPress: (place: Place) => void;
};

const MapScreen = ({initialCoords, onItemPress}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [places, setPlaces] = useState<Array<Place>>([]);
  const [coords, setCoords] = useState<Coords>(initialCoords);
  let mapRef: any;
  let carouselRef: any;

  useEffect(() => {
    const init = async () => {
      setPlaces(await getPlacesNearbyCoordinates(coords, 5000));
    };
    init();
  }, [coords]);

  const renderCarouselItem = ({item}: {item: Place}) => {
    return (
      <PlaceCard
        key={item._id}
        place={item}
        onPress={() => onItemPress(item)}
        isFavorite={item.isFavorite}
      />
    );
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
    setActiveIndex(index);
  };

  const onMarkerTap = (index: number) => {
    mapRef.animateCamera({
      center: {
        longitude: places[index].location.longitude,
        latitude: places[index].location.latitude,
      },
    });
    setActiveIndex(index);
    carouselRef.snapToItem(index);
  };

  return (
    <View style={styles.flex}>
      <MapView
        ref={(ref) => (mapRef = ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.flex}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={onRegionChange}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        {places.map((place: Place, index) => {
          const markerCoords = {
            longitude: parseFloat( place.location.longitude),
            latitude: parseFloat( place.location.latitude),
          };
          return (
            <Marker
              coordinate={markerCoords}
              onPress={() => onMarkerTap(index)}>
              <CustomMarker
                isActive={activeIndex === index}
                image={place.images[0].url}
              />
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.carousel}>
        <Carousel
          ref={(ref) => (carouselRef = ref)}
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
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  activeImage: {
    width: 50,
    height: 50,
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
