import React, {useState, useEffect} from 'react';
import {Modal, Animated, StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

import Colors from '../constants/Colors';
import SimpleInput from '../components/SimpleInput';
import TitleWithDescription from '../components/TitleWithDescription';
import Layout from '../constants/Layout';
import {Ionicons} from '@expo/vector-icons';

const SelectPlaceTypeScreen = () => {
  const [items, setItems] = React.useState([
    {name: 'Garden'},
    {name: 'Office'},
    {name: 'Parking'},
    {name: 'Cave'},
    {name: 'Warehouse'},
    {name: 'GREEN SEA'},
    {name: 'GREEN SEA'},
    {name: 'GREEN SEA'},
    {name: 'GREEN SEA'},
    {name: 'GREEN SEA'},
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select the type of your place</Text>
        <Text style={styles.description}>
          The type permits users to find exactly the place they need.{' '}
        </Text>
        <View style={styles.row}>
          <SimpleInput
            placeholder="Search a type"
            suffix={<Ionicons name="search" size={20} color={Colors.gray} />}
          />
        </View>
      </View>
      <FlatGrid
        data={items}
        showsVerticalScrollIndicator={false}
        style={styles.gridView}
        spacing={20}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    backgroundColor: Colors.dark,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 140,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.white,
    fontFamily: 'oswald',
    fontSize: 24,
    paddingBottom: 5,
  },
  description: {
    color: Colors.gray,
    fontFamily: 'poppins',
    fontSize: 14,
    paddingBottom: 10,
  },
  gridView: {
    marginTop: -40,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    height: 120,
    backgroundColor: Colors.white,
    ...Layout.shadow,
  },
  itemName: {
    fontSize: 14,
    color: Colors.dark,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
});

export default SelectPlaceTypeScreen;
