import React from 'react';
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
import {MessagesParamList, PlaceType} from '../types';
import {placesMock} from '../mocks';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PlaceCard from '../components/PlaceCard';

type MessagesScreenNavigationProp = StackNavigationProp<
  MessagesParamList,
  'Messages'
>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const FavoritesScreen = (props: Props) => {
  const {navigation} = props;

  const handleItemPress = (place: PlaceType) => {
    navigation.navigate('PlaceDetail', {place: place});
  };

  const renderItem = ({item, index}: {item: PlaceType; index: number}) => (
    <PlaceCard key={index} place={item} onPress={() => handleItemPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header type="menu" showProfil={true} />
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('favorites_title')}</Text>
        <TextInput
          style={styles.input}
          placeholder="Search a user"
          placeholderTextColor={Colors.gray}
        />
        <FlatList
          data={placesMock}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
