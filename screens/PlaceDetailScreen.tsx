import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {HomeParamList, Place, PlaceType} from '../types';
import Header from '../components/Header';
import Button from '../components/Button';
import {mapStyle} from '../utils/mapStyle';
import Feature from '../components/Feature';
import ToggleWithTitle from '../components/ToggleWithTitle';

type PlaceScreenNavigationProp = RouteProp<HomeParamList, 'PlaceDetail'>;

type Props = {
  navigation: PlaceScreenNavigationProp;
};

const PlaceDetailScreen = (props: Props) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const route = useRoute<PlaceScreenNavigationProp>();
  const item: Place = route.params.place;
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
        <Image
          source={{
            uri: item.images[activeImage]
              ? item.images[activeImage].url
              : 'https://www.leden-spa-aqua-forme.fr/wp-content/uploads/2018/05/jk-placeholder-image.jpg',
          }}
          style={styles.cover}
        />
        <View style={styles.favorite}>
          <Ionicons size={20} name="star" color={Colors.primary} />
        </View>
        <View style={styles.container}>
          <Header type="back" />
          <View style={[styles.content, styles.paddingTop]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.location.city}, {item.location.postalCode}{' '}
              {item.location.country}
            </Text>
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
                {item.aboutUser}
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
            {item.features.map((feature, index) => (
              <Feature feature={feature} key={index} />
            ))}
          </ScrollView>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Authorization</Text>
            <View style={styles.authorization}>
              <ToggleWithTitle
                title="Animals"
                value={item.authorizeAnimals}
                icon={
                  <FontAwesome5
                    name="dog"
                    size={30}
                    color={
                      item.authorizeAnimals ? Colors.primary : Colors.error
                    }
                  />
                }
              />
              <ToggleWithTitle
                title="Smoking"
                value={item.authorizeSmoking}
                icon={
                  <FontAwesome5
                    name="smoking"
                    size={30}
                    color={
                      item.authorizeSmoking ? Colors.primary : Colors.error
                    }
                  />
                }
              />
            </View>
            <View style={styles.authorization}>
              <ToggleWithTitle
                title="Music"
                value={item.authorizeMusic}
                icon={
                  <Ionicons
                    name="musical-note"
                    size={30}
                    color={item.authorizeMusic ? Colors.primary : Colors.error}
                  />
                }
              />
              <ToggleWithTitle
                title="Fire"
                value={item.authorizeFire}
                icon={
                  <MaterialCommunityIcons
                    name="fire"
                    size={30}
                    color={item.authorizeFire ? Colors.primary : Colors.error}
                  />
                }
              />
            </View>
            <ToggleWithTitle
              title="Food and drink"
              value={item.authorizeFoodAndDrink}
              icon={
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={30}
                  color={
                    item.authorizeFoodAndDrink ? Colors.primary : Colors.error
                  }
                />
              }
            />
            <Text style={styles.contentTitle}>About {item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.contentTitle}>Location</Text>
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
          </View>
          {item.images.length > 0 && (
            <ScrollView
              style={styles.imagePicker}
              contentContainerStyle={styles.center}
              showsVerticalScrollIndicator={false}>
              {item.images.map((image, index) => (
                <TouchableWithoutFeedback
                  onPress={() => setActiveImage(index)}
                  onLongPress={() => setImagePreview(true)}
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
          )}
        </View>
      </ScrollView>
      <View style={styles.chooseBanner}>
        <Text style={styles.chooseBannerText}>Per day</Text>
        <Text style={styles.chooseBannerPrice}>{item.price}€</Text>
        <Button
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          value={'Select place'}
        />
      </View>
      <Modal visible={imagePreview} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setImagePreview(false)}>
          <ImageViewer
            imageUrls={item.images}
            index={activeImage}
            enablePreload={true}
            backgroundColor={'rgba(0,0,0, 0.8)'}
            onClick={() => setImagePreview(false)}
          />
        </TouchableWithoutFeedback>
      </Modal>
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
    alignItems: 'center',
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
    fontFamily: 'oswald-bold',
    fontSize: 30,
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
    fontFamily: 'oswald-light',
    fontSize: 24,
    color: Colors.secondary,
    paddingVertical: 5,
  },
  description: {
    paddingTop: 10,
    fontFamily: 'poppins-light',
    fontSize: 15,
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
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
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
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    right: 20,
    top: 60,
    backgroundColor: 'rgba(220, 220, 220, 0.4)',
    padding: 5,
    borderRadius: 20,
  },
  authorization: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlaceDetailScreen;
