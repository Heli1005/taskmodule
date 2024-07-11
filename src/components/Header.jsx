import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import './Header.css'
import { useAuth } from "./authenctication/useAuthentication";
import UseLocalStorage from "./commonComponents/useLocalStorage";

const Header = (props) => {

    const Links = [
        {
            name: "Dashboard",
            path: '/',
            secure:0
        },
        {
            name: "Task",
            path: '/task',
            secure:1
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
    }

    return <>
        <Box bg="gray.200" px={4} position={'sticky'} top={0}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    size={"md"}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={"Open Menu"}
                    display={{ md: "none" }} // manage hide and show icon from here.....
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box  >Logo</Box>
                    <HStack
                        as={"nav"}
                        spacing={4}
                        display={{ base: "none", md: "flex" }}
                    >
                        {
                            Links.filter(obj=>{
                               return (obj.secure===0 ||user)
                            }).map((link) =>
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

                            // <Button variant={"solid"} colorScheme={"teal"} onClick={()=>navigate('/login')} size={"sm"} mr={4}  >
                            //    Log In
                            // </Button>
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