import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';

import ProfilText from '../components/ProfilText';
import UserStore from '../store/UserStore';

const ProfilScreen = () => {
  const {user} = UserStore;
  return (
    <SafeAreaView style={styles.container}>
      <Header type="back" showProfil={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {user && (
          <View>
            <View style={styles.avatarContainer}>
              <Image source={{uri: user.avatar}} style={styles.avatar} />
            </View>
            <Text style={styles.title}>{i18n.t('personalInfo')}</Text>
            <ProfilText message={i18n.t('lastname')} value={user.last_name} />
            <ProfilText message={i18n.t('firstname')} value={user.first_name} />
            <ProfilText
              message={i18n.t('birthdate')}
              value={user.birthdate.slice(0, 10)}
            />
            <ProfilText message={i18n.t('desc')} value={user.description} />
            <Text style={styles.title}>{i18n.t('connexionInfo')}</Text>
            <ProfilText message={i18n.t('mail')} value={user.email} />
            <ProfilText message={i18n.t('password')} value={'********'} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingTop: 130,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'oswald',
    fontSize: 18,
    color: Colors.dark,
    paddingVertical: 10,
  },
});

export default ProfilScreen;
