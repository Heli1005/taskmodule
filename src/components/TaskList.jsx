import React from "react";
import { Button, Box, useDisclosure } from "@chakra-ui/react";

import CustomTable from "./commonComponents/CustomTable";
import CustomModal from "./commonComponents/CustomModal";
import AddTaskModal from "./AddTaskModal";

const TaskList = () => {

    let headerlist = [
        {
            id: 'id',
            name: 'ID'
        },
        {
            id: 'title',
            name: 'Title'
        },
        {
            id: 'desc',
            name: 'Description'
        },
        {
            id: 'duedate',
            name: 'Due Date'
        },
        {
            id: 'iscompleted',
            name: 'Status'
        }
    ]

    let data = [
        {
            id: '1',
            title: 'complete home work',
            desc: 'submission date is 20th April',
            duedate: '10 may',
            iscompleted: false
        },
        {
            id: '1',
            title: 'complete home work',
            desc: 'submission date is 20th April',
            duedate: '10 may',
            iscompleted: false
        },
        {
            id: '1',
            title: 'complete home work',
            desc: 'submission date is 20th April',
            duedate: '10 may',
            iscompleted: false
        }
    ]

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
                        <AddTaskModal onClose={onClose}  />
                    </>
                } 
            >
                <Button colorScheme="teal"   >Add Task</Button>
            </CustomModal>
        </Box>
        <CustomTable headerlist={headerlist} data={data} />
    </>;
};

export default TaskList;
