import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
// @ts-ignore
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Ionicons} from '@expo/vector-icons';

import {Conversation, Message, MessagesParamList, Place} from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {
  createConversation,
  getConversationByPlaceAndUser,
  getMessageByConversation,
  sendMessageApi,
} from '../api/conversations';

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
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [conversation, setConversation] = useState<Conversation>();
  const [input, setInput] = useState<string>('');
  const _flatList = useRef<FlatList>(null);

  const init = useCallback(async () => {
    getConversationByPlaceAndUser(
      conversationParams.placeId,
      conversationParams.userId,
      conversationParams.ownerId,
    ).then(async (conversationResult) => {
      if (!conversationResult) {
        conversationResult = await createConversation(
          conversationParams.placeId,
          conversationParams.userId,
          conversationParams.ownerId,
        );
      }
      if (conversationResult) {
        getMessageByConversation(conversationResult?._id).then((m) => {
          const messagesMap = m.map((message) => ({
            value: message.text,
            from: UserStore.user._id === message.senderId ? '1' : '0',
          }));
          setMessages(messagesMap);
        });
      }
      setConversation(conversationResult);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const renderItem = ({item}: {item: Message}) => (
    <ConversationItem message={item} />
  );

  const sendMessage = async () => {
    if (conversation) {
      const newMessage = {
        value: input,
        from: '1',
      };
      sendMessageApi(conversation?._id, UserStore.user._id, input);
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
      <Header type="back" showProfil={true} />
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
            placeholder="Type your message"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            blurOnSubmit={false}
            value={input}
            onTouchStart={scrollToBottom}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            onChangeText={(text) => setInput(text)}
          />
          <Ionicons
            size={20}
            name="md-send-sharp"
            color={Colors.primary}
            onPress={sendMessage}
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
