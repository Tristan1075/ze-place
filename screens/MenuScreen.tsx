import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import * as SecureStore from 'expo-secure-store';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {RootStackParamList} from '../types';
import {Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import {User} from '../types';
import {CommonActions} from '@react-navigation/native';
import UserStore from '../store/UserStore';
import {ModalContext} from '../providers/modalContext';
import BankAccountScreen from './BankAccountScreen';
import PromoScreen from './PromoScreen';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const MenuScreen = (props: Props) => {
  const {navigation} = props;
  const [user] = useState<User>(UserStore.user);
  const {handleModal} = useContext(ModalContext);

  const handleDisconnectPress = async () => {
    await SecureStore.deleteItemAsync('access-token');
    UserStore.updateUser({});
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Root'}],
      }),
    );
  };

  const menu = [
    {
      title: i18n.t('menu_promotional_codes'),
      onPress: () =>
        handleModal({
          child: <PromoScreen />,
        }),
    },
    {
      title: i18n.t('menu_report_bug'),
      onPress: () => navigation.navigate('BugTicket'),
    },
    {
      title: i18n.t('menu_payement_methods'),
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      title: i18n.t('menu_bank_account'),
      onPress: () =>
        handleModal({
          child: <BankAccountScreen />,
        }),
    },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.headerBloc}>
          <Header type="back" />
        </View>
        <View style={styles.contentContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profil')}>
            <View style={styles.profilBloc}>
              <Image
                source={user && {uri: user.avatar}}
                style={styles.profilImage}
              />
              <Text style={styles.title}>
                {user && user.first_name} {user && user.last_name}
              </Text>
              <Text style={styles.description}>{user && user.address}</Text>
            </View>
          </TouchableWithoutFeedback>
          {menu.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={[styles.item]} onPress={item.onPress}>
                <Text style={styles.itemValue}>{item.title}</Text>
                <Entypo name="chevron-thin-right" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.item, styles.loggout]}
        onPress={handleDisconnectPress}>
        <Text style={styles.itemValue}>Logout</Text>
        <MaterialCommunityIcons name="location-exit" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },
  loggout: {
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },
  headerBloc: {
    backgroundColor: Colors.dark,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 250,
  },
  contentContainer: {
    marginTop: -100,
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
    marginBottom: 10,
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
