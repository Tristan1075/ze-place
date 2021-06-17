import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import {RootStackParamList} from '../types';
import RootScreen from '../screens/RootScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfilScreen from '../screens/ProfilScreen';
import PromoScreen from '../screens/PromoScreen';
import PaymentMethods from '../screens/PaymentMethods';
import PaymentMethodForm from '../screens/PaymentMethodForm';
import MenuScreen from '../screens/MenuScreen';
import MyPlaceScreen from '../screens/MyPlaceScreen';

import {navigationRef} from '../App';
import BugTicketScreen from '../screens/BugTicketScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Promo" component={PromoScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
      <Stack.Screen name="PaymentMethodForm" component={PaymentMethodForm} />
      <Stack.Screen name="MyPlace" component={MyPlaceScreen} />
      <Stack.Screen name="BugTicket" component={BugTicketScreen} />

    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef} linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
