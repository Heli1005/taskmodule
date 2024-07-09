import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import './Header.css'

const Header = (props) => {

    const Links = [
        {
            name: "Dashboard",
            path: '/'
        },
        {
            name: "Task",
            path: '/task'
        }
    ];

    const { isOpen, onOpen, onClose } = useDisclosure();

    return <>
        <Box bg="gray.100" px={4}>
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
                            Links.map((link) =>
                                <NavLink className={'navlink'} key={link.name} to={link.path} >{link.name}</NavLink>
                            )
                        }
                    </HStack>
                </HStack>
                <Flex alignItems={"center"}>
                    <Button
                        variant={"solid"}
                        colorScheme={"teal"}
                        size={"sm"}
                        mr={4}
                    >
                        Sign Up
                    </Button>
                </Flex>
            </Flex>
            {
                isOpen // manage drawer for small device size
                    ?
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {
                                Links.map((link) =>
                                    <NavLink key={link.name} to={link.path}>{link.name}</NavLink>
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