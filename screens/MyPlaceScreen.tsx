import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {MessagesParamList, Place, User} from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import PlaceCard from '../components/PlaceCard';
import {getUser} from '../api/customer';
import UserStore from '../store/UserStore';
import TitleWithDescription from '../components/TitleWithDescription';
import EmptyBloc from '../components/EmptyBloc';
import {useNavigation} from '@react-navigation/native';

type MessagesScreenNavigationProp = StackNavigationProp<
  MessagesParamList,
  'Messages'
>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const MyPlaceScreen = (props: Props) => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState<Place[]>([]);

  const init = useCallback(async () => {
    const user = await getUser();
    setPlaces(user.ownedPlaces);
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handleItemPress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place._id});
  };

  const renderItem = ({item, index}: {item: Place; index: number}) => (
    <PlaceCard key={index} place={item} onPress={() => handleItemPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TitleWithDescription
          title="Active places"
          subtitle={true}
          description="Find nearby you the available places to rent"
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
            <EmptyBloc title="You don't have announces for the moment" />
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
