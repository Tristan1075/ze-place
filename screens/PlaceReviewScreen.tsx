import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Header from '../components/Header';
import {FilterForm, HomeParamList, Place, Review} from '../types';
import TitleWithDescription from '../components/TitleWithDescription';
import {getPlaceReview} from '../api/reviews';
import {Rating} from 'react-native-ratings';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import i18n from 'i18n-js';
import EmptyBloc from '../components/EmptyBloc';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  placeId: string;
};

const PlaceReviewScreen = (props: Props) => {
  const [placeID, setPlaceID] = useState<string>(props.placeId);
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    const init = async () => setReviews(await getPlaceReview(placeID));
    init();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollView}>
        <TitleWithDescription title={i18n.t('review_title')} subtitle={true} />
        {reviews && reviews?.length > 0 ? (
          reviews.map((e) => (
            <View style={styles.review}>
              <View style={styles.align}>
                <View style={styles.row}>
                  <Text style={styles.title}>{e.name}</Text>
                  <Text style={styles.name}>{e.writerName}</Text>
                </View>
                <Text style={styles.description}>{e.description}</Text>
                <Rating
                  startingValue={e.rate}
                  imageSize={16}
                  value={e.rate}
                  precision={0.1}
                  readonly
                  tintColor={Colors.white}
                  ratingColor={Colors.dark}
                />
              </View>
            </View>
          ))
        ) : (
          <EmptyBloc
            size={60}
            image={require('../assets/images/sad.png')}
            title={i18n.t('review_no_reviews')}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: 130,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentScrollView: {
    paddingBottom: 80,
  },
  padding: {
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    ...Layout.shadow,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  align: {
    alignItems: 'flex-start',
    flex: 1,
  },
  title: {
    fontFamily: 'oswald-light',
    fontSize: 18,
    color: Colors.dark,
    flex: 1,
  },
  description: {
    fontFamily: 'poppins',
    paddingBottom: 5,
  },
  mainTitle: {
    fontFamily: 'oswald-light',
    fontSize: 24,
    color: Colors.dark,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'poppins',
    paddingBottom: 5,
  },
});

export default PlaceReviewScreen;
