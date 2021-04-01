import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {HomeParamList, PlaceType} from '../types';
import Header from '../components/Header';
import {facilities} from '../mocks';
import Button from '../components/Button';
import {mapStyle} from '../utils/mapStyle';

type PlaceScreenNavigationProp = RouteProp<HomeParamList, 'PlaceDetail'>;

type Props = {
  navigation: PlaceScreenNavigationProp;
};

const PlaceDetailScreen = () => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const route = useRoute<PlaceScreenNavigationProp>();
  const item: PlaceType = route.params.place;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
        <ImageBackground
          source={{uri: item.images[activeImage].url}}
          style={styles.cover}>
          <View style={styles.favorite}>
            <Ionicons size={20} name="star" color={Colors.primary} />
          </View>
        </ImageBackground>
        <View style={styles.container}>
          <Header type="back" />
          <View style={[styles.content, styles.paddingTop]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>Island in the Aegean Sea</Text>
            <View style={styles.descriptionBloc}>
              <Text style={styles.contentTitle}>About {item.title}</Text>
              <View style={styles.padding}>
                <Rating
                  startingValue={item.rate}
                  imageSize={20}
                  tintColor={Colors.background}
                />
              </View>
              <View style={styles.row}>
                {item.reviews.map((review, index) => (
                  <Image
                    key={index}
                    source={{uri: item.images[0].url}}
                    style={styles.reviewers}
                  />
                ))}
                <View style={styles.reviewersNumber}>
                  <Text style={styles.subtitle}>{item.reviews.length}+</Text>
                </View>
                <Text style={styles.reviewersText}>People reviewed this</Text>
              </View>
              <Text
                style={styles.description}
                numberOfLines={seeMore ? 999 : 5}>
                {item.description}
              </Text>
              <Text style={styles.seeMore} onPress={() => setSeeMore(!seeMore)}>
                See more
              </Text>
            </View>
            <Text style={styles.contentTitle}>Features</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.facilitiesContainer}>
            {facilities.map((facility, index) => (
              <View style={styles.facilities} key={index}>
                <Image source={facility.url} style={styles.facilityIcon} />
                <Text style={styles.facilityTitle}>Stockage</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.content}>
            <MapView
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              scrollEnabled={false}
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <Text style={styles.contentTitle}>About Rivers runs</Text>
          </View>
          <ScrollView
            style={styles.imagePicker}
            contentContainerStyle={styles.center}
            showsVerticalScrollIndicator={false}>
            {item.images.map((image, index) => (
              <TouchableWithoutFeedback
                onPress={() => setActiveImage(index)}
                key={index}>
                <Image
                  source={{uri: image.url}}
                  style={[
                    styles.imagePreview,
                    activeImage === index && styles.activeImage,
                  ]}
                />
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.chooseBanner}>
        <Text style={styles.chooseBannerText}>Per day</Text>
        <Text style={styles.chooseBannerPrice}>100€</Text>
        <Button
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          value={'Select place'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
  },
  paddingTop: {
    paddingTop: 250,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    position: 'relative',
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
  },
  cover: {
    position: 'absolute',
    width: Layout.window.width,
    height: 480,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  content: {
    paddingHorizontal: Layout.padding,
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
    paddingTop: 40,
    alignItems: 'flex-start',
  },
  contentTitle: {
    fontFamily: 'playfair-bold',
    fontSize: 24,
    color: Colors.secondary,
    paddingVertical: 10,
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
  },
  facilities: {
    backgroundColor: 'rgb(228, 236, 249)',
    marginRight: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  facilityTitle: {
    fontFamily: 'poppins-light',
    fontSize: 12,
    color: Colors.secondary,
  },
  map: {
    height: 120,
    borderRadius: 20,
    marginTop: 20,
  },
  seeMore: {
    paddingTop: 5,
    fontFamily: 'poppins',
    fontSize: 12,
    color: Colors.secondary,
  },
  chooseBanner: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: Layout.padding,
    position: 'absolute',
    left: Layout.padding,
    right: Layout.padding,
    bottom: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  chooseBannerText: {
    fontFamily: 'poppins',
    color: Colors.white,
    marginRight: 5,
  },
  chooseBannerPrice: {
    fontFamily: 'poppins-bold',
    color: Colors.white,
    flex: 1,
  },
  facilitiesContainer: {
    paddingLeft: Layout.padding,
    paddingRight: 5,
  },
  favorite: {
    position: 'absolute',
    right: 20,
    top: 60,
    backgroundColor: 'rgba(220, 220, 220, 0.4)',
    padding: 5,
    borderRadius: 20,
  },
});

export default PlaceDetailScreen;
