import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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
import {Booking, BookingTab, HomeParamList, Place, User} from '../types';
import Header from '../components/Header';
import Button from '../components/Button';
import {mapStyle} from '../utils/mapStyle';
import ToggleWithTitle from '../components/ToggleWithTitle';
import {ModalContext} from '../providers/modalContext';
import MapScreen from './MapScreen';
import BookingScreen from './BookingScreen';
import CalendarPicker from '../components/CalendarPicker';
import TitleWithDescription from '../components/TitleWithDescription';
import FeatureList from '../components/FeatureList';
import {getSimilarPlaces} from '../api/places';
import PlaceCard from '../components/PlaceCard';
import {addFavorite, removeFavorite} from '../api/customer';
import i18n from 'i18n-js';
import EmptyBloc from '../components/EmptyBloc';
import UserStore from '../store/UserStore';
import {getBookingByPlaceAndUser, getBookingsByPlace} from '../api/bookings';

type PlaceScreenNavigationProp = RouteProp<HomeParamList, 'PlaceDetail'>;

const PlaceDetailScreen = () => {
  const navigation = useNavigation();
  const {handleModal} = useContext(ModalContext);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const item = useRoute<PlaceScreenNavigationProp>().params.place;
  const [similarPlaces, setSimilarPlaces] = useState<Place[]>([]);
  const [userBooking, setUserBooking] = useState<Booking[]>([]);

  const init = useCallback(async () => {
    setUserBooking(await getBookingByPlaceAndUser(item._id));
    setSimilarPlaces(await getSimilarPlaces(item._id));
  }, [item._id]);

  useEffect(() => {
    init();
  }, [init]);

  const handlePlacePress = (p: Place) => {
    // @ts-ignore
    navigation.push('PlaceDetail', {place: p});
  };

  const handleFavoritePress = async (p: Place) => {
    p.isFavorite ? removeFavorite(p) : addFavorite(p);
    await init();
  };

  const renderItem = ({
    item: placeItem,
    index,
  }: {
    item: Place;
    index: number;
  }) => {
    return (
      <View key={index}>
        <PlaceCard
          key={index}
          place={placeItem}
          onPress={() => handlePlacePress(placeItem)}
          onFavoritePress={handleFavoritePress}
          isFavorite={placeItem.isFavorite}
        />
      </View>
    );
  };

  const handleBookPress = () => {
    handleModal({
      child: <BookingScreen place={item} />,
    });
  };

  const handleSeeOwnerBookingsPress = () => {
    navigation.navigate('UserBookings', {
      placeId: item._id,
    });
  };

  const handleSeeBookingPress = () => {
    navigation.navigate('UserBookings', {
      userBooking,
    });
  };

  const handleMapPress = () => {
    handleModal({
      child: (
        <MapScreen
          initialCoords={{
            longitude: item.location.longitude,
            latitude: item.location.latitude,
          }}
        />
      ),
    });
  };

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
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.subtitle}>
              {item.location.city}, {item.location.postalCode}{' '}
              {item.location.country}
            </Text>
            <View style={styles.descriptionBloc}>
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
                <Text style={styles.reviewersText}>
                  {i18n.t('place_detail_people_review_this')}
                </Text>
              </View>
            </View>
            <TitleWithDescription
              title={i18n.t('place_detail_features')}
              subtitle={true}
            />
          </View>
          <View style={styles.facilitiesContainer}>
            <FeatureList features={item.features} />
          </View>
          <View style={styles.content}>
            <TitleWithDescription
              title={i18n.t('place_detail_authorization')}
              subtitle={true}
            />
            <View style={styles.authorization}>
              <ToggleWithTitle
                title={i18n.t('place_detail_animals')}
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
                title={i18n.t('place_detail_smoking')}
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
                title={i18n.t('place_detail_music')}
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
                title={i18n.t('place_detail_fire')}
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
              title={i18n.t('place_detail_food_and_drink')}
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
            <TitleWithDescription
              title={i18n.t('place_detail_about') + ' ' + item.title}
              subtitle={true}
            />
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.seeMore} onPress={() => setSeeMore(!seeMore)}>
              {i18n.t('place_detail_see_more')}
            </Text>
            <TitleWithDescription
              title={i18n.t('place_detail_location')}
              subtitle={true}
            />
            <MapView
              onTouchStart={handleMapPress}
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              scrollEnabled={false}
              style={styles.map}
              initialRegion={{
                latitude:
                  (item.location.latitude &&
                    parseFloat(item.location.latitude)) ||
                  0,
                longitude:
                  (item.location.longitude &&
                    parseFloat(item.location.longitude)) ||
                  0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <TitleWithDescription
              title={i18n.t('place_detail_availavilities')}
              subtitle={true}
            />
            <CalendarPicker />
            <View style={styles.paddingCardView}>
              <TitleWithDescription
                title={i18n.t('place_detail_similar_places')}
                subtitle={true}
              />
              {similarPlaces.length > 0 ? (
                <FlatList
                  data={similarPlaces}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <EmptyBloc
                  title="You have to wait, there is no place similar !"
                  image={require('../assets/images/impatient.png')}
                  size={100}
                />
              )}
            </View>
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
        <Text style={styles.chooseBannerText}>
          {UserStore.user._id === item.ownerId
            ? i18n.t('place_detail_active_bookings')
            : userBooking.length > 0 &&
              userBooking.find((booking) => !booking.isPast)
            ? ''
            : i18n.t('place_detail_per_day')}
        </Text>
        <Text style={styles.chooseBannerPrice}>
          {UserStore.user._id === item.ownerId
            ? `${item.bookings.length}`
            : userBooking.length > 0 &&
              userBooking.find((booking) => !booking.isPast)
            ? userBooking.find((booking) => !booking.isPast)?.startDate
            : `${item.price}€`}
        </Text>
        <Button
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          value={
            UserStore.user._id === item.ownerId
              ? i18n.t('place_detail_see_bookings')
              : userBooking.length > 0 &&
                Boolean(!userBooking.find((booking) => booking.isPast))
              ? 'Ma réservation'
              : i18n.t('place_detail_book')
          }
          onPress={
            UserStore.user._id === item.ownerId
              ? handleSeeOwnerBookingsPress
              : userBooking.length > 0 &&
                Boolean(!userBooking.find((booking) => booking.isPast))
              ? handleSeeBookingPress
              : handleBookPress
          }
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
    paddingBottom: 130,
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
    fontFamily: 'oswald',
    fontSize: 30,
    color: Colors.white,
  },
  subtitle: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: Colors.white,
  },
  descriptionBloc: {
    paddingTop: 60,
    alignItems: 'flex-start',
  },
  description: {
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
    height: 180,
    borderRadius: 20,
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
  paddingHorizontal: {
    paddingHorizontal: Layout.padding,
  },
  paddingCardView: {
    padding: 10,
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
