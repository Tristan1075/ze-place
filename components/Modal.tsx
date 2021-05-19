import React from 'react';
import {Modal as RNModal, TouchableOpacity, StyleSheet} from 'react-native';

import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

type Props = {
  visible: boolean;
  child: any;
  handleModal: () => void;
};

const Modal = (props: Props) => {
  const {visible, child, handleModal} = props;

  return (
    <RNModal animationType="slide" visible={visible}>
      <TouchableOpacity
        style={[styles.headerContainer, styles.color]}
        onPress={handleModal}>
        <Ionicons size={30} name="close" color={Colors.white} />
      </TouchableOpacity>
      {child}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    top: 50,
    position: 'absolute',
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 2,
  },
  color: {
    backgroundColor: 'rgba(220, 220, 220, 0.4)',
  },
});

export default Modal;
