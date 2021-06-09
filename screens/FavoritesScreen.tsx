import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import {MessagesParamList, Place, User} from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PlaceCard from '../components/PlaceCard';
import {addFavorite, getUser, removeFavorite} from '../api/customer';

type MessagesScreenNavigationProp = StackNavigationProp<
  MessagesParamList,
  'Messages'
>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const FavoritesScreen = (props: Props) => {
  const {navigation} = props;
  const [user, setUser] = useState<User>();

  const init = useCallback(async () => {
    setUser(await getUser());
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handleItemPress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place});
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
      <Header type="menu" showProfil={true} />
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('favorites_title')}</Text>
        <FlatList
          data={user?.favorites}
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

export default FavoritesScreen;
