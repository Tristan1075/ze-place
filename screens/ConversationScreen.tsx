import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Subscription} from '@unimodules/core';
import * as Notifications from 'expo-notifications';
// @ts-ignore
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Ionicons} from '@expo/vector-icons';

import {Conversation, Message, MessagesParamList} from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {
  createConversation,
  getConversationByPlaceAndUser,
  getMessageByConversation,
  sendMessageApi,
} from '../api/conversations';
import i18n from 'i18n-js';
import Header from '../components/Header';
import ConversationItem from '../components/ConversationItem';
import UserStore from '../store/UserStore';

type ConversationScreenNavigationProp = RouteProp<
  MessagesParamList,
  'Conversation'
>;

type Props = {
  navigation: ConversationScreenNavigationProp;
};

const ConversationScreen = (props: Props) => {
  const {navigation} = props;
  const route = useRoute<ConversationScreenNavigationProp>();
  const conversationParams = route.params.conversation;
  const [messages, setMessages] = useState<
    Array<{value: string; from: string}>
  >([]);
  const [conversation, setConversation] = useState<Conversation>();
  const [input, setInput] = useState<string>('');
  const _flatList = useRef<FlatList>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const init = useCallback(async () => {
    getConversationByPlaceAndUser(
      conversationParams.placeId,
      conversationParams.userId,
      conversationParams.ownerId,
    ).then(async (conversationResult) => {
      if (conversationResult) {
        getMessageByConversation(conversationResult?._id).then((m) => {
          const messagesMap = m.map((message) => ({
            value: message.text,
            from: UserStore.user._id === message.senderId ? '1' : '0',
          }));
          setMessages(messagesMap);
          setConversation(conversationResult);
          initNotifications(conversationResult);
          scrollToBottom();
        });
      }
    });
  }, []);

  const initNotifications = (conversationResult: Conversation) => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notif: any) => {
        if (
          notif.request.content.data &&
          notif.request.content.data.conversation.id.toString() ===
            conversationResult?._id.toString()
        ) {
          const messageNotif = notif.request.content.data.conversation?.message;
          if (messageNotif) {
            const newMessage = {
              value: messageNotif,
              from: '0',
            };
            setMessages((prev) => [...prev, newMessage]);
            scrollToBottom();
          }
        }
      },
    );
    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  };

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const renderItem = ({item}: {item: Message}) => (
    <ConversationItem message={item} conversation={conversation} />
  );

  const sendMessagePress = async () => {
    if (conversation) {
      sendMessage(conversation);
    } else {
      const conversationResult = await createConversation(
        conversationParams.placeId,
        conversationParams.userId,
        conversationParams.ownerId,
      );
      sendMessage(conversationResult);
    }
  };

  const sendMessage = (c: Conversation) => {
    if (input.length > 0) {
      const newMessage = {
        value: input,
        from: '1',
      };
      sendMessageApi(
        c?._id,
        UserStore.user._id,
        UserStore.user._id === conversationParams.userId
          ? conversationParams.ownerId
          : conversationParams.userId,
        input,
      );
      setMessages((prev) => [...prev, newMessage]);
      setInput('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (_flatList.current) {
      _flatList.current.scrollToEnd();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type="back"
        showProfil={true}
        title={
          conversation?.userId == UserStore.user._id
            ? conversation?.ownerName
            : conversation?.userName
        }
      />
      <View style={styles.content}>
        <FlatList
          ref={_flatList}
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={i18n.t('conversation_type_message')}
            placeholderTextColor={Colors.gray}
            style={styles.input}
            blurOnSubmit={false}
            value={input}
            onTouchStart={scrollToBottom}
            returnKeyType="send"
            onSubmitEditing={sendMessagePress}
            onChangeText={(text) => setInput(text)}
          />
          <Ionicons
            size={20}
            name="md-send-sharp"
            color={Colors.primary}
            onPress={sendMessagePress}
          />
        </View>
      </View>
      <KeyboardSpacer topSpacing={-80} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Layout.padding,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingRight: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 20,
    fontFamily: 'poppins',
  },
});

export default ConversationScreen;
