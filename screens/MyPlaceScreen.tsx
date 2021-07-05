import React from 'react';
import {SafeAreaView, StyleSheet, FlatList, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {MessagesParamList, Place} from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PlaceCard from '../components/PlaceCard';
import TitleWithDescription from '../components/TitleWithDescription';
import EmptyBloc from '../components/EmptyBloc';
import {useNavigation} from '@react-navigation/native';
import i18n from 'i18n-js';

type MessagesScreenNavigationProp = StackNavigationProp<
  MessagesParamList,
  'Messages'
>;

type Props = {
  places: Place[];
};

const MyPlaceScreen = ({places}: Props) => {
  const navigation = useNavigation();

  const handleItemPress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place._id});
  };

  const renderItem = ({item, index}: {item: Place; index: number}) => {
    return (
      <PlaceCard
        key={index}
        place={item}
        onPress={() => handleItemPress(item)}
        isFavorite={item.isFavorite}
        showCounter={true}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TitleWithDescription
          title={i18n.t('my_place_title')}
          subtitle={true}
          description={i18n.t('my_place_description')}
        />
        {places.length > 0 ? (
          <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <EmptyBloc
              title={i18n.t('my_place_no_place')}
              image={require('../assets/images/impatient.png')}
              size={100}
            />
          </View>
        )}
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

export default MyPlaceScreen;
