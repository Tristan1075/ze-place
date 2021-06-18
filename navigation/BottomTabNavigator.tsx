import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import {
  BookingTab,
  BottomTabParamList,
  HomeParamList,
  MessagesParamList,
} from '../types';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CreatePlaceScreen from '../screens/PlaceCreation/CreatePlaceScreen';
import PlaceList from '../screens/PlaceListScreen';
import UserBookingsScreen from '../screens/UserBookingsScreen';
import BookingListScreen from '../screens/BookingListScreen';
import ConversationScreen from '../screens/ConversationScreen';
import BookingAndPlacesScreen from '../screens/BookingAndPlacesScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{activeTintColor: Colors.primary}}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Booking and Places"
        component={BookingNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="list" color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) => {
  return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
};

const HomeStack = createStackNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <HomeStack.Screen name="CreatePlace" component={CreatePlaceScreen} />
      <HomeStack.Screen name="PlaceList" component={PlaceList} />
      <HomeStack.Screen name="UserBookings" component={UserBookingsScreen} />
      <HomeStack.Screen name="Conversation" component={ConversationScreen} />
    </HomeStack.Navigator>
  );
};

const BookingStack = createStackNavigator<BookingTab>();

const BookingNavigator = () => {
  return (
    <BookingStack.Navigator screenOptions={{headerShown: false}}>
      <BookingStack.Screen name="BookingAndPlaces" component={BookingAndPlacesScreen} />
      <BookingStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <BookingStack.Screen name="UserBookings" component={UserBookingsScreen} />
    </BookingStack.Navigator>
  );
};

const FavoritesStack = createStackNavigator<MessagesParamList>();

const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator screenOptions={{headerShown: false}}>
      <FavoritesStack.Screen name="Messages" component={FavoritesScreen} />
      <HomeStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </FavoritesStack.Navigator>
  );
};
