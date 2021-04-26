import {useState} from 'react';
import {ModalOptions} from '../utils/types';

const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const handleModal = (content: ModalOptions) => {
    if (content) {
      setModal(true);
      setModalContent(content);
    } else {
      setModal(false);
    }
  };
  return {modal, handleModal, modalContent, setModal};
};

export default useModal;
