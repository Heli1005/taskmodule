import React from "react";
import TaskList from "./TaskList";
import {Box} from "@chakra-ui/react";


const Task = (props) => {
    return <Box bg={'gray.50'} h={'100%'} >
    <TaskList />
  </Box>;
};

export default Task;
