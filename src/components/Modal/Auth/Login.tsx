import React, {useState} from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../atoms/authModalAtom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp'
import {FIREBASE_ERRORS} from '../../../firebase/errors'
 
type LoginProps = {

}

const Login: React.FC<LoginProps> = () =>{
        const setAuthModalState = useSetRecoilState(authModalState); 
    const [LoginForm, setLoginForm] = useState({
        email:'',
        password:''
    });

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        signInWithEmailAndPassword(LoginForm.email, LoginForm.password);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setLoginForm(prev =>({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    return(
    <>
        <form onSubmit={onSubmit}>
            <Input 
                required
                name='email' 
                placeholder='email' 
                type='email' 
                mb={2}  
                onChange={onChange}
                fontSize="15px"
                _placeholder={{
                    color: 'gray.500'
                }}
                _hover={{
                    bg:"white",
                    border:"1px solid",
                    borderColor:"blue.500"
                }}
                _focus={{
                    outline:"none",
                    bg:"white",
                    borderColor:"blue.500"
                }}
                bg="gray.50"
            />
            <Input
                required
                name='password'
                placeholder='password'
                type='password'
                mb={2}
                onChange={onChange}
                fontSize="15px"
                _placeholder={{
                    color: 'gray.500'
                }}
                _hover={{
                    bg:"white",
                    border:"1px solid",
                    borderColor:"blue.500"
                }}
                _focus={{
                    outline:"none",
                    bg:"white",
                    borderColor:"blue.500"
                }}
                bg="gray.50"
            />
            <Text color="red" fontSize="sm" fontWeight="bold">{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button
                type="submit"
                size="sm"
                variant="outline"
                mt={3}
                mb={3}
                _hover={{
                    color:"orange.400",
                    border:"1px solid orange"
                }}
                isLoading={loading}
            >
                Log In
            </Button>
            <Flex
                fontSize="sm"

            >
                <Text
                    mr={1}

                >
                    Don&apos;t have an account? 
                </Text>
                <Text 
                    color="orange.400"
                    fontWeight="700"
                    cursor="pointer"
                    onClick={()=>{
                        setAuthModalState((prev) => ({
                            ...prev,
                            view:"signup",
                        }))
                    }}
                >
                    SIGN UP
                </Text>
            </Flex>
            <Text
                color="orange.400"
                fontSize="sm"
                fontWeight="700"
                cursor="pointer"
                mt={2}
                onClick={()=>{
                    setAuthModalState((prev)=>({
                        ...prev,
                        view:"resetPassword"
                    }))
                }}
            >
                Forgot Password
            </Text>
        </form>
    </>
    )
}

export default Login;