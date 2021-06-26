import React, {useEffect, useState, useRef} from 'react';
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

import {Message, MessagesParamList, Place} from '../types';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {createConversation, getConversationById} from '../api/conversations';

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
  const place: Place = route.params.place;
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [input, setInput] = useState<string>('');
  const _flatList = useRef<FlatList>(null);

  useEffect(() => {
    console.log(route);
    // getConversationById(sender.conversationId)
    //   .then((res) => {
    //     console.log(res);
    //     setMessages(res.messages);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setMessages(err.messages);
    //   });
  }, []);

  const renderItem = ({item}: {item: Message}) => (
    <ConversationItem message={item} />
  );

  const sendMessage = async () => {
    const newMessage = {
      value: input,
      from: '1',
    };
    if (messages.length === 0) {
      const conversation = await createConversation(
        place._id,
        UserStore.user._id,
        place.ownerId,
      );
      if (conversation) {

      }
      console.log(conversation);
    } else {
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
      {/* <Header
        type="back"
        showProfil={true}
        title={sender.from}
        profilPicture={sender.picture}
      /> */}
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
