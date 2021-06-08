import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';
import {getUser} from '../api/customer';

import Header from '../components/Header';
import TitleWithDescription from '../components/TitleWithDescription';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {User} from '../types';

const BookingListScreen = (props: Props) => {
  const {navigation} = props;
  const [user, setUser] = useState<User>();

  const init = useCallback(async () => {
    setUser(await getUser());
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handlePlacePress = (place: Place) => {
    navigation.navigate('PlaceDetail', {place: place});
  };

  return (
    <SafeAreaView>
      <Header type="menu" />
      <View>
        <TitleWithDescription title="My places" subtitle={true} />
        {user && user.bookings.length > 0 && (
          <FlatGrid
            data={user.bookings}
            showsVerticalScrollIndicator={false}
            spacing={20}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handlePlacePress(item)}>
                <ImageBackground
                  source={{
                    uri:
                      'https://www.leden-spa-aqua-forme.fr/wp-content/uploads/2018/05/jk-placeholder-image.jpg',
                  }}
                  style={styles.cover}>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>4</Text>
                  </View>
                  <View style={styles.flex} />
                  <Text style={styles.title}>saluzd,qld,zdklt</Text>
                  <Text style={styles.text}>Paris</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 150,
    backgroundColor: Colors.white,
    ...Layout.shadow,
  },
  title: {
    fontFamily: 'oswald-bold',
    color: Colors.white,
  },
  cover: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
  },
  badgeContainer: {
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  badge: {
    fontFamily: 'oswald',
    color: Colors.dark,
    fontSize: 12,
  },
  text: {
    fontFamily: 'oswald',
    color: Colors.white,
  },
});

export default BookingListScreen;
