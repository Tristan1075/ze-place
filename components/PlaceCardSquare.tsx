import React, {useCallback, useState, useEffect, useContext} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import {Booking, Place, Review} from '../types';
import {getPlaceById} from '../api/places';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import {ModalContext} from '../providers/modalContext';
import UserStore from '../store/UserStore';
import {getPlaceReviewByUser} from '../api/reviews';

type Props = {
  item: Booking;
  onPress?: (placeId?: string) => void;
};

const PlaceCardSquare = ({item, onPress}: Props) => {
  const [place, setPlace] = useState<Place>();
  const {handleModal} = useContext(ModalContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const dateTime = date;
  const {user} = UserStore;

  const getUserPlace = async (item) => {
    setReviews(await getPlaceReviewByUser(item.placeId, user._id));
  };

  useEffect(() => {
    const getPlace = async () => setPlace(await getPlaceById(item.placeId));
    getUserPlace(item);
    getPlace();
  }, []);

  const handleReviewPress = async (placeId: string) => {
    handleModal({
      child: <WriteReviewScreen userId={user._id} placeId={placeId} />,
    });
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress && onPress(place?._id)}>
      <ImageBackground
        source={{
          uri: place?.images[0].url
            ? place.images[0].url
            : 'https://www.leden-spa-aqua-forme.fr/wp-content/uploads/2018/05/jk-placeholder-image.jpg',
        }}
        style={styles.cover}>
        <Text style={styles.title}>{item.placeTitle}</Text>
        <View style={styles.flex} />
        <Text style={styles.duration}>{item.startDate}</Text>
        <View style={styles.row}>
          <Text style={styles.duration}>{item.duration} days</Text>
          <Text style={styles.duration}>{item.price}€</Text>
        </View>
      </ImageBackground>
      {item.endDate.slice(0, 10) < dateTime && reviews.length == 0 && (
        <Text
          onPress={() => handleReviewPress(item.placeId)}
          style={styles.reviewersText}>
          Ecrire une review
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 150,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  reviewersText: {
    fontFamily: 'poppins',
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'oswald',
    color: Colors.white,
    fontSize: 16,
  },
  duration: {
    fontFamily: 'oswald-light',
    color: Colors.white,
  },
  cover: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
  },
  badgeContainer: {
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  badge: {
    fontFamily: 'oswald',
    color: Colors.dark,
    fontSize: 12,
  },
  text: {
    fontFamily: 'oswald',
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlaceCardSquare;
