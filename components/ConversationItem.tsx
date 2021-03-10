import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import {Message} from '../types';

type Props = {
  message: Message;
};

const ConversationItem = (props: Props) => {
  const {message} = props;
  return (
    <View style={message.from === '1' ? styles.toMessage : styles.fromMessage}>
      <Text style={message.from === '1' ? styles.to : styles.from}>
        {message.value}
      </Text>
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
});

export default ConversationItem;
