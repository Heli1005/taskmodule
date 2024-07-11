import { Badge, Box, Button, Divider, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "./authenctication/useAuthentication";
import { FaTasks } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import Chart from "./Chart";



const DashBoardWithUser = () => {
    const { user } = useAuth()
    const taskDatafromRedux = useSelector(state => state.tasks.taskdata)
    const taskData = taskDatafromRedux?.filter(obj => obj.userid === user._id) || []

    let completedlist = taskData?.filter(obj => obj.iscompleted == 1)||[]
    let incompletedlist = taskData?.filter(obj => obj.iscompleted == 0)||[]
    const list = [
        {
            id: 'all',
            name: 'All Tasks',
            color: 'blue.500',
            total: taskData?.length,
            icon: <FaTasks />
        },
        {
            id: 'completedtask',
            name: 'Completed Tasks',
            color: 'green.500',
            total: completedlist?.length,
            icon: <MdOutlineTaskAlt />

        },
        {
            id: 'incompletetask',
            name: 'In Complete Tasks',
            color: 'red.500',
            total: incompletedlist?.length,
            icon: <BiTaskX />
        }
    ]

    return <Box display={'flex'} px={6} w={'full'} className="bg-gradient-to-r from-teal-600 to-slate-200" overflow="auto" scrollBehavior={'none'} h={'100%'}  >
        <VStack w="full">
            <Box display="flex" flexWrap="wrap" w="full" gap={6} mt={10} justifyContent={{ base: "center", md: "flex-start" }}>
                {
                    list.map(card => {
                        return <Box key={card.id} w={{ base: "80%", md: "270px" }} p={7} h={'150px'} bg={'white'} rounded={'lg'} shadow={'3px 4px 10px black'}>
                            <VStack w="full">
                                <Box display={'flex'} justifyContent={'center'} fontSize={'2rem'} gap={2} color={card.color} alignItems={'center'}>
                                    {card.icon}
                                    <Text as={'span'} color={card.color} fontSize={'2rem'} fontWeight={'bolder'}  >{card.total}</Text>
                                </Box>

                                <Text fontWeight={'bolder'} fontSize={'1.5rem'} color={card.color} >{card.name}</Text>
                            </VStack>
                        </Box>
                    })
                }
            </Box>
            <Divider borderWidth={1} my={8} borderColor={'gray.100'} shadow={'5px 5px 10px black'} />
            <Chart />
        </VStack>
    </Box>;
};

export default DashBoardWithUser;
