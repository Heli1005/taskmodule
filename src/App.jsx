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

const App = () => {
  const { user, handlLogin } = useAuth()
  let dispatch = useDispatch()
  const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])
  const taskData = useSelector(state => state.tasks.taskdata).filter(obj => obj.userid === user._id)


  useEffect(() => {
    dispatch(allTasks(allTaskList))
    setAllTaskList(taskData)
  }, [])
  
  return <div className="">
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/task" element={<RegisteredValidation ><Task /></RegisteredValidation>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>;
};

export default App;
