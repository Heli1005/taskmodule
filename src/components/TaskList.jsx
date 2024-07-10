import React, { useEffect, useMemo, useState } from "react";
import { Button, Box, useDisclosure, Td, Tr, Menu, MenuButton, MenuList, MenuItem, VStack, Text } from "@chakra-ui/react";
import CustomTable from "./commonComponents/CustomTable";
import CustomModal from "./commonComponents/CustomModal";
import CutomToolTip from "./commonComponents/CutomToolTip";
import AddTaskModal from "./AddTaskModal";
import UseLocalStorage from "./commonComponents/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { addTask, allTasks, removeTask, updateTask } from "./redux/taskSlice";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import FilterTask from "./FilterTask";
import CustomTimer from "./commonComponents/CustomTimer";
import { taskHeaderList } from "./data/tasksList";

const TaskList = () => {
    let dispatch = useDispatch()
    let headerlist = taskHeaderList()

    let statusFilter = [
        {
            id: 'all',
            name: "All",
            value: 'all',
        },
        {
            id: 'completed',
            name: "Completed",
            value: 1,
        },
        {
            id: 'incomplete',
            name: "Incomplete",
            value: 0,
        }
    ]
    const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])
    const [status, setStatus] = useState('all');
    const taskData = useSelector(state => state.tasks.taskdata) || []

    const handleDelete = async () => {
        await dispatch(removeTask(currentId))
        await setAllTaskList(taskData.filter(obj=>obj._id!==currentId))
        await onDeleteClose()
        await setCurrentId(null)
    }
    const handleOpenModal = (id) => {
        setCurrentId(id);
        onDeleteOpen();
    };

    const handleCancel = () => {
        setCurrentId(null)
        onDeleteClose()
    }

    const handleEditModalOpen = (id) => {
        setCurrentId(id)
        onEditOpen()
    }

    const handleEditModalClose = () => {
        setCurrentId(null)
        onEditClose()
    }

    useEffect(() => {
        dispatch(allTasks(allTaskList))
        setAllTaskList(taskData)
    }, [])

    const formatDateTime = (date) => {
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleOptionSelect = (val, id) => {
        let tempObj = taskData.find(obj => obj._id === id)
        if (tempObj.iscompleted !== val && tempObj.iscompleted === 0) {
            handleAddEditTask({ ...tempObj, iscompleted: val })
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [currentId, setCurrentId] = useState(null);

    const handleAddEditTask = async (obj) => {

        let req = { ...obj }
        req.duedate = req.duedate.toString()
        if (obj._id) {
            dispatch(updateTask(req))
            onEditClose()
        } else {
            const timestamp = new Date().getTime();
            req['_id'] = timestamp
            req['timer'] = 0
            await dispatch(addTask(req))
            onClose()
        }
        await setAllTaskList([...allTaskList, req])
    }
    const handleFilter = (e) => {
        setStatus(e.target.value)
    }

    const taskDataMemo = useMemo(() => {

        let tempdata = status === 'all' ? taskData : taskData.filter(obj => obj.iscompleted == status)

        return tempdata
    }, [status, taskData])

    return <>
        <Box display={'flex'} w={'full'} px={3} gap={5} mt={3} justifyContent={'end'} >
            <FilterTask status={status} datalist={statusFilter} handleFilter={handleFilter} />

            <CustomModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                title={'Add Task'}
                body={<AddTaskModal onClose={onClose} handleAddEditTask={handleAddEditTask} />}
            >
                <Button colorScheme="teal">Add Task</Button>
            </CustomModal>

        </Box>
        <CustomTable
            tableCaption={`Total tasks : ${taskDataMemo.length} (Remaing : ${taskData.filter(obj => obj.iscompleted == 0).length}, Completed : ${taskData.filter(obj => obj.iscompleted == 1).length})`}
            headerlist={headerlist}
            tbody={
                <>
                    {
                        taskDataMemo.map((obj, dataindex) => {
                            return <Tr key={dataindex}>
                                {
                                    headerlist.map(td => {
                                        let radiotypeObj =
                                            td.type === 'radio'
                                                ?
                                                td.values.find(val => val.value === obj[td.id])
                                                :
                                                null
                                        console.log("radiotypeObj", radiotypeObj);

                                        return td.type === 'datetime'
                                            ?
                                            <Td key={td.id}>{formatDateTime(new Date(obj[td.id]))}</Td>
                                            :
                                            td.type === 'radio'
                                                ?
                                                <Td key={td.id}>
                                                    <Menu>
                                                        <MenuButton as={Button} cursor={obj.iscompleted ? 'not-allowed' : 'pointer'} bg={radiotypeObj?.bg} py={1.5} px={2} fontSize={12} fontWeight={'bold'} rounded={'md'} color={'white'} colorScheme={radiotypeObj.bg} rightIcon={<ChevronDownIcon />}>
                                                            <Text as={'span'}>
                                                                {radiotypeObj.name}
                                                            </Text>
                                                        </MenuButton>
                                                        {
                                                            !radiotypeObj.value &&
                                                            <MenuList>
                                                                {
                                                                    td.values.map(val => {
                                                                        return <MenuItem key={td.id + val.name} onClick={() => handleOptionSelect(val.value, obj._id)}>
                                                                            {val.name}
                                                                        </MenuItem>
                                                                    })
                                                                }
                                                            </MenuList>
                                                        }
                                                    </Menu>
                                                </Td>
                                                :
                                                td.type === 'timer'
                                                    ?
                                                    <Td key={td.id} >
                                                        <CustomTimer obj={obj} taskData={taskData} />
                                                    </Td>
                                                    :
                                                    td.type === 'action'
                                                        ?
                                                        <Td key={td.id}>
                                                            <Box display={'flex'} gap={3} >
                                                                <CutomToolTip label={'Edit'} >
                                                                    {
                                                                        <CustomModal
                                                                            isOpen={currentId === obj._id ? isEditOpen : false}
                                                                            onOpen={() => !obj.iscompleted && handleEditModalOpen(obj._id)}
                                                                            onClose={handleEditModalClose}
                                                                            title={'Edit Task'}
                                                                            body={
                                                                                <AddTaskModal onClose={handleEditModalClose} edittask={obj} handleAddEditTask={handleAddEditTask} />
                                                                            }
                                                                        >
                                                                            <EditIcon boxSize={5} cursor={obj.iscompleted ? 'not-allowed' : 'pointer'} _hover={{ color: obj.iscompleted ? "gray.400" : "teal.500" }} color={obj.iscompleted ? "gray.400" : "teal.300"} m={1} />
                                                                        </CustomModal>
                                                                    }
                                                                </CutomToolTip>

                                                                <CutomToolTip label={'Delete'} bg={'red.500'}>
                                                                    <CustomModal
                                                                        isOpen={isDeleteOpen}
                                                                        onOpen={() => handleOpenModal(obj._id)}
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
                                                                        <DeleteIcon boxSize={5} cursor={'pointer'} _hover={{ color: "red.500" }} color="red.300" m={1} />
                                                                    </CustomModal>
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
                </>
            }
        />
    </>;
};

export default TaskList;
