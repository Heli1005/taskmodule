import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button, useToast } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import './Header.css'
import { useAuth } from "./authenctication/useAuthentication";
import UseLocalStorage from "./commonComponents/useLocalStorage";
import { GoTasklist } from "react-icons/go";

const Header = (props) => {
    const toast = useToast()
    const Links = [
        {
            name: "Dashboard",
            path: '/',
            secure: 0
        },
        {
            name: "Task",
            path: '/task',
            secure: 1
        }
    ];
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, handleLogOut } = useAuth()
    const [currentUser, setCurrentUser] = UseLocalStorage('currentuser', {})

    const handleLogoutBtn = () => {
        handleLogOut()
        setCurrentUser(null)
        navigate('/')
        toast({
            title: 'Log out succesfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }

    return <>
        <Box bg="gray.200" px={4} position={'sticky'} top={0} border={'1px solid white'} zIndex={'1'} shadow={'1px 1px 20px black'}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    size={"md"}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={"Open Menu"}
                    display={{ md: "none" }} // manage hide and show icon from here.....
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box color={'white'} fontSize={'3rem'} fontWeight={'900'} bg={'teal.600'} p={1} rounded={'md'} cursor={'pointer'} ><GoTasklist /></Box>
                    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}  >
                        {
                            Links.filter(obj => (obj.secure === 0 || user)).map((link) =>
                                <NavLink className={'navlink'} key={link.name} to={link.path} >{link.name}</NavLink>
                            )
                        }
                    </HStack>
                </HStack>
                <Flex alignItems={"center"}>
                    {
                        user
                            ?
                            <Button variant={"solid"} _hover={{ bg: 'gray.400', mt: '1' }} bg={'gray.400'} onClick={() => handleLogoutBtn()} size={"sm"} mr={4}  >
                                Log Out
                            </Button>
                            :
                            <></>
                    }
                </Flex>
            </Flex>
            {
                isOpen // manage drawer for small device size
                    ?
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {
                                Links.map((link) =>
                                    <NavLink className={'navlink'} key={link.name} to={link.path}>{link.name}</NavLink>
                                )
                            }
                        </Stack>
                    </Box>
                    :
                    <></>
            }
        </Box>
    </>;
};

export default Header;