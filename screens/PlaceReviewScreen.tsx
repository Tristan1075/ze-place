import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {FilterForm, HomeParamList, Place, Review} from '../types';
import {getAllPlaces} from '../api/places';
import DescriptionBloc from '../components/DescriptionBloc';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import PlaceCard from '../components/PlaceCard';
import {addFavorite, removeFavorite} from '../api/customer';
import {Ionicons} from '@expo/vector-icons';
import {ModalContext} from '../providers/modalContext';
import SearchFilterScreen from './SearchFilterScreen';
import MapScreen from './MapScreen';
import {getUserLocation} from '../utils';
import UserStore from '../store/UserStore';
import { getPlaceReview } from '../api/reviews';
import { Rating } from 'react-native-ratings';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  placeId:string
};

const PlaceReviewScreen = (props: Props) => {
    const [placeID, setPlaceID] = useState<string>(props.placeId);
    const [reviews,setReviews] = useState<Review[]>()
    useEffect(() => {
        const init = async () => setReviews(await getPlaceReview(placeID));
      
        init();       
        
      
        }, [ ]);

    return (
        <View style={styles.container}>
        <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollView}>
        <Text style={styles.mainTitle}>Reviews</Text>
        { reviews && reviews.map(e =>  
        <View style={styles.review}>
            <TitleWithDescription style={styles.title} title={e.name} subtitle={true} description={e.description} />
            <Rating
              startingValue={e.rate}
              imageSize={20}
              value={e.rate}
              precision={0.1}
              readonly
              ratingColor = {Colors.dark}
            />  
        </View>)}
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
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
      },
      contentScrollView: {
        paddingBottom: 80,
      },
      padding: {
        paddingBottom: 10,
      },
      review:{
        flexDirection: 'row',
        paddingBottom: 20,

      },
      title: {
        fontFamily: 'poppins-light',
        fontSize: 14,
        color: Colors.dark,
        flex: 1,
      },
      mainTitle:{
        fontFamily: 'poppins-light',
        fontSize: 24,
        textAlign: 'center',
        color: Colors.dark,
      }

})

export default PlaceReviewScreen;
