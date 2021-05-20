import React, {useState, useEffect, SetStateAction, Dispatch} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

import Colors from '../constants/Colors';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import {Ionicons} from '@expo/vector-icons';
import {searchPlace} from '../api/mapbox';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchCard from '../components/SearchCard';
import {Location, MapboxSearch} from '../types';

type Props = {
  onLocationPress: (location: Location) => void;
};

const SearchPlaceScreen = ({onLocationPress}: Props) => {
  const [query, setQuery] = useState<string>('');
  const [places, setPlaces] = useState<Array<MapboxSearch>>([]);

  useEffect(() => {
    if (query.length > 3) {
      const fetchAddress = async () => setPlaces(await searchPlace(query));
      fetchAddress();
    } else {
      setPlaces([]);
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <TitleWithDescription
        title="Find your place !"
        subtitle={true}
        style={styles.title}
      />
      <SimpleInput
        placeholder="Enter the adress..."
        onChangeText={(q) => setQuery(q)}
        suffix={<Ionicons name="search" size={20} color={Colors.gray} />}
      />
      <Text style={styles.results}>Results ({places.length})</Text>
      <ScrollView>
        {places.map((place) => {
          const address = `${place.address ? place.address : ''}${
            place.address ? ' ' : ''
          }${place.text}`;
          const city =
            place.context &&
            place.context.find((c) => c.id && c.id.split('.')[0] === 'place')
              ?.text;
          const postalCode =
            place.context &&
            place.context.find((c) => c.id && c.id.split('.')[0] === 'postcode')
              ?.text;
          const country =
            place.context &&
            place.context.find((c) => c.id && c.id.split('.')[0] === 'country')
              ?.text;
          const region =
            place.context &&
            place.context.find((c) => c.id && c.id.split('.')[0] === 'region')
              ?.text;
          const longitude = place.center[0].toString();
          const latitude = place.center[1].toString();
          return (
            <SearchCard
              title={place.text}
              description={`${address}, ${postalCode} ${city}`}
              subdescription={country ? country : region}
              onPress={() =>
                onLocationPress({
                  address,
                  city,
                  postalCode,
                  country,
                  longitude,
                  latitude,
                })
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  title: {
    paddingBottom: 20,
  },
  results: {
    color: Colors.dark,
    fontFamily: 'poppins',
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default SearchPlaceScreen;
