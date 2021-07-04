import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Button from '../components/Button';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import {RootStackParamList, BugForm} from '../types';
import UserStore from '../store/UserStore';
import TitleWithDescription from '../components/TitleWithDescription';
import SimpleInput from '../components/SimpleInput';
import {createBug} from '../api/ticket';

type RootScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const input: BugForm = {
  name: '',
  description: '',
  senderId: '',
};

const BugTicketScreen = (props: Props) => {
  const {navigation} = props;
  const [form, setForm] = useState<BugForm>(input);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const {user} = UserStore;

  const handleBugPress = async () => {
    setIsFetching(true);
    form.senderId = user._id;
    if (form.name.length === 0 || form.description.length === 0) {
    } else {
      const result = await createBug(form);
      if (result) {
        setIsFetching(false);
        navigation.pop();
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.screen}>
        <View style={styles.headerBloc}>
          <Header type="back" />
        </View>
        <View style={styles.paddingHorizontal}>
          <Image
            source={require('../assets/images/check.png')}
            style={styles.image}
          />
          <TitleWithDescription title={i18n.t('bug_ticket_title')} />
          <SimpleInput
            placeholder={i18n.t('bug_ticket_title_input')}
            type="default"
            onChangeText={(value) => setForm({...form, name: value})}
          />
          <TitleWithDescription title={i18n.t('bug_ticket_description')} />
          <SimpleInput
            onChangeText={(v) => setForm({...form, description: v})}
            placeholder={i18n.t('bug_ticket_description_input')}
            multiline={true}
            numberOfLines={1}
          />
          <Button
            value={i18n.t('bug_ticket_submit')}
            onPress={handleBugPress}
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            style={styles.button}
            isFetching={isFetching}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
