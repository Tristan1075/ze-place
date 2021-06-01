import React, {useEffect, useState} from 'react';
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
import {getUser} from '../api/customer';

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
  const places = user?.ownedPlaces;
  useEffect(() => {
    const init = async () => {
      setUser(await getUser());
    };
    init();
  }, []);

  const handleItemPress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place});
  };

  const renderItem = ({item, index}: {item: Place; index: number}) => (
    <PlaceCard key={index} place={item} onPress={() => handleItemPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header type="back" showProfil={false} />
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('places_title')}</Text>
        <TextInput
          style={styles.input}
          placeholder="Search a user"
          placeholderTextColor={Colors.gray}
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

export default FavoritesScreen;
