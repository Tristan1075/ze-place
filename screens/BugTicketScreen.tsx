import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Button from '../components/Button';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import {RootStackParamList,BugForm} from '../types';
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

  const handleBugPress = async () => {
    setForm({...form, senderId: user._id});
    await createBug(form);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerBloc}>
        <Header type="back" />
      </View>
      <View style={styles.paddingHorizontal}>
        <Image source={require('../assets/images/check.png')} style={styles.image} />
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
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  button: {
    marginVertical: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
    marginTop: -140,
  },
});

export default BugTicketScreen;
