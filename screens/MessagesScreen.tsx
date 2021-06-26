import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Header from '../components/Header';
import {Sender, MessagesParamList} from '../types';
import {senders} from '../mocks';
import MessageItem from '../components/MessageItem';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type MessagesScreenNavigationProp = StackNavigationProp<
  MessagesParamList,
  'Messages'
>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const MessagesScreen = (props: Props) => {
  const {navigation} = props;

  const handleMessagePress = (sender: Sender) => {
    navigation.navigate('Conversation', {sender});
  };

  const renderItem = ({item, index}: {item: Sender; index: number}) => (
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
          data={senders}
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
