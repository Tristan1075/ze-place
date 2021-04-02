import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

import Header from '../components/Header';
import SquaredButton from '../components/SquaredButton';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {HomeParamList, PlaceType} from '../types';
import {categories} from '../mocks';
import {getAllPlaces} from '../api/places';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const HomeScreen = (props: Props) => {
  const {navigation} = props;
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [places, setPlaces] = useState<Array<PlaceType>>([]);

  useEffect(() => {
    const init = async () => setPlaces(await getAllPlaces());
    init();
  }, []);

  const handlePlacePress = (place: PlaceType) => {
    navigation.navigate('PlaceDetail', {place: place});
  };

  const renderItem = ({item}: {item: PlaceType}) => {
    return <CardWithRate place={item} onPress={() => handlePlacePress(item)} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type="menu" showProfil={true} />
        <View style={styles.container}>
          <Text style={styles.title}>{i18n.t('discover')}</Text>
          <TextInput style={styles.input} placeholder="Search" />
          <View style={styles.iconsRow}>
            {categories.map((category, index) => (
              <SquaredButton
                key={index}
                onPress={() => setActiveCategory(index)}
                isActive={activeCategory === index}
                icon={category.icon}
              />
            ))}
          </View>
        </View>
        <Text style={styles.subtitle}>Near you</Text>
        <Carousel
          contentContainerCustomStyle={{paddingLeft: Layout.padding}}
          useScrollView={true}
          data={places}
          renderItem={renderItem}
          sliderWidth={Layout.window.width}
          activeSlideAlignment="start"
          itemWidth={220}
        />
        <Text style={styles.subtitle}>Popular Place</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalList}>
            {places.map((place: PlaceType, index: number) => {
              return (
                <View style={styles.shadow} key={index}>
                  <Image
                    source={{uri: place.images[0].url}}
                    style={styles.image}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
      <Text
        style={styles.subtitle}
        onPress={async () => await SecureStore.deleteItemAsync('access-token')}>
        Déconnexion
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.padding,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 32,
    color: Colors.primary,
    paddingBottom: 20,
  },
  subtitle: {
    fontFamily: 'playfair-bold',
    fontSize: 26,
    color: Colors.primary,
    paddingVertical: 20,
    paddingLeft: Layout.padding,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'poppins',
  },
  iconsRow: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalList: {
    flexDirection: 'row',
    paddingHorizontal: Layout.padding,
  },
  image: {
    width: 130,
    height: 130,
    marginRight: 10,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
});

export default HomeScreen;
