import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';
import Colors from '../constants/Colors';
import Button from './Button';

type Props = {
  isVisible: boolean;
  onConfirmPress: () => void;
  onCancelPress: () => void;
  title: string;
  description: string;
};

const Popin = ({
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
          backgroundColor={Colors.primary}
          value="Confirm"
          textColor={Colors.white}
          onPress={onConfirmPress}
        />
        <Text onPress={onCancelPress} style={styles.cancel}>
          Cancel
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
