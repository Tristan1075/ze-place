import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, ImageBackground, Image, Dimensions, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { HomeParamList } from '../types';

import CardWithRate from '../components/CardWithRate';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


type PlaceScreenNavigationProp = RouteProp<
  HomeParamList,
  'PlaceDetail'
>

type Props = {
  navigation: PlaceScreenNavigationProp;
};

const PlaceDetailScreen = (props: Props) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const route = useRoute<PlaceScreenNavigationProp>();
  const item = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
      <Image source={{uri: item.images[activeImage] }} style={styles.cover} />
      <View style={styles.container}>
        <Header type='back' />
        <View style={styles.content}>
          <Text style={styles.title}>A River runs</Text>
          <Text style={styles.subtitle}>Island in the Aegean Sea</Text>
          <View style={styles.descriptionBloc}>
            <Text style={styles.about}>About Rivers runs</Text>
            <Rating 
              startingValue={item.rate} 
              imageSize={20} 
              tintColor={Colors.background} 
            />
            <View style={styles.row}>
              {item.reviewers.map((reviewer) => 
                  <Image source={{uri: reviewer }} style={styles.reviewers} />
              )}
              <View style={styles.reviewersNumber}>
                <Text style={styles.subtitle}>5+</Text>
              </View>
              <Text style={styles.reviewersText}>People reviewed this</Text>
            </View>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget tellus vel nisl ultricies vestibulum sit amet vel ipsum. Praesent consectetur pulvinar dignissim. Etiam a nisi scelerisque, pellentesque nunc id, vulputate lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer accumsan lorem id massa aliquam faucibus. Donec posuere vulputate justo eget commodo. Integer bibendum elit pharetra eros luctus, et cursus nibh pharetra. In fermentum nisl metus, vel vehicula purus suscipit et. Mauris nisl ante, accumsan id porttitor quis, porta convallis sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In vitae ipsum dignissim, molestie turpis ac, ultricies risus. Phasellus bibendum bibendum mollis. Nam ut efficitur diam. Curabitur ex sapien, dictum a dui nec, interdum viverra urna. Maecenas euismod semper eros, in laoreet neque elementum non.</Text>
          </View>
        </View>
        <ScrollView style={styles.imagePicker} contentContainerStyle={styles.center} showsVerticalScrollIndicator={false}>
          {item.images.map((image, index) => 
            <TouchableWithoutFeedback onPress={() => setActiveImage(index)}>
              <Image source={{uri: image }} style={[styles.imagePreview, activeImage === index && styles.activeImage]} />
            </TouchableWithoutFeedback>
          )}
        </ScrollView>
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
    position: 'relative',
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: Colors.white,
  },
  descriptionBloc: {
    paddingTop: 80,
    alignItems: 'flex-start',
  },
  about: {
    fontFamily: 'playfair-bold',
    fontSize: 24,
    color: Colors.secondary,
    paddingBottom: 10,
  },
  description: {
    paddingTop: 10,
    fontFamily: 'poppins-light',
    fontSize: 16,
  },
  imagePicker: {
    position: 'absolute',
    right: 20,
    top: 260,
    backgroundColor: 'rgba(220, 220, 220, 0.6)',
    borderRadius: 10,
    padding: 6,
    height: 250,
  },
  center: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  imagePreview: {
    margin: 3,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  activeImage: {
    width: 55,
    height: 55,
  },
  padding: {
    paddingBottom: 10,
  },
  reviewers: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
  },
  reviewersNumber: {
    fontFamily: 'poppins',
    fontSize: 16,
    backgroundColor: Colors.primary, 
    color: Colors.white,
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  reviewersText: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: Colors.primary,  
  }
});


export default PlaceDetailScreen;