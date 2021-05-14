import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import {
  BottomTabParamList,
  CreatePlaceParamList,
  HomeParamList,
  MessagesParamList,
} from '../types';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';

import MessagesScreen from '../screens/MessagesScreen';
import ConversationScreen from '../screens/ConversationScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CreatePlaceScreen from '../screens/PlaceCreation/CreatePlaceScreen';
import SearchFilterScreen from '../screens/SearchFilterScreen';

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
        name="Create"
        component={CreatePlaceNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="add-circle" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
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
      <HomeStack.Screen name="SearchFilter" component={SearchFilterScreen} />
    </HomeStack.Navigator>
  );
};

const CreatePlaceStack = createStackNavigator<CreatePlaceParamList>();

const CreatePlaceNavigator = () => {
  return (
    <CreatePlaceStack.Navigator
      screenOptions={{headerShown: false}}
      mode="modal">
      <CreatePlaceStack.Screen
        name="CreatePlace"
        component={CreatePlaceScreen}
      />
    </CreatePlaceStack.Navigator>
  );
};

const MessagesStack = createStackNavigator<MessagesParamList>();

const MessagesNavigator = () => {
  return (
    <MessagesStack.Navigator screenOptions={{headerShown: false}}>
      <MessagesStack.Screen name="Messages" component={MessagesScreen} />
      <MessagesStack.Screen
        name="Conversation"
        component={ConversationScreen}
      />
    </MessagesStack.Navigator>
  );
};

const FavoritesStack = createStackNavigator<MessagesParamList>();

const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator screenOptions={{headerShown: false}}>
      <FavoritesStack.Screen name="Messages" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
  );
};
