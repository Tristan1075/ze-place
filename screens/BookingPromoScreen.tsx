import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import Header from '../components/Header';
import {FilterForm, HomeParamList, Place, Review, Promo} from '../types';
import TitleWithDescription from '../components/TitleWithDescription';
import {getPlaceReview} from '../api/reviews';
import {Rating} from 'react-native-ratings';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { getActivePromos } from '../api/customer';

type RootScreenNavigationProp = StackNavigationProp<HomeParamList, 'Home'>;

type Props = {
    place: Place;
    onPromoSelected:Function;
};

const PlaceReviewScreen = ({place,onPromoSelected}: Props) => {
    const [activePromo, setActivePromo] = useState<Promo[]>();
    const [placePromo, setPlace] = useState<Place>(place);


  useEffect(() => {
    const getActivePromovar = async () =>
    setActivePromo(await getActivePromos());        
    getActivePromovar();
  }, []);

  const handlePromo =  (promo) =>{

    let finalPrice = placePromo.price
    finalPrice -= finalPrice * (promo.value/100)
    
    console.log('final',finalPrice);
    console.log('place',placePromo.price);
    onPromoSelected(finalPrice,promo)

    
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScrollView}>

        <View>
          <Text style={styles.title}>{i18n.t('promo_code_active')}</Text>

          {activePromo &&
            activePromo.map((e) => (
              <TouchableOpacity style={styles.codeCard} onPress={() => handlePromo(e)}>
                <TitleWithDescription
                  title={e.name}
                  subtitle={true}
                  description={e.end_date.slice(0, 10)}></TitleWithDescription>
              </TouchableOpacity>
            ))}
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
  },
  title: {
    fontFamily: 'oswald-light',
    fontSize: 18,
    color: Colors.dark,
  },
  description: {
    fontFamily: 'poppins',
    paddingBottom: 5,
  },
  mainTitle: {
    fontFamily: 'oswald',
    fontSize: 24,
    color: Colors.dark,
    marginBottom: 20,
  },
  codeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    flex: 0.9,
  },
  name: {
    fontFamily: 'poppins',
    paddingBottom: 5,
  },
});

export default PlaceReviewScreen;
