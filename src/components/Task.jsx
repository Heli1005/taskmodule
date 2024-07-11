import React from "react";
import TaskList from "./TaskList";
import {Box} from "@chakra-ui/react";


const Task = (props) => {
    return <Box   h={'full'} >
    <TaskList />
  </Box>;
};

export default Task;
