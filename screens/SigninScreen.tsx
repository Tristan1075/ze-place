import * as React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import {RootStackParamList} from '../types';
import Header from '../components/Header';

type RootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signin'
>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const SigninScreen = (props: Props) => {
  const {navigation} = props;

  const handleSigninPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Tab'}],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.flex}>
      <Header type="back" />
      <View style={styles.container}>
        <Text style={styles.title}>Hello ! Signin to get started !</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.gray}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.gray}
        />
        <Button
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
