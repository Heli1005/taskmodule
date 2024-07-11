import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { LoginSchema } from "../schemas/LoginSchema";
import CustomInput from "../commonComponents/CustomInput";
import { useAuth } from "./useAuthentication";
import UseLocalStorage from "../commonComponents/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { user, handlLogin } = useAuth()
    const [userList, setUserList] = UseLocalStorage('users', [])
    const [currentUser, setCurrentUser] = UseLocalStorage('currentuser', {})
    const navigate = useNavigate()

    let initialState = {
        username: '',
        password: ''
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
            type: 'text'
        }
    }

    const handleLoginBtn = (obj) => {
        let userExist = userList.find(u => (u.username === obj.username && u.password === obj.password)) || null
        if (userExist) {
            setCurrentUser(userExist)
            handlLogin(userExist)
            navigate('/')

        }
    }

    return <Box w={'full'} display={'flex'} justifyContent={'center'}  >
        <Box w={{ base: 'full', md: '500px' }} bg={'gray.300'} p={7} px={12} mx={2} rounded={'md'} shadow={'5px 10px 7px gray'} mt={4} >
            <Text fontWeight={'bold'} color={'teal.600'} align={'center'} fontSize={'1.5rem'}  >Log In</Text>
            <Formik
                initialValues={initialState}
                validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                    console.log("values", values);

                    let tempObj = { ...values }
                    handleLoginBtn(tempObj)
                }}
            >
                <Form>
                    <VStack>
                        <CustomInput field={fields.username} />
                        <CustomInput field={fields.password} />
                        <Button type="submit" bg="teal.600" color="white" _hover={{ bg: 'teal.700' }} mt={4} w={'100%'}>Login</Button>
                    </VStack>
                </Form>
            </Formik>
            <Box mt={3} display={'flex'} justifyContent={'end'} color={'teal.600'}>
                <Link  to={'/signup'}>Register here...</Link>
            </Box>
        </Box>
    </Box>;
};

export default Login;
