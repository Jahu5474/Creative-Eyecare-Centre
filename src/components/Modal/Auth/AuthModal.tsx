import React, { useEffect } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Flex, Text } from '@chakra-ui/react'
import { authModalState } from '../../../atoms/authModalAtom'
import { useRecoilState } from 'recoil'
import AuthInputs from './AuthInputs'
import OAuthButtons from './OAuthButtons';
import { auth } from '../../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
  const [modalState, SetModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    SetModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // useEffect(()=>{
  //   if(user) handleClose();
  // }, [user]);
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
              {modalState.view === 'login' || modalState.view === 'signup' ? (
                <>
                  <OAuthButtons />
                  <Text
                    color="gray.400"
                    fontWeight="700"
                    fontSize="lg"
                  >
                    Or
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )

}
export default AuthModal;