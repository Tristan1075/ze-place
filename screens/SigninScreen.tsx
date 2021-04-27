import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/routers';
import * as SecureStore from 'expo-secure-store';

import {RootStackParamList, SigninForm} from '../types';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import {login} from '../api/auth';

type RootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signin'
>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const SigninScreen = (props: Props) => {
  const {navigation} = props;
  const [error, setError] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<SigninForm>({
    email: '',
    password: '',
  });

  const handleSigninPress = async () => {
    try {
      const token = await login(credentials);
      await SecureStore.setItemAsync('access-token', token.access_token);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Tab'}],
        }),
      );
    } catch (e) {
      setError(true);
      console.log(e);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Tab'}],
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <Header type="back" />
      <View style={styles.container}>
        <Text style={styles.title}>Hello ! Signin to get started !</Text>
        <TextInput
          onChange={() => setError(false)}
          onChangeText={(v) =>
            setCredentials({...credentials, email: v.toLowerCase()})
          }
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={Colors.gray}
        />
        <TextInput
          onChange={() => setError(false)}
          onChangeText={(v) => setCredentials({...credentials, password: v})}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor={Colors.gray}
        />
        {error && (
          <Text style={styles.error}>
            Your email and/or password do not match !
          </Text>
        )}
        <Button
          value="Sign in"
          onPress={handleSigninPress}
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          style={styles.button}
        />
        <View style={styles.row}>
          <Text style={styles.text}>Forgot your password ?</Text>
          <Text style={[styles.text, styles.underline]}>Sign up</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: 'relative',
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 32,
    color: Colors.primary,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: Colors.primary,
  },
  underline: {
    textDecorationLine: 'underline',
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
    marginVertical: 10,
  },
  button: {
    marginVertical: 20,
  },
  error: {
    paddingTop: 10,
    color: Colors.error,
    fontFamily: 'poppins',
  },
  circle: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 200,
    height: 200,
    bottom: -100,
    right: -100,
    borderRadius: 999,
  },
});

export default SigninScreen;
