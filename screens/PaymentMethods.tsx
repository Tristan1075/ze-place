import React, {useState, useEffect, useCallback, useContext} from 'react';
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
import Layout from '../constants/Layout';
import {
  getPaymentMethods,
  removePaymentMethod,
  updatePaymentMethod,
} from '../api/payment';
import UserStore from '../store/UserStore';
import TitleWithDescription from '../components/TitleWithDescription';
import i18n from 'i18n-js';
import {ModalContext} from '../providers/modalContext';
import PaymentMethodForm from './PaymentMethodForm';
import {Flow} from 'react-native-animated-spinkit';

const PaymentMethods = () => {
  const navigation = useNavigation();
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>(
    [],
  );
  const [isFetching, setIsFetching] = useState(false);
  const {handleModal} = useContext(ModalContext);

  const handleStateChange = useCallback(async () => {
    const methods = await getPaymentMethods(UserStore.user.customerId);
    methods.data.push({
      card: {
        brand: 'add_card',
      },
    });
    setPaymentMethods(methods.data);
    setIsFetching(false);
  }, []);

  useEffect(() => {
    navigation.addListener('focus', handleStateChange);
  }, [handleStateChange, navigation]);

  const renderItem = ({item, index}: {item: PaymentMethod; index: number}) => {
    return (
      <CreditCardBloc
        type={item.card?.brand}
        index={index}
        name={'test'}
        number={`.... .... .... ${item.card?.last4}`}
        available={true}
        isDefault={item?.isFavorite}
        onAddPress={
          item.card?.brand === 'add_card' ? handleAddNewCardPress : undefined
        }
      />
    );
  };

  const handleAddNewCardPress = () => {
    handleModal({
      child: (
        <PaymentMethodForm
          closeModal={handleModal}
          onSubmit={handleSaveCardPress}
        />
      ),
    });
  };

  const handleSaveCardPress = () => {
    handleModal();
    handleStateChange();
  };

  const handleUpdatePaymentMethodPress = async () => {
    setIsFetching(true);
    try {
      const res = await updatePaymentMethod(
        UserStore.user.customerId,
        paymentMethods[cardIndex].id,
      );
      if (res) {
        handleStateChange();
      }
    } catch (err) {
      setIsFetching(false);
    }
  };

  const handleRemovePaymentMethodPress = async () => {
    setIsFetching(true);
    try {
      const res = await removePaymentMethod(
        paymentMethods[cardIndex].id,
        UserStore.user.customerId,
      );
      if (res) {
        handleStateChange();
      }
    } catch (err) {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.flexContainer}>
      <Header type="back" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.contentContainer}>
          <TitleWithDescription
            title={i18n.t('payement_methods_title')}
            style={styles.title}
            description={i18n.t('payement_methods_description')}
          />
          <Carousel
            contentContainerCustomStyle={{paddingLeft: Layout.padding}}
            data={paymentMethods}
            renderItem={renderItem}
            sliderWidth={Layout.window.width}
            itemWidth={300}
            onSnapToItem={(index) => setCardIndex(index)}
            inactiveSlideOpacity={1}
            activeSlideAlignment="start"
            removeClippedSubviews={false}
          />
          {cardIndex !== paymentMethods.length - 1 && (
            <View style={styles.actionButtons}>
              {paymentMethods.length > 0 &&
                !paymentMethods[cardIndex].isFavorite && (
                  <TouchableOpacity onPress={handleUpdatePaymentMethodPress}>
                    {!isFetching ? (
                      <Text style={styles.updateButton}>
                        {i18n.t('payement_methods_update')}
                      </Text>
                    ) : (
                      <View style={styles.loaderContainer}>
                        <Flow size={20} color={Colors.primary} />
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              <View style={styles.separator} />
              {paymentMethods.length > 0 &&
                !paymentMethods[cardIndex].isFavorite && (
                  <TouchableOpacity onPress={handleRemovePaymentMethodPress}>
                    {!isFetching ? (
                      <Text style={styles.removeButton}>
                        {i18n.t('payement_methods_delete')}
                      </Text>
                    ) : (
                      <View style={styles.loaderContainer}>
                        <Flow size={20} color={Colors.error} />
                      </View>
                    )}
                  </TouchableOpacity>
                )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemsBloc: {
    paddingHorizontal: 30,
    flex: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'oswald',
    color: Colors.dark,
    paddingVertical: 5,
    marginTop: 20,
  },
  itemValue: {
    fontSize: 14,
    fontFamily: 'poppins',
    color: Colors.gray,
    paddingVertical: 5,
  },
  actionButtons: {
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
    paddingBottom: 20,
    ...Layout.shadow,
  },
  updateButton: {
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontSize: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  removeButton: {
    color: Colors.error,
    textAlign: 'center',
    fontFamily: 'poppins',
    fontSize: 16,
    paddingVertical: 10,
    height: 62,
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
  },
  loaderContainer: {
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentMethods;
