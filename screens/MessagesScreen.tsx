import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Header from '../components/Header';
import {MessagesParamList, Conversation, Place} from '../types';
import {senders} from '../mocks';
import MessageItem from '../components/MessageItem';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {getConversationByPlace} from '../api/conversations';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import UserStore from '../store/UserStore';

type MessagesScreenNavigationProp = StackNavigationProp<
  MessagesParamList,
  'Messages'
>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const MessagesScreen = (props: Props) => {
  const {navigation} = props;
  const route = useRoute<ConversationScreenNavigationProp>();
  const place: Place = route.params.place;

  const [conversations, setConversations] = useState<Conversation[]>();

  const init = useCallback(async () => {
    const conversation = await getConversationByPlace(place._id);
    if (conversation) {
      setConversations(conversation);
    }
  }, []);

  useEffect(() => {
    navigation.addListener('focus', init);
  }, [init, navigation]);

  const handleMessagePress = (item: Conversation) => {
    navigation.navigate('Conversation', {
      conversation: {
        placeId: place._id,
        ownerId: UserStore.user._id,
        userId: item.userId,
      },
    });
  };

  const renderItem = ({item, index}: {item: Conversation; index: number}) => (
    <View>
      <MessageItem
        message={item}
        onMessagePress={() => handleMessagePress(item)}
      />
      {index !== senders.length - 1 && <View style={styles.separator} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header type="back" showProfil={true} />
      <View style={styles.content}>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
