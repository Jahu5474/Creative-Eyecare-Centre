import React from 'react';
import {useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Flex} from '@chakra-ui/react'
import { authModalState } from '../../../atoms/authModalAtom'
import { useRecoilState } from 'recoil'
import AuthInputs from './AuthInputs'

const AuthModal: React.FC = () =>{
    const [modalState, SetModalState] = useRecoilState(authModalState);

    const handleClose = () =>{
      SetModalState((prev) => ({
        ...prev,
        open: false,
      }));
    };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
              {modalState.view === 'login' && 'Login'}
              {modalState.view === 'signup' && 'Sign Up'}
              {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  width="70%"
                >
                  <AuthInputs />
                </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
        
}
export default AuthModal;