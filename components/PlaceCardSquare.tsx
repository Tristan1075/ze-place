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
import WriteReviewScreen from '../screens/WriteReviewScreen';
import {ModalContext} from '../providers/modalContext';
import UserStore from '../store/UserStore';
import {getPlaceReviewByUser} from '../api/reviews';
import Layout from '../constants/Layout';

type Props = {
  item: Booking;
  onPress?: (placeId?: string) => void;
  showReview?: boolean;
};

const PlaceCardSquare = ({item, onPress}: Props) => {
  const {handleModal} = useContext(ModalContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const {user} = UserStore;

  const getUserPlace = async () => {
    setReviews(await getPlaceReviewByUser(item.placeId, user._id));
  };

  useEffect(() => {
    getUserPlace();
  }, []);

  const handleReviewPress = async (placeId: string) => {
    handleModal({
      child: (
        <WriteReviewScreen
          userId={user._id}
          placeId={placeId}
          onPublish={publishReview}
        />
      ),
    });
  };

  const publishReview = () => {
    getUserPlace();
    handleModal();
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress && onPress(item?.placeId)}>
      <ImageBackground
        source={{
          uri: item.placeCover,
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
      {item.isAccepted && item.isPast && reviews.length === 0 && (
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
    height: 170,
    backgroundColor: Colors.white,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    ...Layout.shadow,
  },
  reviewersText: {
    fontFamily: 'poppins-light',
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: 10,
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
