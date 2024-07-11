import React from "react";
import { useAuth } from "./authenctication/useAuthentication";
import DashBoardWithUser from "./DashBoardWithUser";
import DashBoardWithoutUser from "./DashBoardWithoutUser";

const Dashboard = (props) => {

  const { user } = useAuth()

  return <>
  {
    user?
    <DashBoardWithUser />
    :
    <DashBoardWithoutUser />
  }
  </>;
};

export default Dashboard;
