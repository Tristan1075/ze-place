import React, {useEffect} from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/routers';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import {RootStackParamList} from '../types';
import {getUser} from '../api/customer';
import UserStore from '../store/UserStore';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Root'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const RootScreen = (props: Props) => {
  const {navigation} = props;

  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync('access-token');
      if (token != null) {
        const user = await getUser();
        UserStore.updateUser(user);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          }),
        );
      }
    }
    getToken();
  });

  const handleSigninPress = () => {
    navigation.navigate('Signin');
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://ze-place.s3.eu-west-3.amazonaws.com/backgroundRoot.jpeg',
      }}
      style={styles.container}>
      <Text style={styles.title}>{i18n.t('root_title')}</Text>

      <Button
        value={i18n.t('root_sign_in')}
        onPress={handleSigninPress}
        backgroundColor={Colors.white}
        textColor={Colors.primary}
      />
      <Text style={styles.text} onPress={handleSignupPress}>
        {i18n.t('root_create_an_account')}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    paddingBottom: 20,
    fontFamily: 'playfair-bold',
    fontSize: 32,
    color: Colors.white,
  },
  text: {
    paddingBottom: 40,
    paddingTop: 20,
    fontFamily: 'poppins',
    fontSize: 14,
    color: Colors.white,
    textDecorationLine: 'underline',
  },
});

export default RootScreen;
