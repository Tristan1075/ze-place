import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import {
  BookingTab,
  BottomTabParamList,
  HomeParamList,
  FavoritesTab,
  MessageTab,
} from '../types';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';
import HomeScreen from '../screens/HomeScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CreatePlaceScreen from '../screens/PlaceCreation/CreatePlaceScreen';
import PlaceList from '../screens/PlaceListScreen';
import UserBookingsScreen from '../screens/UserBookingsScreen';
import ConversationScreen from '../screens/ConversationScreen';
import BookingAndPlacesScreen from '../screens/BookingAndPlacesScreen';
import MessagesScreen from '../screens/MessagesScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.primary,
        keyboardHidesTabBar: true,
      }}>
      <BottomTab.Screen
        name={i18n.t('tap_bar_home_title')}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={i18n.t('tap_bar_booking_title')}
        component={BookingNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="list" color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name={i18n.t('tap_bar_message_title')}
        component={MessageNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="message-processing-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={i18n.t('tap_bar_favorites_title')}
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
      <HomeStack.Screen name="Messages" component={MessagesScreen} />
    </HomeStack.Navigator>
  );
};

const BookingStack = createStackNavigator<BookingTab>();

const BookingNavigator = () => {
  return (
    <BookingStack.Navigator screenOptions={{headerShown: false}}>
      <BookingStack.Screen
        name="BookingAndPlaces"
        component={BookingAndPlacesScreen}
      />
      <BookingStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <BookingStack.Screen name="UserBookings" component={UserBookingsScreen} />
      <BookingStack.Screen name="Conversation" component={ConversationScreen} />
      <BookingStack.Screen name="Messages" component={MessagesScreen} />
      <HomeStack.Screen name="CreatePlace" component={CreatePlaceScreen} />
    </BookingStack.Navigator>
  );
};

const MessageStack = createStackNavigator<MessageTab>();

const MessageNavigator = () => {
  return (
    <MessageStack.Navigator screenOptions={{headerShown: false}}>
      <MessageStack.Screen
        name="Messages"
        component={MessagesScreen}
        initialParams={{tab: true}}
      />
      <MessageStack.Screen name="Conversation" component={ConversationScreen} />
    </MessageStack.Navigator>
  );
};

const FavoritesStack = createStackNavigator<FavoritesTab>();

const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator screenOptions={{headerShown: false}}>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavoritesStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <FavoritesStack.Screen
        name="Conversation"
        component={ConversationScreen}
      />
      <FavoritesStack.Screen name="Messages" component={MessagesScreen} />
    </FavoritesStack.Navigator>
  );
};
