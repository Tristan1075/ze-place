import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {FilterForm, HomeParamList, Place} from '../types';
import {getAllPlaces} from '../api/places';
import DescriptionBloc from '../components/DescriptionBloc';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import PlaceCard from '../components/PlaceCard';
import {addFavorite, removeFavorite} from '../api/customer';
import {Ionicons} from '@expo/vector-icons';
import {ModalContext} from '../providers/modalContext';
import SearchFilterScreen from './SearchFilterScreen';
import MapScreen from './MapScreen';
import {getUserLocation} from '../utils';
import UserStore from '../store/UserStore';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const HomeScreen = (props: Props) => {
  const {navigation} = props;
  const [places, setPlaces] = useState<Array<Place>>([]);
  const {handleModal} = useContext(ModalContext);

  const init = useCallback(async () => {
    setPlaces(await getAllPlaces());
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handlePlacePress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place});
  };

  const showFilterModal = () => {
    handleModal({
      child: <SearchFilterScreen onSearchPress={handleSeeAnnouncesPress} />,
    });
  };

  const showMapModal = async () => {
    try {
      const location = await getUserLocation();
      if (location) {
        handleModal({
          child: (
            <MapScreen
              initialCoords={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
            />
          ),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeeAnnouncesPress = (filter: FilterForm) => {
    navigation.navigate('PlaceList', {filter: filter});
    handleModal();
  };

  const handleFavoritePress = async (p: Place) => {
    p.isFavorite ? await removeFavorite(p) : await addFavorite(p);
    await init();
  };

  const renderCarouselItem = ({item}: {item: Place}) => {
    return (
      <CardWithRate
        place={item}
        onPress={() => handlePlacePress(item)}
        key={item._id}
      />
    );
  };

  const renderListItem = ({item}: {item: Place}) => {
    return (
      <View style={styles.paddingHorizontal} key={item._id}>
        <PlaceCard
          place={item}
          onPress={() => handlePlacePress(item)}
          onFavoritePress={handleFavoritePress}
          isFavorite={item.isFavorite}
        />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Image
        source={require('../assets/images/home_banner.jpg')}
        style={styles.imageBanner}
      />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Header
          type="menu"
          showProfil={true}
          profilPicture={UserStore.user.avatar}
        />
        <Text style={styles.title}>{i18n.t('discover')}</Text>
        <SimpleInput
          isEditable={false}
          style={styles.input}
          placeholder="Search"
          suffix={<Ionicons name="search" size={20} color={Colors.gray} />}
          onPress={showFilterModal}
        />
      </View>
      <TitleWithDescription
        title="Near you"
        subtitle={true}
        description="Find nearby you the available places to rent"
        style={styles.padding}
        actionText="See map"
        actionIcon="map"
        onActionPress={showMapModal}
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
      <DescriptionBloc onPress={() => navigation.navigate('CreatePlace')} />
      <TitleWithDescription
        title="Announces"
        description="Find nearby you the available places to rent"
        style={styles.padding}
        actionText="See more"
        actionIcon="list"
        subtitle={true}
        onActionPress={showFilterModal}
      />
      {places.slice(0, 5).map((item) => (
        <View style={styles.paddingHorizontal} key={item._id}>
          <PlaceCard
            place={item}
            onPress={() => handlePlacePress(item)}
            onFavoritePress={handleFavoritePress}
            isFavorite={item.isFavorite}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingBottom: 60,
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
