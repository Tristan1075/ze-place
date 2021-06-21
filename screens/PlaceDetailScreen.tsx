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
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  AntDesign,
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
import {getPlaceById, getSimilarPlaces} from '../api/places';
import PlaceCard from '../components/PlaceCard';
import {addFavorite, removeFavorite} from '../api/customer';
import i18n from 'i18n-js';
import EmptyBloc from '../components/EmptyBloc';
import UserStore from '../store/UserStore';
import {getBookingByPlaceAndUser, getBookingsByPlace} from '../api/bookings';
import PlaceReviewScreen from './PlaceReviewScreen';


type PlaceScreenNavigationProp = RouteProp<HomeParamList, 'PlaceDetail'>;

const PlaceDetailScreen = () => {
  const item = useRoute<PlaceScreenNavigationProp>().params.place;
  const navigation = useNavigation();
  const {handleModal} = useContext(ModalContext);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const [similarPlaces, setSimilarPlaces] = useState<Place[]>([]);
  const [userBooking, setUserBooking] = useState<Booking[]>([]);
  const [place, setPlace] = useState<Place>();

  const init = useCallback(async () => {

    setPlace(await getPlaceById(item));
    setUserBooking(await getBookingByPlaceAndUser(item));
    setSimilarPlaces(await getSimilarPlaces(item));
  }, [item]);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handlePlacePress = (p: Place) => {
    // @ts-ignore
    navigation.push('PlaceDetail', {place: p});
  };
  const handleReviewPress = async () =>{
    handleModal({
      child: <PlaceReviewScreen placeId={place?._id} />,
    });
  }

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
      child: <BookingScreen place={place} />,
    });
  };

  const handleSeeOwnerBookingsPress = () => {
    navigation.navigate('UserBookings', {
      placeId: place?._id,
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
            longitude: parseFloat(place?.location.longitude) || 0,
            latitude: parseFloat(place?.location.latitude) || 0,
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
            uri: place?.images[activeImage]
              ? place?.images[activeImage].url
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
              {place?.title}
            </Text>
            <Text style={styles.subtitle}>
              {place?.location.city}, {place?.location.postalCode}{' '}
              {place?.location.country}
            </Text>
            {place?.reviews.length > 0 ?
            <View style={styles.descriptionBloc}>
              <TouchableOpacity style={[styles.row, styles.padding]} onPress={() => navigation.navigate('Conversation')}>
                <AntDesign name='message1' style={styles.message} size={20} />
                <Text style={styles.description}>Send a message to owner</Text>
              </TouchableOpacity>
              <View style={styles.padding}>
                <Rating
                  startingValue={place?.rate}
                  imageSize={20}
                  value={place?.rate}
                  precision={0.1}
                  readonly
                  tintColor={Colors.background}
                />
              </View>
              <View style={styles.row} >
                <View style={styles.reviewersNumber}>
                  <Text onPress={() => handleReviewPress()} style={styles.subtitle} >{place?.reviews.length}+</Text>

                </View>
                <Text onPress={() => handleReviewPress()} style={styles.reviewersText}>
                  {i18n.t('place_detail_people_review_this')}
                </Text>
              </View>
            </View>
          :<View>
            <Text style={styles.noReview}>No reviews written</Text>
          </View> }
            <TitleWithDescription
              title={i18n.t('place_detail_features')}
              subtitle={true}
            />
          </View>
          <View style={styles.facilitiesContainer}>
            <FeatureList features={place?.features} />
          </View>
          <View style={styles.content}>
            <TitleWithDescription
              title={i18n.t('place_detail_authorization')}
              subtitle={true}
            />
            <View style={styles.authorization}>
              <ToggleWithTitle
                title={i18n.t('place_detail_animals')}
                value={place?.authorizeAnimals}
                icon={
                  <FontAwesome5
                    name="dog"
                    size={30}
                    color={
                      place?.authorizeAnimals ? Colors.primary : Colors.error
                    }
                  />
                }
              />
              <ToggleWithTitle
                title={i18n.t('place_detail_smoking')}
                value={place?.authorizeSmoking}
                icon={
                  <FontAwesome5
                    name="smoking"
                    size={30}
                    color={
                      place?.authorizeSmoking ? Colors.primary : Colors.error
                    }
                  />
                }
              />
            </View>
            <View style={styles.authorization}>
              <ToggleWithTitle
                title={i18n.t('place_detail_music')}
                value={place?.authorizeMusic}
                icon={
                  <Ionicons
                    name="musical-note"
                    size={30}
                    color={
                      place?.authorizeMusic ? Colors.primary : Colors.error
                    }
                  />
                }
              />
              <ToggleWithTitle
                title={i18n.t('place_detail_fire')}
                value={place?.authorizeFire}
                icon={
                  <MaterialCommunityIcons
                    name="fire"
                    size={30}
                    color={place?.authorizeFire ? Colors.primary : Colors.error}
                  />
                }
              />
            </View>
            <ToggleWithTitle
              title={i18n.t('place_detail_food_and_drink')}
              value={place?.authorizeFoodAndDrink}
              icon={
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={30}
                  color={
                    place?.authorizeFoodAndDrink ? Colors.primary : Colors.error
                  }
                />
              }
            />
            <TitleWithDescription
              title={i18n.t('place_detail_about') + ' ' + place?.title}
              subtitle={true}
            />
            <Text style={styles.description}>{place?.description}</Text>
            <Text style={styles.seeMore} onPress={() => setSeeMore(!seeMore)}>
              {i18n.t('place_detail_see_more')}
            </Text>
            <TitleWithDescription
              title={i18n.t('place_detail_location')}
              subtitle={true}
            />
            <MapView
              provider={PROVIDER_GOOGLE}
              onPress={handleMapPress}
              customMapStyle={mapStyle}
              scrollEnabled={false}
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(place?.location.latitude) || 0,
                longitude: parseFloat(place?.location.longitude) || 0,
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
          {place && place?.images.length > 0 && (
            <ScrollView
              style={styles.imagePicker}
              contentContainerStyle={styles.center}
              showsVerticalScrollIndicator={false}>
              {place?.images.map((image, index) => (
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
          {UserStore.user._id === place?.ownerId
            ? i18n.t('place_detail_active_bookings')
            : userBooking.length > 0 &&
              userBooking.find((booking) => !booking.isPast)
            ? ''
            : i18n.t('place_detail_per_day')}
        </Text>
        <Text style={styles.chooseBannerPrice}>
          {UserStore.user._id === place?.ownerId
            ? `${place?.bookings.length}`
            : userBooking.length > 0 &&
              userBooking.find((booking) => !booking.isPast)
            ? userBooking.find((booking) => !booking.isPast)?.startDate
            : `${place?.price}€`}
        </Text>
        <Button
          backgroundColor={Colors.white}
          textColor={Colors.primary}
          value={
            UserStore.user._id === place?.ownerId
              ? i18n.t('place_detail_see_bookings')
              : userBooking.length > 0 &&
                Boolean(!userBooking.find((booking) => booking.isPast))
              ? 'Ma réservation'
              : i18n.t('place_detail_book')
          }
          onPress={
            UserStore.user._id === place?.ownerId
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
            imageUrls={place?.images}
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
    paddingBottom: 20,
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
  noReview:{
    fontFamily: 'poppins',
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
    padding:60,
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
  message: {
    paddingRight: 10,
  }
});

export default PlaceDetailScreen;
