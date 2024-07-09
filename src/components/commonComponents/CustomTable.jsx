import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const CustomTable = ({ headerlist , data}) => {
  return <>
      <TableContainer mt={3} p={3}>
          <Table variant='simple'>
              <TableCaption>Its all about all tasks..</TableCaption>
              <Thead bg={'teal.500'} rounded={'lg'} >
                  <Tr>
                      {
                          headerlist.map(td =>
                              <Th color={'white'} key={td.id}>{td.name}</Th>
                          )
                      }
                  </Tr>
              </Thead>
              <Tbody>
                  {
                      data.map((obj, dataindex) => {
                          return <Tr key={dataindex}>
                              {
                                  headerlist.map(td => {
                                      return <Td key={td.id}>{obj[td.id]}</Td>
                                  }
                                  )
                              }
                          </Tr>
                      })
                  }
              </Tbody>
          </Table>
      </TableContainer>
  </>;
};

export default CustomTable;

