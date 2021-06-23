import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  Text,
  View,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '../components/Header';
import Colors from '../constants/Colors';

import BookingListScreen from './BookingListScreen';
import MyPlaceScreen from './MyPlaceScreen';

const BookingAndPlacesScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Booking'},
    {key: 'second', title: 'Places'},
  ]);

  const renderScene = SceneMap({
    first: BookingListScreen,
    second: MyPlaceScreen,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.primary}}
      style={{backgroundColor: Colors.background}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: Colors.dark,
            margin: 0,
            fontFamily: 'oswald',
            fontSize: 22,
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay} />
      <Header type="menu" showProfil={true} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overlay: {
    backgroundColor: Colors.dark,
  },
  tabBar: {
    backgroundColor: Colors.background,
  },
});

export default BookingAndPlacesScreen;
