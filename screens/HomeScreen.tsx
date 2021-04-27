import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
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
import {HomeParamList, PlaceType} from '../types';
import {getAllPlaces} from '../api/places';
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

  useEffect(() => {
    const init = async () => setPlaces(await getAllPlaces());
    init();
  }, []);

  const handlePlacePress = (place: PlaceType) => {
    navigation.navigate('PlaceDetail', {place: place});
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
});

export default HomeScreen;
