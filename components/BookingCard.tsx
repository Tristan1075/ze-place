import {AntDesign} from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';
import {Booking} from '../types';
import {getDuration} from '../utils';

type Props = {
  item: Booking;
  onAcceptPress: (bookingId: string) => void;
  onDenyPress: (bookingId: string) => void;
  isUser: boolean;
  onSendMessagePress: () => void;
};

const BookingCard = ({
  item,
  onAcceptPress,
  onDenyPress,
  isUser,
  onSendMessagePress,
}: Props) => {
  console.log(getDuration(item.startDate));
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.name}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.date}>
            {i18n.t('component_booking_card_from')} {item.startDate}
          </Text>
          <Text style={styles.date}>
            {i18n.t('component_booking_card_to')} {item.endDate}
          </Text>
          <Text style={styles.date}>
            {item.duration} {i18n.t('component_booking_card_days')}
          </Text>
          <Text style={styles.date}>{item.price}€</Text>
        </View>
        <Image source={{uri: item.avatar}} style={styles.cover} />
      </View>
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}
      {!isUser && (
        <TouchableOpacity onPress={onSendMessagePress} style={styles.sendRow}>
          <Text style={styles.sendText}>
            {i18n.t('component_booking_card_send_message')}
          </Text>
          <AntDesign name="message1" size={20} />
        </TouchableOpacity>
      )}
      <View style={styles.border} />
      {getDuration(item.startDate) - 1 > 2 ? (
        <Text style={styles.name}>
          {`${i18n.t('component_booking_still_have')} ${
            getDuration(item.startDate) - 1
          } ${i18n.t('component_booking_card_days_left')}`}
        </Text>
      ) : (
        <Text style={styles.name}>
          {i18n.t('component_booking_card_cancel')}
        </Text>
      )}
      <View style={styles.actions}>
        {!item.isDenied && !item.isPaid && getDuration(item.startDate) - 1 > 2 && (
          <TouchableOpacity onPress={() => item._id && onDenyPress(item._id)}>
            <AntDesign name="closecircleo" size={30} color={Colors.dark} />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.status,
            !item.isDenied && item.isAccepted && styles.success,
          ]}>
          {item.isDenied
            ? i18n.t('component_booking_card_denied')
            : item.isAccepted
            ? i18n.t('component_booking_card_accepted')
            : i18n.t('component_booking_card_pending')}
        </Text>
        {!item.isDenied && !item.isAccepted && !isUser && (
          <TouchableOpacity onPress={() => item._id && onAcceptPress(item._id)}>
            <AntDesign
              name="checkcircleo"
              size={30}
              color={Colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  status: {
    fontFamily: 'oswald-light',
    fontSize: 16,
  },
  success: {
    color: Colors.success,
  },
  sendRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  sendText: {
    fontFamily: 'oswald',
    paddingRight: 10,
  },
});

export default BookingCard;
