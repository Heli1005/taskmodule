import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Text, Box, VStack, Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { MdPause } from 'react-icons/md'
import CutomToolTip from "./CutomToolTip";
import CustomModal from "./CustomModal";
import { useDisclosure } from "@chakra-ui/react";
import { removeTask } from "../redux/taskSlice";
import UseLocalStorage from "./useLocalStorage";
import { useDispatch, useSelector } from "react-redux";



const CustomTable = ({ headerlist, data }) => {

    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentId, setCurrentId] = useState(null);
    const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])
    const taskData = useSelector(state => state.tasks.taskdata)

    const formatDateTime = (date) => {
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {

        setAllTaskList(taskData)
    }, [taskData])

    const handleDelete = async () => {

        await dispatch(removeTask(currentId))
        await onClose()
        await setCurrentId(null)

    }
    const handleOpenModal = (id) => {
        setCurrentId(id);
        onOpen();
    };

    const handleCancel = () => {
        setCurrentId(null)
        onClose()
    }
    
    return <>
        <TableContainer mt={3} p={3}>
            <Table variant='simple'>
                <TableCaption>Its all about all tasks..</TableCaption>
                <Thead bg={'teal.500'} rounded={'lg'} >
                    <Tr>
                        {
                            headerlist.map(td =>
                                <Th color={'white'} key={td.id}>{td.name}</Th>
                            )
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((obj, dataindex) => {
                            return <Tr key={dataindex}>
                                {
                                    headerlist.map(td => {
                                        let radiotypeObj =
                                            td.type === 'radio'
                                                ?
                                                td.values.find(val => val.value === obj[td.id])
                                                :
                                                null
                                        return td.type === 'datetime'
                                            ?
                                            <Td key={td.id}>{formatDateTime(new Date(obj[td.id]))}</Td>
                                            :
                                            td.type === 'radio'
                                                ?
                                                <Td key={td.id}>
                                                    <Text as={'span'} bg={radiotypeObj.bg} py={1.5} px={2} fontSize={12} fontWeight={'bold'} rounded={'md'} color={'white'}>
                                                        {radiotypeObj.name}
                                                    </Text>
                                                </Td>
                                                :
                                                td.type === 'action' ?
                                                    <Td key={td.id}>
                                                        <Box display={'flex'} gap={3} >
                                                            <CutomToolTip label={'Edit'} >
                                                                <EditIcon boxSize={5} cursor={'pointer'} _hover={{ color: "teal.500" }} color="teal.300" m={1} />
                                                            </CutomToolTip>

                                                            <CutomToolTip label={'Delete'} bg={'red.500'}>
                                                                <CustomModal
                                                                    isOpen={isOpen}
                                                                    onOpen={() => handleOpenModal(obj._id)}
                                                                    hideClose={true}
                                                                    size={'sm'}
                                                                    body={
                                                                        <VStack>

                                                                            <Box display={'flex'} h={'120px'} justifyContent={'center'} alignItems={'center'}>
                                                                                <Text fontSize={'20px'} fontWeight={'bold'} color={'teal.600'} >
                                                                                    Are you sure you want to delete the task ?
                                                                                </Text>
                                                                            </Box>
                                                                            <Box mb={2} w={'full'} display={'flex'} justifyContent={'center'} gap={7}>
                                                                                <Button onClick={() => handleDelete()} w={'30%'} py={5} bg="red.600"
                                                                                    color="white"
                                                                                    _hover={{ bg: 'red.700' }}>Remove </Button>
                                                                                <Button variant='solid' w={'30%'} py={5} bg="gray.200" color={'black'} onClick={handleCancel}>Cancel</Button>
                                                                            </Box>
                                                                        </VStack>
                                                                    }
                                                                >
                                                                    <DeleteIcon boxSize={5} cursor={'pointer'} _hover={{ color: "red.500" }} color="red.300" m={1} />
                                                                </CustomModal>
                                                            </CutomToolTip>

                                                            <CutomToolTip label={'Pause'} >
                                                                <Text>
                                                                    <Icon as={MdPause} boxSize={5} cursor={'pointer'} _hover={{ color: "teal.500" }} color="teal.300" m={1} />
                                                                </Text>
                                                            </CutomToolTip>
                                                        </Box>
                                                    </Td>
                                                    :
                                                    <Td key={td.id}>{obj[td.id] || '-'}</Td>
                                    }
                                    )
                                }
                            </Tr>
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </>;
};

export default CustomTable;

