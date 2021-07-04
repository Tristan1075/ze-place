import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import UserStore from '../store/UserStore';
import {Conversation} from '../types';

type Props = {
  conversation: Conversation;
  onConversationPress: () => void;
};

const MessageItem = (props: Props) => {
  const {conversation, onConversationPress} = props;
  const time =
    conversation.lastMessage && new Date(conversation.lastMessage.created_at);
  return (
    <TouchableOpacity style={styles.container} onPress={onConversationPress}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              conversation.userId == UserStore.user._id
                ? conversation.ownerAvatar
                : conversation.userAvatar,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.from}>
            {conversation?.userId == UserStore.user._id
              ? conversation?.ownerName
              : conversation?.userName}
          </Text>
          {conversation.lastMessage && (
            <Text style={styles.lastMessage}>
              {conversation.lastMessage.text}
            </Text>
          )}
        </View>
      </View>
      {conversation.lastMessage && (
        <Text style={styles.date}>
          {time.getHours() < 10 ? '0' : ''}
          {time.getHours()}:{time.getMinutes() < 10 ? '0' : ''}
          {time.getMinutes()}
        </Text>
      )}
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
  lastMessage: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: Colors.gray,
  },
  date: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: Colors.primary,
  },
});

export default MessageItem;
