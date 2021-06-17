import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import * as SecureStore from 'expo-secure-store';
import Button from '../components/Button';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {RootStackParamList,BugForm} from '../types';
import {Entypo, MaterialCommunityIcons} from '@expo/vector-icons';
import {User} from '../types';
import {getUser} from '../api/customer';
import {CommonActions} from '@react-navigation/native';
import UserStore from '../store/UserStore';
import TitleWithDescription from '../components/TitleWithDescription';
import SimpleInput from '../components/SimpleInput';
import { createBug } from '../api/ticket';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const input: BugForm = {
 name:'',
 description:'',
 senderId : ''
};

const BugTicketScreen = (props: Props) => {
  const {navigation} = props;
  const [form, setForm] = useState<BugForm>(input);
  const {user} = UserStore;

  useEffect(() => {
      }, []);

      const handleBugPress = async () => {
        console.log(user._id);
        setForm({...form, senderId: user._id});
        console.log(form);
        await createBug(form);
        
      }
  return (
    <View style={styles.screen}>
        <View style={styles.headerBloc}>
        <Header type="back" />
      </View>
      <View style={styles.paddingHorizontal}>
        
      <TitleWithDescription
            title="Name"
          />
          <SimpleInput
            placeholder="Enter the name of your bug"
            type="default"
            onChangeText={(value) =>
              setForm({...form, name: value})
            }
          />
          <TitleWithDescription
            title="Description"
          />
          <SimpleInput
            onChangeText={(v) => setForm({...form, description: v})}
            placeholder="Describe your bug"
            multiline={true}
            numberOfLines={1}
          />
      <Button
            value="Validate value"
            onPress={handleBugPress}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            style={styles.button}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerBloc: {
    backgroundColor: Colors.dark,
    paddingTop: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 250,
  },
  button: {
    marginVertical: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
});

export default BugTicketScreen;
