import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import SquaredButton from '../components/SquaredButton';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CardWithRate from '../components/CardWithRate';

const categories = [
  {
    icon: 'home'
  },
  {
    icon: 'parking'
  },
  {
    icon: 'garden'
  },
  {
    icon: 'home'
  }
];

const items = [
  {
    image: 'https://images.pexels.com/photos/1315919/pexels-photo-1315919.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    rate: 3.5,
  },
  {
    image: 'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    rate: 4.8,

  },
  {
    image: 'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    rate: 4.5,

  },
  {
    image: 'https://images.pexels.com/photos/2381872/pexels-photo-2381872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    rate: 2.5,
  }
];

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);


  const renderItem = ({item, index}) => <CardWithRate item={item} onPress={() => {}} />

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header type='menu' />
        <View style={styles.container}>
          <Text style={styles.title}>Discover world with us !</Text>
          <TextInput style={styles.input} placeholder='Search' />
          <View style={styles.iconsRow}>
            {categories.map((category, index) => 
              <SquaredButton 
                onPress={() => setActiveCategory(index)} 
                isActive={activeCategory === index} 
                icon={category.icon}
              />       
            )}
          </View>
        </View>
        <View>
        <Carousel
        contentContainerCustomStyle={{paddingLeft: 40}}
        useScrollView={true}
            data={items}
            renderItem={renderItem}
            sliderWidth={Layout.window.width}
            activeSlideAlignment='start'
            itemWidth={220}
          />
        </View>
        <Text style={styles.subtitle}>Popular Place</Text>
        <ScrollView horizontal={true}showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalList}>
            {items.map((item, index) => 
              <Image source={{uri: item.image}} style={styles.image} />     
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    fontFamily: 'playfair-bold',
    fontSize: 32,
    color: Colors.primary,
    paddingBottom: 20,
  },
  subtitle: {
    fontFamily: 'playfair-bold',
    fontSize: 26,
    color: Colors.primary,
    paddingTop: 20,
    paddingLeft: 40,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#2d2d2d",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: 'poppins',
  },
  iconsRow: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalList: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 40,
    paddingRight: 30,
  },
  image: {
    width: 130,
    height: 130,
    marginRight: 10,
    borderRadius: 10,
  }
});


export default HomeScreen;