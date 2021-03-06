import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';
import Colors from '../constants/Colors';
import Button from './Button';
import i18n from 'i18n-js';

type Props = {
  isFetching?: boolean;
  isVisible: boolean;
  onConfirmPress: () => void;
  onCancelPress: () => void;
  title: string;
  description: string;
};

const Popin = ({
  isFetching,
  isVisible,
  onConfirmPress,
  onCancelPress,
  title,
  description,
}: Props) => {
  return (
    <Modal
      width={0.7}
      visible={isVisible}
      rounded={true}
      onTouchOutside={onCancelPress}>
      <ModalContent style={styles.modal}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalDescription}>{description}</Text>
        <Button
          isFetching={isFetching}
          backgroundColor={Colors.primary}
          value={i18n.t('component_popin_confirm')}
          textColor={Colors.white}
          onPress={onConfirmPress}
        />
        <Text onPress={onCancelPress} style={styles.cancel}>
          {i18n.t('component_popin_cancel')}
        </Text>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  modalTitle: {
    fontFamily: 'poppins',
    color: Colors.dark,
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalDescription: {
    fontFamily: 'poppins-light',
    color: Colors.dark,
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 20,
  },
  cancel: {
    paddingTop: 20,
    textAlign: 'center',
    fontFamily: 'poppins',
    color: Colors.dark,
    textDecorationLine: 'underline',
  },
});

export default Popin;
