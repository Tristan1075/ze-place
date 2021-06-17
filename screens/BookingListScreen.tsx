import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';
import EmptyBloc from '../components/EmptyBloc';

import Header from '../components/Header';
import PlaceCardSquare from '../components/PlaceCardSquare';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import UserStore from '../store/UserStore';
import {Place, User} from '../types';

const BookingListScreen = (props: Props) => {
  const {navigation} = props;
  const [user] = useState<User>(UserStore.user);

  const handlePlacePress = (place: Place) => {
    navigation.navigate('PlaceDetail', {
      place: place,
    });
  };

  const renderItem = ({item, index}: {item: Place; index: number}) => {
    return (
      <PlaceCardSquare key={index} item={item} onPress={handlePlacePress} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type="menu" showProfil={true} />
      <View style={styles.content}>
        <TitleWithDescription
          title="Bookings"
          subtitle={true}
          description="Find nearby you the available places to rent"
        />
        <FlatList
          data={user.bookings}
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
});

export default BookingListScreen;
