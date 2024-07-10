import React, { useEffect } from "react";
import { Button, Box, useDisclosure } from "@chakra-ui/react";
import CustomTable from "./commonComponents/CustomTable";
import CustomModal from "./commonComponents/CustomModal";
import AddTaskModal from "./AddTaskModal";
import UseLocalStorage from "./commonComponents/useLocalStorage";
import { useDispatch,useSelector } from "react-redux";
import { allTasks } from "./redux/taskSlice";

const TaskList = () => {
    let dispatch = useDispatch()
    let headerlist = [
        {
            id: 'title',
            name: 'Title',
            type:'text'
        },
        {
            id: 'desc',
            name: 'Description',
            type:'text'
        },
        {
            id: 'duedate',
            name: 'Due Date',
            type:'datetime'
        },
        {
            id: 'iscompleted',
            type:'radio',
            values:[
                {
                    value: true,
                    name: 'Completed',
                    bg:'green.500'
                },
                {
                    value: false,
                    name: 'Not Completed',
                    bg:'red.500'
                }
            ],
            name: 'Status'
        },
        {
            id:'action',
            name:'Action',
            type:'action'
        }
    ]
 

    const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])
    
    const taskData=useSelector(state=>state.tasks.taskdata)||[]

    useEffect(() => {
        dispatch(allTasks(allTaskList))
        setAllTaskList(taskData)

    }, [])

   
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <>
        <Box display={'flex'} w={'full'} px={3} mt={3} justifyContent={'end'} >
            <CustomModal

                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                title={'Add Task'}
                body={
                    <>
                        <AddTaskModal onClose={onClose} />
                    </>
                }
            >
                <Button colorScheme="teal">Add Task</Button>
            </CustomModal>
        </Box>
        <CustomTable headerlist={headerlist} data={taskData} />
    </>;
};

export default TaskList;
