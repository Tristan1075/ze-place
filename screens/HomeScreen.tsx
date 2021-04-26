import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type="menu" showProfil={true} />
        <View style={styles.container}>
          <Text style={styles.title}>{i18n.t('discover')}</Text>
          <SimpleInput style={styles.input} placeholder="Search" />
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
    fontFamily: 'oswald-light',
    fontSize: 32,
    color: Colors.dark,
    paddingBottom: 20,
    width: 200,
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
});

export default HomeScreen;
