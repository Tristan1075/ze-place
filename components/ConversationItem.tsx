import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Colors from '../constants/Colors';
import {Conversation, Message} from '../types';

type Props = {
  message: Message;
  conversation?: Conversation;
};

const ConversationItem = (props: Props) => {
  const {message, conversation} = props;
  return (
    <View>
      <View
        style={message.from === '1' ? styles.toMessage : styles.fromMessage}>
        <Text style={message.from === '1' ? styles.to : styles.from}>
          {message.value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fromMessage: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteOpacity,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 240,
    marginVertical: 10,
  },
  toMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    width: 240,
    marginVertical: 10,
  },
  from: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: Colors.secondary,
  },
  to: {
    color: Colors.white,
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

export default ConversationItem;
