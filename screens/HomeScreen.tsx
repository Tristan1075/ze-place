import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import { Platform } from 'react-native';
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
import {hasBankAccount} from '../api/payment';
import BankAccountScreen from './BankAccountScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withSocketContext } from '../components/SocketProvider';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  navigation: RootScreenNavigationProp;
  socket: any;
};

const HomeScreen = (props: Props) => {
  const {navigation} = props;
  const {socket} = props.socket;

  const [places, setPlaces] = useState<Array<Place>>([]);
  const {handleModal} = useContext(ModalContext);

  const init = useCallback(async () => {
    socket.emit('init_conversations', {userId: UserStore.user._id});
    setPlaces(await getAllPlaces());
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handlePlacePress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place._id});
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

  const handleCreatePlacePress = async () => {
    if (await hasBankAccount(UserStore.user.stripeAccount)) {
      navigation.navigate('CreatePlace');
    } else {
      handleModal({
        child: <BankAccountScreen />,
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Image
        source={{uri:'https://ze-place.s3.eu-west-3.amazonaws.com/background.jpeg'}}
        style={styles.imageBanner}
      />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Header type="menu" showProfil={true} />
        <Text style={styles.title}>{i18n.t('home_discover')}</Text>
       
              <SimpleInput
                isEditable={false}
                style={styles.input}
                placeholder={i18n.t('home_search')}
                suffix={<Ionicons name="search" size={20} color={Colors.gray} />}
                onPress={showFilterModal}
              />
        
      </View>
      <TitleWithDescription
        title={i18n.t('home_near_you')}
        subtitle={true}
        description={i18n.t('home_find_nearby')}
        style={styles.padding}
        actionText={i18n.t('home_see_map')}
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
      <DescriptionBloc onPress={handleCreatePlacePress} />
      <TitleWithDescription
        title={i18n.t('home_announces')}
        description={i18n.t('home_find_nearby')}
        style={styles.padding}
        actionText={i18n.t('home_see_more')}
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
    paddingBottom: 20,
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

export default withSocketContext(HomeScreen);
