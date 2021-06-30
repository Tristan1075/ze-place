import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getPaymentMethods} from '../api/payment';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import UserStore from '../store/UserStore';
import {PaymentMethod} from '../types';
import Button from '../components/Button';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import PaymentMethodForm from '../screens/PaymentMethodForm';
import Modal from './Modal';

type Props = {
  onTouchOutside?: () => void;
};

const PaymentModal = (props: Props) => {
  const {onTouchOutside} = props;
  const [addPaymentMethod, setAddPaymentMethod] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>(
    [],
  );
  const [isFetching, setIsFetching] = useState(true);

  const handleStateChange = useCallback(async () => {
    const methods = await getPaymentMethods(UserStore.user.customerId);
    methods.data.push({
      card: {
        brand: 'add_card',
      },
    });
    setPaymentMethods(methods.data);
  }, []);

  useEffect(() => {
    handleStateChange();
  }, []);

  useEffect(() => {
    getPaymentMethods(UserStore.user.customerId);
  }, []);

  const selectLogo = (type: string) => {
    switch (type) {
      case 'visa':
        return require('../assets/icons/visa_card.png');
      case 'mastercard':
        return require('../assets/icons/mastercard_card.png');
    }
  };

  const handleAddPaymentMethod = () => {
    handleStateChange();
    setAddPaymentMethod(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onTouchOutside}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            Veuillez choisir un moyen de paiement
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {paymentMethods.map((paymentMethod) => {
              return (
                <TouchableOpacity
                  style={styles.paymentMethodCard}
                  onPress={
                    paymentMethod.card.brand === 'add_card'
                      ? () => setAddPaymentMethod(true)
                      : undefined
                  }>
                  <AntDesign
                    name="checkcircle"
                    size={15}
                    color={Colors.success}
                    style={styles.default}
                  />
                  {paymentMethod.card.brand === 'add_card' ? (
                    <Ionicons
                      name="add-circle"
                      size={25}
                      color={Colors.primary}
                    />
                  ) : (
                    <Image
                      source={selectLogo(paymentMethod.card.brand)}
                      style={styles.logo}
                    />
                  )}
                  {paymentMethod.card.brand !== 'add_card' && (
                    <Text style={styles.cardNumber}>
                      .... {paymentMethod.card.last4}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Button
            value="Payer"
            backgroundColor={Colors.primary}
            textColor={Colors.white}
          />
        </View>
        <Modal
          visible={addPaymentMethod}
          child={
            <PaymentMethodForm
              closeModal={() => setAddPaymentMethod(false)}
              onSubmit={handleAddPaymentMethod}
            />
          }
          handleModal={() => setAddPaymentMethod(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: 300,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Layout.shadow,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'oswald-light',
    fontSize: 18,
    flex: 1,
  },
  paymentMethodCard: {
    position: 'relative',
    backgroundColor: Colors.white,
    ...Layout.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  cardNumber: {
    fontFamily: 'poppins',
    fontSize: 12,
  },
  default: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
});

export default PaymentModal;
