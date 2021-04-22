import React, {useEffect} from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/routers';
import * as SecureStore from 'expo-secure-store';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import {RootStackParamList} from '../types';

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
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          }),
        );
      }
      // ...
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
          'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      }}
      style={styles.container}>
      <Text style={styles.title}>The best tour packages in world !</Text>
      <Button
        value="Sign in"
        onPress={handleSigninPress}
        backgroundColor={Colors.white}
        textColor={Colors.primary}
      />
      <Text style={styles.text} onPress={handleSignupPress}>
        Create an account
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
