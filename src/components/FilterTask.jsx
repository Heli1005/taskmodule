import { Box ,Select } from "@chakra-ui/react";
import React, { useState } from "react";

const FilterTask = ({ status, handleFilter ,datalist}) => {
 
    return <Box>
        <Select border={'1px solid'} _focus={{ border: '1px solid', borderColor: 'teal.500' }} borderColor={'teal.500'} value={status} onChange={handleFilter}>
            {
                datalist.map(val => <option key={val.id} value={val.value}>{val.name}</option>)
            } 
        </Select> 
    </Box>;
};

export default FilterTask;
