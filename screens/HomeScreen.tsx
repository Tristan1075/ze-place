import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,

} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';

import {HomeParamList, PlaceType,User} from '../types';
import {categories} from '../mocks';
import {getAllPlaces} from '../api/places';
import {getUser} from '../api/customer';
import Button from '../components/Button';
import { setupMaster } from 'cluster';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

import DescriptionBloc from '../components/DescriptionBloc';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import PlaceCard from '../components/PlaceCard';


import {placesMock} from '../mocks';
import { Ionicons } from '@expo/vector-icons';
type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const HomeScreen = (props: Props) => {
  const {navigation} = props;
  const [places, setPlaces] = useState<Array<PlaceType>>([]);
  const [user,setUser] = useState<User>();

  useEffect(() => {
    const init = async () => setPlaces(await getAllPlaces());
    const user = async () => setUser(await getUser());
    init();
    user();
    
    
  }, []);

  const handlePlacePress = (place: PlaceType) => {
    navigation.navigate('PlaceDetail', {place: place});
  };
  const handleProfilOption = () => {
    navigation.navigate('Signin');
    
  };

  const handleCreatePlacePress = () => {
    navigation.navigate('CreatePlace');
  };

  const renderCarouselItem = ({item}: {item: PlaceType}) => {
    return <CardWithRate place={item} onPress={() => handlePlacePress(item)} />;
  };

  const renderListItem = ({item, index}: {item: PlaceType; index: number}) => (
    <View style={styles.paddingHorizontal}>
      <PlaceCard
        key={index}
        place={item}
        onPress={() => handleItemPress(item)}
      />
    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
      <Header type='menu' showProfil={true}  profilPicture={user && user.avatar}></Header>
        </View>
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
        <View style={styles.row}>
          <Carousel
            contentContainerCustomStyle={{paddingLeft: Layout.padding}}
            useScrollView={true}
            data={places}
            renderItem={renderItem}
            sliderWidth={Layout.window.width}
            activeSlideAlignment="start"
            itemWidth={220}
          />
        </View>
        { user && console.log(user.first_name)}
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Image
        source={require('../assets/images/home_banner.jpg')}
        style={styles.imageBanner}
      />
      <View style={styles.container}>
        <Header type="menu" showProfil={true} />
        <Text style={styles.title}>{i18n.t('discover')}</Text>
        <SimpleInput
          style={styles.input}
          placeholder="Search"
          suffix={<Ionicons name="search" size={20} color={Colors.gray} />}
        />
      </View>
      <TitleWithDescription
        title="Near you"
        description="Find nearby you the available places to rent"
        style={styles.padding}
      />
      <Carousel
        contentContainerCustomStyle={{paddingLeft: Layout.padding}}
        useScrollView={true}
        data={places}
        renderItem={renderCarouselItem}
        sliderWidth={Layout.window.width}
        activeSlideAlignment="start"
        itemWidth={220}
      />
      <DescriptionBloc onPress={handleCreatePlacePress} />
      <TitleWithDescription
        title="Announces"
        description="Find nearby you the available places to rent"
        style={styles.padding}
      />
      <FlatList
        data={placesMock}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    marginBottom: 50,
    marginTop: 50,
  },
  imageBanner: {
    height: 360,
    position: 'absolute',
    resizeMode: 'cover',
    width: Layout.window.width,
  },
  title: {
    fontFamily: 'oswald-light',
    fontSize: 32,
    color: Colors.white,
    paddingBottom: 20,
    width: 200,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontFamily: 'oswald-light',
    fontSize: 26,
    color: Colors.dark,
    paddingVertical: 20,
    paddingLeft: Layout.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Layout.padding,
  },
  padding: {
    padding: Layout.padding,
  },
  input: {
    marginHorizontal: 20,
  },
  profil: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
