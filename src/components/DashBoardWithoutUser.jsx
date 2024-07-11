import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoardWithoutUser = () => {
    const navigate = useNavigate()

    return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} className="bg-gradient-to-r from-teal-500 to-slate-400" position={'relative'} h={'90vh'} >
        <VStack>
            <Text fontWeight={'bolder'} fontSize={'3rem'} fontFamily={'sans-serif'} color={'white'}>Welcome to TO-DO TASK </Text>
            <Button variant={"solid"} w={'100px'} h={'50px'} colorScheme={"teal"} onClick={() => navigate('/login')} size={"sm"} mr={4}  >
                Log In
            </Button>
        </VStack>
    </Box>;
};

export default DashBoardWithoutUser;
