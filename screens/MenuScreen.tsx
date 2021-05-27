import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {RootStackParamList} from '../types';
import Button from '../components/Button';
import {Entypo, Ionicons} from '@expo/vector-icons';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const MenuScreen = (props: Props) => {
  const {navigation} = props;

  const menu = [
    {
      title: 'Payment methods',
      onPress: () => navigation.navigate('PaymentMethods'),
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.headerBloc}>
        <Header type="back" />
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.profilBloc}
          onPress={() => navigation.navigate('Profil')}>
          <Image
            source={require('../assets/images/profile.jpeg')}
            style={styles.profilImage}
          />
          <Text style={styles.title}>Tristan Luong</Text>
          <Text style={styles.description}>Paris, France</Text>
        </TouchableOpacity>
        {menu.map((item) => (
          <TouchableOpacity style={styles.item} onPress={item.onPress}>
            <Text style={styles.itemValue}>{item.title}</Text>
            <Entypo name="chevron-thin-right" size={16} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerBloc: {
    backgroundColor: Colors.dark,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 250,
  },
  contentContainer: {
    marginTop: -120,
    flex: 1,
    paddingHorizontal: 20,
  },
  profilBloc: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    ...Layout.shadow,
  },
  profilImage: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  title: {
    fontFamily: 'poppins',
    paddingTop: 10,
    fontSize: 16,
  },
  description: {
    fontFamily: 'poppins-light',
    paddingTop: 5,
    fontSize: 12,
    color: Colors.gray,
  },
  item: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...Layout.shadow,
  },
  itemValue: {
    fontFamily: 'poppins-light',
    flex: 1,
  },
});

export default MenuScreen;
