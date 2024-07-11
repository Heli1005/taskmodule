import React, { useEffect, useMemo, useState } from "react";
import { Button, Box, useDisclosure, Td, Tr, Menu, MenuButton, MenuList, MenuItem, VStack, Text, useToast, Tbody } from "@chakra-ui/react";
import CustomTable from "./commonComponents/CustomTable";
import CustomModal from "./commonComponents/CustomModal";
import CutomToolTip from "./commonComponents/CutomToolTip";
import AddTaskModal from "./AddTaskModal";
import UseLocalStorage from "./commonComponents/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "./redux/taskSlice";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import FilterTask from "./FilterTask";
import CustomTimer from "./commonComponents/CustomTimer";
import { taskHeaderList } from "./data/tasksList";
import { useAuth } from "./authenctication/useAuthentication";
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import DeleteTaskModal from "./DeleteTaskModal";
import { DragHandleIcon } from "@chakra-ui/icons";

const TaskList = () => {
    let dispatch = useDispatch()
    let headerlist = taskHeaderList()
    const toast = useToast()

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
    const { user } = useAuth()
    const taskData = useSelector(state => state.tasks.taskdata) || []
    const [sortedTaskList, setSortedTaskList] = useState(taskData);
    

    const handleOpenModal = (id) => {
        setCurrentId(id);
        onDeleteOpen();
    };

    const handleEditModalOpen = (id) => {
        setCurrentId(id)
        onEditOpen()
    }

    const handleEditModalClose = () => {
        setCurrentId(null)
        onEditClose()
    }

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
        let tempObj = sortedTaskList.find(obj => obj._id === id)
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
            await toast({
                title: 'Task Updated Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } else {
            const timestamp = new Date().getTime();
            req['_id'] = timestamp
            req['userid'] = user._id
            req['timer'] = 0
            await dispatch(addTask(req))
            onClose()
            await toast({
                title: 'Task Added Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        await setAllTaskList([...allTaskList, req])
    }
    const handleFilter = (e) => {
        setStatus(e.target.value)
    }

    const taskDataMemo = useMemo(() => {

        let tempdata = status === 'all' ? sortedTaskList : sortedTaskList.filter(obj => obj.iscompleted == status)
        tempdata = tempdata?.filter(obj => obj.userid === user._id)

        return tempdata
    }, [status, sortedTaskList])
    
    useEffect(()=>{
        
        setSortedTaskList(taskData)
    },[taskData])

    // ------------------------  drag and drop start  ------------------------------------------------
    // Define the drag handle component
    const DragHandle = SortableHandle(() => <DragHandleIcon cursor="grab" />);

    const SortableItem = SortableElement(({ item, index }) => (
        <Tr key={index}>
            {
                headerlist.map(td => {
                    let radiotypeObj =
                        td.type === 'radio'
                            ?
                            td.values.find(val => val.value === item[td.id])
                            :
                            null

                    return td.type === 'dragicon'
                    ?
                        <Td key={td.id}><DragHandle /></Td>
                    :
                    td.type === 'datetime'
                        ?
                       
                        <Td key={td.id}>{formatDateTime(new Date(item[td.id]))}</Td>
                        :
                        td.type === 'radio'
                            ?
                            <Td key={td.id}>
                                <Menu>
                                    <MenuButton as={Button} cursor={item.iscompleted ? 'not-allowed' : 'pointer'} bg={radiotypeObj?.bg} py={1.5} px={2} fontSize={12} fontWeight={'bold'} rounded={'md'} color={'white'} colorScheme={radiotypeObj.bg} rightIcon={<ChevronDownIcon />}>
                                        <Text as={'span'}>
                                            {radiotypeObj.name}
                                        </Text>
                                    </MenuButton>
                                    {
                                        !radiotypeObj.value &&
                                        <MenuList>
                                            {
                                                td.values.map(val => {
                                                    return <MenuItem key={td.id + val.name} onClick={() => handleOptionSelect(val.value, item._id)}>
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
                                    <CustomTimer obj={item} taskData={sortedTaskList} />
                                </Td>
                                :
                                td.type === 'action'
                                    ?
                                    <Td key={td.id}>
                                        <Box display={'flex'} gap={3} >
                                            <CutomToolTip label={'Edit'} >
                                                {
                                                    <CustomModal
                                                        isOpen={currentId === item._id ? isEditOpen : false}
                                                        onOpen={() => !item.iscompleted && handleEditModalOpen(item._id)}
                                                        onClose={handleEditModalClose}
                                                        title={'Edit Task'}
                                                        body={
                                                            <AddTaskModal onClose={handleEditModalClose} edittask={item} handleAddEditTask={handleAddEditTask} />
                                                        }
                                                    >
                                                        <EditIcon boxSize={5} cursor={item.iscompleted ? 'not-allowed' : 'pointer'} _hover={{ color: item.iscompleted ? "gray.400" : "teal.500" }} color={item.iscompleted ? "gray.400" : "teal.300"} m={1} />
                                                    </CustomModal>
                                                }
                                            </CutomToolTip>
                                            <DeleteTaskModal isDeleteOpen={isDeleteOpen} item={item} handleOpenModal={handleOpenModal} currentId={currentId} setCurrentId={setCurrentId} onDeleteClose={onDeleteClose} />
                                        </Box>
                                    </Td>
                                    :
                                    <Td key={td.id}>{item[td.id] || '-'}</Td>
                }
                )
            }
        </Tr>
    ));

    const SortableList = SortableContainer(({ items }) => (
        <Tbody>
            {items.map((item, index) => (
                <SortableItem key={`item-${item.id}`} index={index} item={item} />
            ))}
        </Tbody>
    ));

    const onSortEnd = ({ oldIndex, newIndex }) => {
        
        setSortedTaskList((oldItems) => {
            
            const newItems = [...oldItems];
            const [movedItem] = newItems.splice(oldIndex, 1);
            newItems.splice(newIndex, 0, movedItem);
            return newItems;
        });
    };
    useEffect(() => {
        setAllTaskList(sortedTaskList)
    }, [sortedTaskList])

    // ------------------------  drag and drop end  ------------------------------------------------


    return <>
        <Box display={'flex'} mt={4} alignItems={'center'} justifyContent={'space-between'} >

            <Text ml={5} color={'teal.600'} fontWeight={'bold'} fontSize={'1.5rem'}  >{'Task'}</Text>
            <Box display={'flex'} w={'full'} px={3} gap={5} justifyContent={'end'} >
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
        </Box>
        <CustomTable
            tableCaption={`Total tasks : ${taskDataMemo?.length} (Remaing : ${sortedTaskList?.filter(obj => obj.iscompleted == 0)?.length}, Completed : ${sortedTaskList?.filter(obj => obj.iscompleted == 1)?.length})`}
            headerlist={headerlist}
            tbody={
                <>
                    {
                        (!taskDataMemo?.length)
                            ?
                            <Tr>
                                <Td colSpan={headerlist.length}>
                                    <Text align={'center'} my={20} fontSize={'1.5rem'} color={'gray.400'}>No Task Found</Text>
                                </Td>
                            </Tr>
                            : 
                            <SortableList items={taskDataMemo} onSortEnd={onSortEnd} useDragHandle />
                    }
                </>
            }
        />
    </>;
};

export default TaskList;
