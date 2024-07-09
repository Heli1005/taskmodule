import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Task from "./components/Task";

const App = () => {
  return <div className="">
    <Header />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/task" element={<Task />} />
    </Routes>
  </div>;
};

export default App;
