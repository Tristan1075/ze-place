import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {RootStackParamList} from '../types';
import Button from '../components/Button';

type RootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfilList'
>;

type Props = {
  navigation: RootScreenNavigationProp;
};

const ProfilListScreen = (props: Props) => {
  const {navigation} = props;
  useEffect(() => {}, []);

  const handleProfilpress = () => {
    navigation.navigate('Profil');
  };

  const handlePromopress = () => {
    navigation.navigate('Promo');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header type="back" />
      <ScrollView style={styles.scrollView}>
      <View style={styles.view}>
              <Button
          value={i18n.t('profil')}
          onPress={handleProfilpress}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
        />
      </View>
      <View style={styles.view}>
              <Button
          value={i18n.t('paiementMethod')}
          onPress={() => console.log('Pay')}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
        />
      </View>
      <View style={styles.view}>
              <Button
          value={i18n.t('myAnnonces')}
          onPress={() => console.log('Annonces')}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
        />
      </View>
      <View style={styles.view}>
        <Button
          value={i18n.t('promo')}
          onPress={handlePromopress}
          backgroundColor={Colors.white}
          textColor={Colors.dark}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 130,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
  },
  row: {
    flex: 1,
  },
  view: {
    flex: 0.4,
    paddingHorizontal: Layout.padding,
    paddingVertical: 30,
    backgroundColor: Colors.background,
  }
});

export default ProfilListScreen;
