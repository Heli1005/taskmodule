import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'

const CustomModal = ({ children, title, body, onClose, isOpen, onOpen }) => {
 
    return <>
        {
            children
                ?
                <span onClick={onOpen}>
                    {children}
                </span>
                :
                <Button onClick={onOpen}>Open Modal</Button>
        }
        <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {body}
                </ModalBody>
            </ModalContent>
        </Modal>
    </>;
};

export default CustomModal;
