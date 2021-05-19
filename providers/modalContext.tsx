import React from 'react';
import {View} from 'react-native';

import useModal from '../hooks/useModal';
import {ModalType} from '../hooks/useModal';
import Modal from '../components/Modal';

type Props = {
  children: any;
};

type ModalContextType = {
  modal: boolean;
  handleModal: (content?: any) => void;
  modalContent: any;
};

const ModalContext = React.createContext<ModalContextType>({
  modal: false,
  handleModal: () => undefined,
  modalContent: undefined,
});

const ModalProvider = (props: Props) => {
  const {modal, handleModal, modalContent} = useModal();
  return (
    <ModalContext.Provider value={{modal, handleModal, modalContent}}>
      <Modal
        visible={modal}
        {...modalContent}
        handleModal={() => handleModal(null)}
      />
      {props.children}
    </ModalContext.Provider>
  );
};

export {ModalContext, ModalProvider};
