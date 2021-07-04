import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import Header from '../components/Header';
import {MessageTab, Conversation} from '../types';
import {senders} from '../mocks';
import MessageItem from '../components/MessageItem';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {
  getConversationByPlace,
  getConversationByUser,
} from '../api/conversations';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import UserStore from '../store/UserStore';
import EmptyBloc from '../components/EmptyBloc';
import TitleWithDescription from '../components/TitleWithDescription';

type MessagesScreenNavigationProp = StackNavigationProp<MessageTab, 'Messages'>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const MessagesScreen = (props: Props) => {
  const {navigation} = props;
  const route = useRoute<MessagesScreenNavigationProp>();

  const [conversations, setConversations] = useState<Conversation[]>();

  const init = useCallback(async () => {
    const conversation: Conversation[] = await getConversationByUser(
      UserStore.user._id,
    );
    if (conversation) {
      conversation.sort((o1: Conversation, o2: Conversation) => {
        if (!o1.lastMessage || !o2.lastMessage) {
          return;
        }
        return o1.lastMessage._id < o2.lastMessage._id;
      });
      setConversations(conversation);
    }
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handleMessagePress = (item: Conversation) => {
    if (item) {
      navigation.navigate('Conversation', {
        conversation: {
          placeId: item.placeId,
          ownerId: UserStore.user._id,
          userId: item.userId,
          conversation: item,
        },
      });
    }
  };

  const renderItem = ({item, index}: {item: Conversation; index: number}) => (
    <View key={index}>
      <MessageItem
        conversation={item}
        onConversationPress={() => handleMessagePress(item)}
      />
      {index !== senders.length - 1 && <View style={styles.separator} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header type={route.params.tab ? 'menu' : 'back'} showProfil={true} />
      <View style={styles.content}>
        <TitleWithDescription
          title={i18n.t('messages_title')}
          subtitle={true}
          description={i18n.t('messages_description')}
        />
        {conversations && conversations.length > 0 ? (
          <FlatList
            data={conversations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyBloc
            size={80}
            image={require('../assets/images/impatient.png')}
            title={i18n.t('message_no_data')}
          />
        )}
      </View>
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
  input: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#2d2d2d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    fontFamily: 'poppins',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginBottom: 40,
  },
});

export default MessagesScreen;
