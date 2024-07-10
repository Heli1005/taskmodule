import { Tooltip } from "@chakra-ui/react";
import React from "react";

const CutomToolTip = ({ children, label, bg }) => {
  return <>
    <Tooltip placement='left-start' label={label} bg={bg ? bg : 'teal.500'} rounded={'md'} color={'white'} hasArrow >
      {children}
    </Tooltip>
  </>;
};

export default CutomToolTip;
