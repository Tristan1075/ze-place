import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

type Props = {
  message: any;
  onMessagePress: () => void;
};

const MessageItem = (props: Props) => {
  const {message, onMessagePress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onMessagePress}>
      <View style={styles.container}>
        <Image source={{uri: message.picture}} style={styles.image} />
        <Text style={styles.from}>{message.from}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.number}>2</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  from: {
    fontFamily: 'poppins-semiBold',
    fontSize: 14,
    color: Colors.secondary,
  },
  badge: {
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: Colors.white,
    fontFamily: 'poppins-semiBold',
  },
});

export default MessageItem;
