import React, {useState} from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../atoms/authModalAtom'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/clientApp'
import {FIREBASE_ERRORS} from '../../../firebase/errors'

const SignUp: React.FC = () =>{
        const setAuthModalState = useSetRecoilState(authModalState); 
    const [signUpForm, setSignUpForm] = useState({
        email:'',
        password:'',
        confirmPassword:''
    });

    const[error, setError] = useState('');
    const [createUserWithEmailAndPassword, user, loading, userError] = 
        useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(error) setError("");
        if(signUpForm.password !== signUpForm.confirmPassword){
            setError("password do no match");
            return;
        }

        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSignUpForm(prev =>({
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
            <Input
                required
                name='confirmPassword'
                placeholder='Confirm Password'
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
            <Text color="red" fontSize="sm" fontWeight="bold">
                {error || 
                    FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
                size="sm"
                variant="outline"
                mt={3}
                mb={3}
                _hover={{
                    color:"orange.400",
                    border:"1px solid orange"
                }}
                type="submit"
                isLoading={loading}
            >
                Sign Up
            </Button>
            <Flex
                fontSize="sm"

            >
                <Text
                    mr={1}

                >
                    Already have an account?
                </Text>
                <Text 
                    color="orange.400"
                    fontWeight="700"
                    cursor="pointer"
                    onClick={()=>{
                        setAuthModalState((prev) => ({
                            ...prev,
                            view:"login",
                        }))
                    }}
                >
                    Login
                </Text>
            </Flex>
        </form>
    </>
    )
}

export default SignUp;