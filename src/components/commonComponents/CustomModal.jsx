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

const CustomModal = ({ children, title, size, body, onClose, isOpen, hideClose, onOpen }) => {

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
        <Modal size={'lg'} isOpen={isOpen} onClose={onClose} onOverlayClick={false} >
            <ModalOverlay />
            <ModalContent>
                {
                    title
                        ?
                        <ModalHeader>{title}</ModalHeader>
                        :
                        <></>
                }
                {
                    !hideClose
                    ?
                    <ModalCloseButton />
                    :
                    <></>


                }
                <ModalBody >
                    {body}
                </ModalBody>
            </ModalContent>
        </Modal>
    </>;
};

export default CustomModal;
