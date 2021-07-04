import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import i18n from 'i18n-js';
import TitleWithDescription from '../components/TitleWithDescription';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import {RootStackParamList, Promo, User} from '../types';
import {
  getInnactivePromos,
  getActivePromos,
  addPromoCode,
  getUser,
} from '../api/customer';

import Button from '../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import SimpleInput from '../components/SimpleInput';
import UserStore from '../store/UserStore';

const PromoScreen = () => {
  const [activePromo, setActivePromo] = useState<Promo[]>();
  const [inactivePromo, setInctivePromo] = useState<Promo[]>();
  const [code, setCode] = useState<string>();
  const [error, setError] = useState<string>();
  const [isFetching, setIsFecthing] = useState<boolean>(false);

  useEffect(() => {
    const getActivePromovar = async () =>
      setActivePromo(await getActivePromos());
    const getInactivePromovar = async () =>
      setInctivePromo(await getInnactivePromos());

    getActivePromovar();
    getInactivePromovar();
  }, []);

  const addPromo = async () => {
    
    setIsFecthing(true);
    setError('');
    if (code) {
      try {
        await addPromoCode(code);
        setIsFecthing(false);
        setCode('');
      } catch (err) {
        setError(i18n.t('promo_code_error'));
        setIsFecthing(false);
      }
      const token = await getUser();
      await UserStore.updateUser(token);
    } else {
      setError(i18n.t('promo_code_error'));
      setIsFecthing(false);
    }
    setActivePromo(await getActivePromos());
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <TitleWithDescription
          title={i18n.t('confirmation_booking_promotionnal_code')}
          subtitle={true}
          description={i18n.t('promo_code_description')}
        />
        <SimpleInput
          
          onChangeText={(v) => {
            setCode(v.toUpperCase());
            setError('');
          }}
          placeholder="Code"
          style={styles.input}
          textAlign="center"
          error={error}
        />
        <Button
          isFetching={isFetching}
          value={i18n.t('promo_code_validate')}
          onPress={addPromo}
          backgroundColor={Colors.primary}
          textColor={Colors.white}
        />
        <Text style={styles.title}>{i18n.t('promo_code_active')}</Text>
        {activePromo &&
          activePromo.map((e, index) => (
            <TouchableOpacity style={styles.codeCard} key={index}>
              <TitleWithDescription
                title={e.name}
                subtitle={true}
                description={e.end_date.slice(0, 10)}></TitleWithDescription>
              <Text>{e.value}%</Text>
            </TouchableOpacity>
          ))}
        <Text style={styles.title}>{i18n.t('promo_code_innactive')}</Text>
        {inactivePromo &&
          inactivePromo.map((e, index) => (
            <TouchableOpacity style={styles.codeCard} key={index}>
              <TitleWithDescription
                title={e.name}
                subtitle={true}
                description={e.end_date.slice(0, 10)}></TitleWithDescription>
              <Text>{e.value}%</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 120,
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'oswald',
    fontSize: 18,
    color: Colors.primary,
    paddingBottom: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  codeCard: {
    backgroundColor: Colors.white,
    textAlign: 'center',
    borderRadius: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    flex: 0.9,
  },
});

export default PromoScreen;
