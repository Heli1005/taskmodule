import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Task from "./components/Task";
import Signup from "./components/authenctication/Signup";
import Login from "./components/authenctication/Login";
import { useAuth } from "./components/authenctication/useAuthentication";
import RegisteredValidation from "./components/authenctication/RegisteredValidation";
import { useDispatch, useSelector } from "react-redux";
import UseLocalStorage from "./components/commonComponents/useLocalStorage";
import { allTasks } from "./components/redux/taskSlice";
import { Box } from "@chakra-ui/react";
import Quotes from "./components/Quotes";

const App = () => {
  const { user } = useAuth()
  
  let dispatch = useDispatch()
  const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])
  const taskDatafromRedux = useSelector(state => state.tasks.taskdata)
  const taskData = user? taskDatafromRedux?.filter(obj => obj.userid === user._id): []


  useEffect(() => {
    dispatch(allTasks(allTaskList))
    setAllTaskList(taskData)
  }, [])

  return <Box className=""  >
    <Header />
    <Quotes/>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/task" element={<RegisteredValidation ><Task /></RegisteredValidation>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Box>;
};

export default App;
