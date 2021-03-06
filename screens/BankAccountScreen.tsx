import {AntDesign} from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';
import {ScrollView} from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import i18n from 'i18n-js';
import {
  addBankAccount,
  getBalance,
  getConnectedAccount,
  removeBankAccount,
  updateDefaultBankAccount,
} from '../api/payment';
import Button from '../components/Button';
import EmptyBloc from '../components/EmptyBloc';
import SimpleInput from '../components/SimpleInput';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import UserStore from '../store/UserStore';

const BankAccountScreen = () => {
  const [account, setAccount] = useState<any>();
  const [balance, setBalance] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [screenFetching, setScreenFetching] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [actionFetching, setActionFetching] = useState<boolean>(false);
  const [form, setForm] = useState({
    holderName: '',
    iban: '',
  });

  useEffect(() => {
    getBalance(UserStore.user.stripeAccount).then((res) => {
      let val = 0;
      res.available.forEach((transfer: any) => {
        val += transfer.amount;
      });
      setBalance(val / 100);
    });
    getConnectedAccount(UserStore.user.stripeAccount)
      .then((account) => {
        setAccount(account);
        setScreenFetching(false);
      })
      .catch((err) => setIsFetching(false));
  }, []);

  const handleAddBankPress = async () => {
    try {
      setIsFetching(true);
      setAccount(await addBankAccount(UserStore.user.stripeAccount, form));
      setShowForm(false);
      setForm({
        holderName: '',
        iban: '',
      });
    } catch (err) {
      setIsFetching(false);
    }
  };

  const handleUpdateDefaultPress = async (bankAccountId: string) => {
    try {
      setActionFetching(true);
      setAccount(
        await updateDefaultBankAccount(
          UserStore.user.stripeAccount,
          bankAccountId,
        ),
      );
      setActionFetching(false);
    } catch (err) {
      setActionFetching(false);
    }
  };

  const handleRemovePress = async (bankAccountId: string) => {
    try {
      setActionFetching(true);
      setAccount(
        await removeBankAccount(UserStore.user.stripeAccount, bankAccountId),
      );
      setActionFetching(false);
    } catch (err) {
      setActionFetching(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('bank_account_next_transfer')}</Text>
        <Text style={styles.balance}>{balance?.toString()}???</Text>
        {account?.external_accounts.data.length > 0 && (
          <Text style={styles.title}>{i18n.t('bank_account')}</Text>
        )}
        <ScrollView>
          {account && account?.external_accounts.data.length > 0 ? (
            account?.external_accounts.data.map(
              (external: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.cardAccount}
                    onPress={() => handleUpdateDefaultPress(external.id)}>
                    <View style={styles.row}>
                      <Text style={styles.bankName}>{external.bank_name}</Text>
                      {!actionFetching ? (
                        external.default_for_currency ? (
                          <View style={styles.default}>
                            <AntDesign
                              name="check"
                              size={14}
                              color={Colors.white}
                            />
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.remove}
                            onPress={() => handleRemovePress(external.id)}>
                            <AntDesign
                              name="close"
                              size={14}
                              color={Colors.white}
                            />
                          </TouchableOpacity>
                        )
                      ) : (
                        <Flow size={20} color={Colors.gray} />
                      )}
                    </View>
                    <Text style={styles.holderName}>
                      {external.account_holder_name}
                    </Text>
                    <Text style={styles.accountNumber}>
                      **** **** **** **** {external.last4}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )
          ) : !screenFetching ? (
            <EmptyBloc
              title={i18n.t('bank_account_no_account')}
              size={150}
              image={require('../assets/images/bank.png')}
            />
          ) : null}
        </ScrollView>
        <View style={styles.border} />
        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowForm(!showForm)}>
          <Text style={styles.addAcount}>
            {i18n.t('bank_account_add_an_account')}
          </Text>
          <AntDesign name={showForm ? 'up' : 'down'} size={18} />
        </TouchableOpacity>
        {showForm && (
          <>
            <Text style={styles.title}>{i18n.t('bank_account_owner')}</Text>
            <SimpleInput
              placeholder="John Doe"
              onChangeText={(v) => setForm({...form, holderName: v})}
            />
            <Text style={styles.title}>{i18n.t('bank_account_iban')}</Text>
            <SimpleInput
              placeholder="**** **** **** **** ****"
              onChangeText={(v) => setForm({...form, iban: v})}
            />
            <Button
              value={i18n.t('bank_account_add_an_account')}
              backgroundColor={Colors.dark}
              textColor={Colors.white}
              style={styles.button}
              onPress={handleAddBankPress}
              isFetching={isFetching}
            />
            <KeyboardSpacer topSpacing={-20} />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingTop: 150,
    paddingHorizontal: 20,
    paddingBottom: 100,
    flex: 1,
  },
  title: {
    fontFamily: 'oswald-light',
    fontSize: 18,
    marginVertical: 10,
  },
  balance: {
    fontFamily: 'oswald',
    fontSize: 18,
    marginVertical: 10,
  },
  bankName: {
    fontFamily: 'oswald-bold',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardAccount: {
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 20,
    ...Layout.shadow,
    borderRadius: 10,
  },
  border: {
    width: '100%',
    backgroundColor: Colors.gray,
    height: 1,
    marginBottom: 20,
  },
  holderName: {
    fontFamily: 'poppins',
  },
  accountNumber: {
    fontFamily: 'poppins',
  },
  button: {
    marginTop: 20,
  },
  addAcount: {
    textDecorationLine: 'underline',
    fontFamily: 'oswald',
    fontSize: 18,
    flex: 1,
    marginBottom: 20,
  },
  default: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 3,
  },
  remove: {
    backgroundColor: Colors.whiteOpacity,
    borderRadius: 50,
    padding: 3,
  },
});

export default BankAccountScreen;
