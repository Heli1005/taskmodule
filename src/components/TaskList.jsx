import React from "react";
import { Button, Box } from "@chakra-ui/react";

import CustomTable from "./commonComponents/CustomTable";

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
            id: 'status',
            name: 'Status'
        }
    ]

    let data = [
        {
            id: '1',
            title: 'complete home work',
            desc: 'submission date is 20th April',
            duedate: '10 may',
            status: 'completed'
        },
        {
            id: '1',
            title: 'complete home work',
            desc: 'submission date is 20th April',
            duedate: '10 may',
            status: 'completed'
        },
        {
            id: '1',
            title: 'complete home work',
            desc: 'submission date is 20th April',
            duedate: '10 may',
            status: 'completed'
        }
    ]
    return <>
        <Box display={'flex'} w={'full'} px={3} mt={2} >
            <Button colorScheme="teal" ml={'auto'}  >Add Task</Button>
        </Box>
        <CustomTable headerlist={headerlist} data={data} />
    </>;
};

export default TaskList;
