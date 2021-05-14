import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type Props = {
  title: string;
  description?: string;
  subdescription?: string;
  onPress: () => void;
};

const SearchCard = ({title, description, subdescription, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.description}>{subdescription}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    ...Layout.shadow,
  },
  cardTitle: {
    color: Colors.dark,
    fontFamily: 'poppins-bold',
    paddingBottom: 5,
  },
  description: {
    color: Colors.dark,
    fontFamily: 'poppins-light',
    fontSize: 12,
  },
});

export default SearchCard;
