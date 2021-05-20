import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useRoute} from '@react-navigation/native';

import {HomeParamList} from '../types';
import Header from '../components/Header';

type PlaceListScreenNavigationProp = RouteProp<HomeParamList, 'PlaceList'>;

type Props = {
  navigation: PlaceListScreenNavigationProp;
};

const PlaceList = (props: Props) => {
  const {navigation} = props;
  const route = useRoute<PlaceListScreenNavigationProp>();
  const filter = route.params.filter;

  useEffect(() => {
    console.log(route);
  });

  return (
    <View style={styles.screen}>
      <Header type="back" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
  },
});

export default PlaceList;
