import React from "react";
import { useAuth } from "./authenctication/useAuthentication";
import DashBoardWithUser from "./DashBoardWithUser";
import DashBoardWithoutUser from "./DashBoardWithoutUser";
import { Box } from "@chakra-ui/react";

const Dashboard = (props) => {

  const { user } = useAuth()

  return <Box position={'relative'} >
  {
    user?
    <DashBoardWithUser />
    :
    <DashBoardWithoutUser />
  }
  </Box>;
};

export default Dashboard;
