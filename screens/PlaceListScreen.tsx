import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import i18n from 'i18n-js';
import {FilterForm, HomeParamList, Place, User} from '../types';
import Header from '../components/Header';
import {searchPlaces} from '../api/places';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PlaceCard from '../components/PlaceCard';
import {addFavorite, getUser, removeFavorite} from '../api/customer';
import {ModalContext} from '../providers/modalContext';
import SearchFilterScreen from './SearchFilterScreen';
import TitleWithDescription from '../components/TitleWithDescription';

type PlaceListScreenNavigationProp = RouteProp<HomeParamList, 'PlaceList'>;

const PlaceList = () => {
  const navigation = useNavigation();
  const route = useRoute<PlaceListScreenNavigationProp>();
  const [places, setPlaces] = useState<Place[]>();
  const [user, setUser] = useState<User>();
  const filter = route.params.filter;
  const {handleModal} = useContext(ModalContext);

  const init = useCallback(async () => {
    setUser(await getUser());
    setPlaces(await searchPlaces(filter));
  }, [filter]);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const showFilterModal = () => {
    handleModal({
      child: <SearchFilterScreen onSearchPress={handleSeeAnnouncesPress} />,
    });
  };

  const handleSeeAnnouncesPress = async (newFilter: FilterForm) => {
    setPlaces(await searchPlaces(newFilter));
    handleModal();
  };

  const handleItemPress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place._id});
  };

  const handleFavoritePress = async (p: Place) => {
    const isFavorite = Boolean(
      user && user.favorites.find((foundPlace) => foundPlace._id === p._id),
    );
    isFavorite ? removeFavorite(p) : addFavorite(p);
    await init();
  };

  const renderItem = ({item, index}: {item: Place; index: number}) => {
    const isFavorite = Boolean(
      user && user.favorites.find((foundPlace) => foundPlace._id === item._id),
    );
    return (
      <PlaceCard
        key={index}
        isFavorite={isFavorite}
        place={item}
        onFavoritePress={handleFavoritePress}
        onPress={() => handleItemPress(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type="back" showProfil={true} />
      <View style={styles.content}>
        <TitleWithDescription
          title={i18n.t('search_place_title')}
          description="Find nearby you the available places to rent"
          actionText="See more"
          actionIcon="list"
          subtitle={true}
          onActionPress={showFilterModal}
        />
        <FlatList
          data={places}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Layout.padding,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 32,
    color: Colors.primary,
    paddingBottom: 20,
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
    fontFamily: 'poppins',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginBottom: 40,
  },
});

export default PlaceList;
