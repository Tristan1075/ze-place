import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { HomeParamList } from '../types';

import CardWithRate from '../components/CardWithRate';
import Header from '../components/Header';


type PlaceScreenNavigationProp = RouteProp<
  HomeParamList,
  'PlaceDetail'
>

type Props = {
  navigation: PlaceScreenNavigationProp;
};

const PlaceDetailScreen = (props: Props) => {
  const route = useRoute<PlaceScreenNavigationProp>();
  const item = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Image source={{uri: item.image }} style={styles.cover} />
      <View style={styles.container}>
        <Header type='back' />
        <View style={styles.content}>
          <Text style={styles.title}>A River runs</Text>
          <Text style={styles.subtitle}>Island in the Aegean Sea</Text>
          <View style={styles.descriptionBloc}>
            <Text style={styles.about}>About Rivers runs</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget tellus vel nisl ultricies vestibulum sit amet vel ipsum. Praesent consectetur pulvinar dignissim. Etiam a nisi scelerisque, pellentesque nunc id, vulputate lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer accumsan lorem id massa aliquam faucibus. Donec posuere vulputate justo eget commodo. Integer bibendum elit pharetra eros luctus, et cursus nibh pharetra. In fermentum nisl metus, vel vehicula purus suscipit et. Mauris nisl ante, accumsan id porttitor quis, porta convallis sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In vitae ipsum dignissim, molestie turpis ac, ultricies risus. Phasellus bibendum bibendum mollis. Nam ut efficitur diam. Curabitur ex sapien, dictum a dui nec, interdum viverra urna. Maecenas euismod semper eros, in laoreet neque elementum non.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  cover: {
    position: 'absolute',
    width: Layout.window.width,
    height: 480,
    resizeMode: "cover",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  content: {
    paddingHorizontal: Layout.padding,
    paddingTop: 250,

  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 32,
    width: 250,
    color: Colors.white,
  },
  subtitle: {
    fontFamily: 'poppins',
    fontSize: 16,
    width: 250,
    color: Colors.white,
  },
  descriptionBloc: {
    paddingTop: 80,
  },
  about: {
    fontFamily: 'playfair-bold',
    fontSize: 24,
    color: Colors.secondary,
  },
  description: {
    fontFamily: 'poppins-light',
    fontSize: 16,
  }
});


export default PlaceDetailScreen;