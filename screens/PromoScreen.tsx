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
} from '../api/customer';
import Button from '../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import SimpleInput from '../components/SimpleInput';

type RootScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Promo'
>;

type Props = {
  navigation: RootScreenNavigationProp;
};

type Data = {
  data: string;
};

const PromoScreen = (props: Props) => {
  const [activePromo, setActivePromo] = useState<Promo[]>();
  const [inactivePromo, setInctivePromo] = useState<Promo[]>();
  const [allowAdd, setAllowAdd] = useState<boolean>(false);
  const [code, setCode] = useState<string>();

  useEffect(() => {
    const getActivePromovar = async () =>
      setActivePromo(await getActivePromos());
    const getInactivePromovar = async () =>
      setInctivePromo(await getInnactivePromos());

    getActivePromovar();
    getInactivePromovar();
  }, []);

  const addPromo = async () => {
    if (code) {
      await addPromoCode(code);
    }
    setActivePromo(await getActivePromos());
  };

  const handleAdd = () => {
    if (allowAdd) {
      addPromo();
      setAllowAdd(false);
    } else {
      setAllowAdd(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type="back"></Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {allowAdd ? (
          <View>
            <Button
              value={i18n.t('promo_code_validate')}
              onPress={handleAdd}
              backgroundColor={Colors.primary}
              textColor={Colors.white}></Button>
            <SimpleInput
              style={styles.button}
              onChangeText={(v) => setCode(v)}
              placeholder="Code"></SimpleInput>
          </View>
        ) : (
          <View>
            <Button
              value={i18n.t('promo_code_addCode')}
              onPress={handleAdd}
              backgroundColor={Colors.primary}
              textColor={Colors.white}></Button>
          </View>
        )}

        <View>
          <Text style={styles.title}>{i18n.t('promo_code_active')}</Text>

          {activePromo &&
            activePromo.map((e) => (
              <TouchableOpacity style={styles.codeCard}>
                <TitleWithDescription
                  title={e.name}
                  subtitle={true}
                  description={e.end_date.slice(0, 10)}></TitleWithDescription>
              </TouchableOpacity>
            ))}
        </View>
        <View>
          <Text style={styles.title}>{i18n.t('promo_code_innactive')}</Text>
          {inactivePromo &&
            inactivePromo.map((e) => (
              <TouchableOpacity style={styles.codeCard}>
                <TitleWithDescription
                  title={e.name}
                  subtitle={true}
                  description={e.end_date.slice(0, 10)}></TitleWithDescription>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingLeft: 20,
    paddingRight: 20,
  },

  row: {
    flex: 1,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    color: Colors.primary,
    paddingBottom: 20,
    marginLeft: 10,
    marginTop: 60,
  },
  codeCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    borderRadius: 15,
    paddingVertical: 15,
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
