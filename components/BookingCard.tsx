import {AntDesign} from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {Booking} from '../types';

type Props = {
  item: Booking;
  onAcceptPress: (bookingId: string) => void;
  isUser: boolean;
};

const BookingCard = ({item, onAcceptPres, isUser}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.name}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.date}>From: {item.startDate}</Text>
          <Text style={styles.date}>To: {item.endDate}</Text>
          <Text style={styles.date}>{item.duration} days</Text>
          <Text style={styles.date}>{item.price}€</Text>
        </View>
        <Image source={{uri: item.avatar}} style={styles.cover} />
      </View>
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}
      <View style={styles.border} />
      <View style={styles.actions}>
        <TouchableOpacity>
          <AntDesign name="closecircleo" size={30} color={Colors.dark} />
        </TouchableOpacity>
        {item.isAccepted ||
          (isUser && <Text style={styles.date}>CANCEL BOOKING</Text>)}
        {!item.isAccepted ||
          (!isUser && (
            <TouchableOpacity onPress={() => onAcceptPress(item._id)}>
              <AntDesign
                name="checkcircleo"
                size={30}
                color={Colors.primary}
                style={styles.icon}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: 'oswald',
    paddingBottom: 10,
  },
  date: {
    fontFamily: 'oswald-light',
  },
  description: {
    paddingTop: 20,
    color: Colors.textGray,
    fontFamily: 'poppins-light',
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  border: {
    height: 1,
    backgroundColor: '#d5e9ed',
    marginVertical: 20,
  },
  actions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
});

export default BookingCard;
