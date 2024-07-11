import React from "react";
import CutomToolTip from "./commonComponents/CutomToolTip";
import CustomModal from "./commonComponents/CustomModal";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import { removeTask } from "./redux/taskSlice";
import { DeleteIcon } from "@chakra-ui/icons";
import UseLocalStorage from "./commonComponents/useLocalStorage";

const DeleteTaskModal = ({ isDeleteOpen, item, handleOpenModal, currentId, onDeleteClose, setCurrentId }) => {
    const handleDelete = async () => {

        const dispatch = useDispatch()
        const toast=useToast()
        const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])

        await dispatch(removeTask(currentId))
        await setAllTaskList(taskData?.filter(obj => obj._id !== currentId) || [])
        await onDeleteClose()
        await setCurrentId(null)
        await toast({
            title: 'Task Removed Successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
    const handleCancel = () => {
        setCurrentId(null)
        onDeleteClose()
    }
  return <>
      <CutomToolTip label={'Delete'} bg={'red.500'}>
          <CustomModal
              isOpen={isDeleteOpen}
              onOpen={() => !item.iscompleted && handleOpenModal(item._id)}
              hideClose={true}
              size="sm"
              body={
                  <VStack>
                      <Box display={'flex'} h={'120px'} justifyContent={'center'} alignItems={'center'}>
                          <Text casing={'capitalize'} align={'center'} fontSize={'20px'} fontWeight={'bold'} color={'teal.600'} >
                              Are you sure you want to delete the task ?
                          </Text>
                      </Box>
                      <Box mb={2} w={'full'} display={'flex'} justifyContent={'center'} gap={4}>
                          <Button onClick={() => handleDelete()} w={'30%'} py={5} bg="red.600"
                              color="white"
                              _hover={{ bg: 'red.700' }}>Remove </Button>
                          <Button variant='solid' w={'30%'} py={5} bg="gray.200" color={'black'} onClick={handleCancel}>Cancel</Button>
                      </Box>
                  </VStack>
              }
          >
              <DeleteIcon boxSize={5} cursor={item.iscompleted ? 'not-allowed' : 'pointer'} _hover={{ color: item.iscompleted ? "gray.400" : "red.500" }} color={item.iscompleted ? "gray.400" : "red.300"} m={1} />
          </CustomModal>
      </CutomToolTip>
  </>;
};

export default DeleteTaskModal;
