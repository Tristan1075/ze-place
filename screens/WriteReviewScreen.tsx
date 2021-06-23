import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Picker,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';
import {FilterForm, HomeParamList, Place, Review, ReviewForm} from '../types';
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
import { getPlaceReview, createReview } from '../api/reviews';
import { Rating } from 'react-native-ratings';
import Button from '../components/Button';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
  userId:string,
  placeId:string
};

const input: ReviewForm = {
   name:'',
   description:'',
   writerId:'',
   placeId:'',
   rate:0
  };

const WriteReviewScreen = (props: Props) => {

    input.placeId = props.placeId;
    input.writerId = props.userId;
    const [reviewsForm,setReviewsForm] = useState<ReviewForm>(input);

    useEffect(() => {
        }, [ ]);


    const handleReviewPress = ()=>{
        createReview(reviewsForm)
        }
        
    return (
        <View style={styles.container}>
        <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollView}>
      <View style={styles.paddingHorizontal}>
        <Image source={require('../assets/images/check.png')} style={styles.image} />
        <TitleWithDescription
          title="Name"
        />
        <SimpleInput
          placeholder="Enter a title to your review"
          type="default"
          onChangeText={(value) =>
            setReviewsForm({...reviewsForm, name: value})
          }
        />
        <TitleWithDescription
          title="Description"
        />
        <SimpleInput
          onChangeText={(v) => setReviewsForm({...reviewsForm, description: v})}
          placeholder="Describe your review"
          multiline={true}
          numberOfLines={1}
        />
        <TitleWithDescription
          title="Rate"
        />
        <Picker
        selectedValue={reviewsForm.rate}
        onValueChange={(itemValue, itemIndex) => setReviewsForm({...reviewsForm, rate: itemValue})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>

        <Button
          value="Publish Review"
          onPress={handleReviewPress}
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          style={styles.button}
        />
      </View>
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
      image: {
          marginTop:100,
        width: 200,
        height: 200,
        alignSelf: 'center',
      },
      marginTop:{
        marginTop:30
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
      button: {
        marginVertical: 20,
      },
      paddingHorizontal: {
        paddingHorizontal: 20,
        marginTop: -140,
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

export default WriteReviewScreen;
