import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {PaymentMethod} from '../types';
import Colors from '../constants/Colors';
import CreditCardBloc from '../components/CreditCardBloc';
import Header from '../components/Header';
import {Ionicons} from '@expo/vector-icons';
import Layout from '../constants/Layout';

const PaymentMethods = () => {
  const navigation = useNavigation();
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>(
    [],
  );
  const [isFetching, setIsFetching] = useState(true);

  const handleStateChange = useCallback(async () => {}, []);

  useEffect(() => {
    navigation.addListener('focus', handleStateChange);
  }, [handleStateChange, navigation]);

  const renderItem = ({item, index}: {item: PaymentMethod; index: number}) => (
    <CreditCardBloc
      type={item.card.brand}
      index={index}
      name={'test'}
      number={item.card.last4}
      available={true}
      isDefault={item.is_default}
    />
  );

  const handleAddNewCardPress = () => {
    navigation.navigate('PaymentMethodForm');
  };

  return (
    <View style={styles.flexContainer}>
      <Header type="back" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={[
            styles.plusIconContainer,
            cardIndex === paymentMethods.length - 1 && styles.zIndex,
          ]}
          onPress={handleAddNewCardPress}>
          <Ionicons name="add" />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Carousel
            data={paymentMethods}
            renderItem={renderItem}
            sliderWidth={Layout.window.width}
            itemWidth={180}
            onSnapToItem={(index) => setCardIndex(index)}
            inactiveSlideOpacity={1}
            removeClippedSubviews={false}
          />
          <View style={styles.itemsBloc}>
            {/*
                {!paymentMethods[cardIndex].available && (
                  <View style={styles.errorBloc}>
                    <Image source={dangerRed} />
                    <View style={styles.errorContent}>
                      <Text style={styles.errorTitle}>{t('card_expired')}</Text>
                      <Text style={styles.errorDescription}>
                        {t('update_payment_method')}
                      </Text>
                    </View>
                  </View>
                )}*/}
            {/* <Text style={styles.itemTitle}>{t('name')}</Text>
                <Text style={styles.itemValue}>Carte de crédit</Text> */}
            <Text style={styles.itemTitle}>Date d'expiration</Text>
            <Text style={styles.itemValue}>05/ 21</Text>
            {/* <Text style={styles.itemTitle}>{t('billing_address')}</Text>
                <Text style={styles.itemValue}>14 rue Klock, 92110 Clichy</Text> */}
          </View>
          <View style={styles.actionButtons}>
            {/* {!paymentMethods[cardIndex].is_default ? (
                <TouchableOpacity>
                  <Text style={styles.updateButton}>Update default card</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.invisibleSpace} />
              )} */}
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.removeButton}>Remove card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    marginTop: -140,
    marginBottom: 0,
    flex: 1,
  },
  errorBloc: {
    marginTop: 20,
    backgroundColor: Colors.error,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
  errorContent: {
    paddingHorizontal: 15,
  },
  errorTitle: {
    color: Colors.error,
    fontFamily: 'Metropolis-Bold',
    fontSize: 16,
    paddingBottom: 5,
  },
  errorDescription: {
    color: Colors.error,
    fontFamily: 'Metropolis-Medium',
    fontSize: 16,
  },
  itemsBloc: {
    paddingHorizontal: 30,
    flex: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Metropolis-Medium',
    color: Colors.dark,
    paddingVertical: 5,
    marginTop: 20,
  },
  itemValue: {
    fontSize: 14,
    fontFamily: 'Metropolis-Regular',
    color: Colors.gray,
    paddingVertical: 5,
  },
  plusIconContainer: {
    position: 'absolute',
    top: 180,
    right: 25,
    backgroundColor: Colors.white,
    width: 35,
    height: 35,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.13)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 14,
    shadowOpacity: 1,
  },
  actionButtons: {
    justifyContent: 'flex-end',
  },
  updateButton: {
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: 'Metropolis-Medium',
    fontSize: 18,
    paddingVertical: 20,
    marginTop: 20,
    borderBottomWidth: 1,
  },
  removeButton: {
    color: Colors.error,
    textAlign: 'center',
    fontFamily: 'Metropolis-Medium',
    fontSize: 18,
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(241, 245, 255)',
  },
  zIndex: {
    zIndex: 2,
  },
  invisibleSpace: {
    paddingVertical: 20,
    marginTop: 20,
  },
});

export default PaymentMethods;
