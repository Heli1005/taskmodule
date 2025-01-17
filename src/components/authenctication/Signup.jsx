import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { SignUpSchema } from "../schemas/SignUpSchema";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import CustomInput from "../commonComponents/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import UseLocalStorage from "../commonComponents/useLocalStorage";

const Signup = (props) => {

    const toast=useToast()
    const navigate = useNavigate()
    const [userList, setUserList] = UseLocalStorage('users', [])

    let initialState = {
        username: '',
        password: '',
        confirmpassword: ''
    }

    let fields = {
        username: {
            id: 'username',
            label: 'Name',
            isrequired: true,
            type: 'text'
        },
        password: {
            id: 'password',
            label: 'Password',
            isrequired: true,
            type: 'password'
        },
        confirmpassword: {
            id: 'confirmpassword',
            label: 'Confirm Password',
            isrequired: true,
            type: 'password'
        },
    }

    const handleRegister = async (obj, actions) => {

        const timestamp = new Date().getTime();
        obj['_id'] = timestamp
        delete obj.confirmpassword
        let userExist = userList.find(u => u.username === obj.username) || null

        if (!userExist) {

            navigate('/login')
            setUserList([...userList, obj])
            await toast({
                title: 'User created successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }else{
            actions.resetForm();
            await toast({
                title: 'Username already exist',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return <Box w={'full'} display={'flex'} justifyContent={'center'}  >
        <Box w={{ base: 'full', md: '500px' }} bg={'gray.300'} p={7} px={12} mx={2} rounded={'md'} shadow={'5px 10px 7px gray'} mt={4} >
            <Text fontWeight={'bold'} color={'teal.600'} align={'center'} fontSize={'1.5rem'}  >Sign Up</Text>
            <Formik
                initialValues={initialState}
                validationSchema={SignUpSchema}
                onSubmit={(values, actions) => {
                    let tempObj = { ...values }
                    handleRegister(tempObj, actions)
                }}
            >
                <Form>
                    <VStack>
                        <CustomInput field={fields.username} />
                        <CustomInput field={fields.password} />
                        <CustomInput field={fields.confirmpassword} />
                        <Button type="submit" bg="teal.600" color="white" _hover={{ bg: 'teal.700' }} mt={4} w={'100%'}>Register</Button>
                    </VStack>
                </Form>
            </Formik>
            <Box mt={3} display={'flex'} justifyContent={'end'} color={'teal.600'}>
                <Link to={'/login'}>Already have an account ? </Link>
            </Box>
        </Box>
    </Box>;
};

export default Signup;
