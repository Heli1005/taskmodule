import React from "react";
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer, Text, Box, VStack, Button, Select, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'


const CustomTable = ({ headerlist, tbody, tableCaption }) => {

    return <>
        <TableContainer mt={1} p={3} >
            <Table variant='simple' bg={'gray.100'}>
                <TableCaption color={'teal.500'}>{tableCaption}</TableCaption>
                <Thead bg={'teal.500'} rounded={'lg'} >
                    <Tr>
                        {
                            headerlist.map(td =>
                                <Th sx={{ width: td.w }} color={'white'} key={td.id}>{td.name}</Th>
                            )
                        }
                    </Tr>
                </Thead>
                {/* <Tbody> */}
                    {tbody}
                {/* </Tbody> */}
            </Table>
        </TableContainer>
    </>;
};

export default CustomTable;

