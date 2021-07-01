import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import { Conversation } from '../types';

type Props = {
  conversation: Conversation;
  onConversationPress: () => void;
};

const MessageItem = (props: Props) => {
  const {conversation, onConversationPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onConversationPress}>
      <View style={styles.container}>
        <Image source={{uri: conversation.userAvatar}} style={styles.image} />
        <Text style={styles.from}>{conversation.userName}</Text>
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
