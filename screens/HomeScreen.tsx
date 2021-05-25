import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
SafeAreaView,
  TouchableOpacity,
  TextInput,

  FlatList,
  Image,

} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import * as SecureStore from 'expo-secure-store';

import Header from '../components/Header';
import SquaredButton from '../components/SquaredButton'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {FilterForm, HomeParamList, Place, PlaceType, User} from '../types';
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
import {getUser} from '../api/customer';


import {placesMock} from '../mocks';
import {Ionicons} from '@expo/vector-icons';
import {ModalContext} from '../providers/modalContext';
import SearchFilterScreen from './SearchFilterScreen';
import Button from '../components/Button';
import {CommonActions} from '@react-navigation/native';
type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const HomeScreen = (props: Props) => {
  const {navigation} = props;
  const [places, setPlaces] = useState<Array<Place>>([]);
  const {handleModal} = useContext(ModalContext);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const init = async () => {
      setPlaces(await getAllPlaces());
      setUser(await getUser());
    };

    init();    
    
  }, []);

  const handleDisconnectPress = async () => {
    await SecureStore.deleteItemAsync('access-token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Root'}],
      }),
    );
  };

  const handlePlacePress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place});
  };
  const handleProfilOption = () => {
    navigation.navigate('Signin');
    
  };

  const handleCreatePlacePress = () => {
    navigation.navigate('CreatePlace');
  };

  const showFilterModal = () => {
    handleModal({
      child: <SearchFilterScreen onSearchPress={handleSeeAnnouncesPress} />,
    });
  };

  const handleSeeAnnouncesPress = (filter: FilterForm) => {
    navigation.navigate('PlaceList', {filter: filter});
    handleModal();
  };

  const renderCarouselItem = ({item}: {item: Place}) => {
    return <CardWithRate place={item} onPress={() => handlePlacePress(item)} />;
  };

  const renderListItem = ({item, index}: {item: Place; index: number}) => (
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

    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Image
        source={require('../assets/images/home_banner.jpg')}
        style={styles.imageBanner}
      />
      <View style={styles.overlay} />
      <View style={styles.container}>

      <Header type='menu' showProfil={true}  profilPicture={user && user.avatar}></Header>
        <Text style={styles.title}>{i18n.t('discover')}</Text>
        <SimpleInput
          isEditable={false}
          style={styles.input}
          placeholder="Search"
          suffix={<Ionicons name="search" size={20} color={Colors.gray} />}
        />
      </View>
      <TitleWithDescription
        title="Near you"
        description="Find nearby you the available places to rent"
        style={styles.padding}
        actionText="See map"
        actionIcon="map"
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
        actionText="See more"
        actionIcon="list"
        onActionPress={showFilterModal}
      />
      <FlatList
        data={places}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Button value="Disconnnect" onPress={handleDisconnectPress} />
    </ScrollView>
    </SafeAreaView>
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
    zIndex: 5,
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
    //color: Colors.dark,
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
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 360,
    width: Layout.window.width,
    zIndex: 2,
  },
    profil: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
