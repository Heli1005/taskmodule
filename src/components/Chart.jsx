import { PieChart, Pie, Cell, Tooltip, Legend, LabelList } from 'recharts';
import React from "react";
import { Box, Text } from '@chakra-ui/react';
import { useAuth } from './authenctication/useAuthentication';
import { useSelector } from "react-redux";

const Chart = () => {

  const { user } = useAuth()
  const taskDatafromRedux = useSelector(state => state.tasks.taskdata)
  const taskData = taskDatafromRedux?.filter(obj => obj.userid === user._id) || []

  let completedlist = taskData?.filter(obj => obj.iscompleted == 1)||[]
  let incompletedlist = taskData?.filter(obj => obj.iscompleted == 0)||[]

  const data = [
    { name: 'Completed Tasks', value: completedlist?.length },
    { name: 'Incomplete Tasks', value: incompletedlist?.length },
  ];

  const COLORS = ['#38A169', '#C53030'];

  return <Box w={'full'} height={'500px'} display={'flex'} justifyContent={'center'}>
    {
      !taskData?.length
        ?
        <Text my={10} fontSize={30} color={'gray.500'} fontWeight={'600'}> No Data Exist</Text>
        :
        <PieChart width={400} height={500}> 
          <Tooltip />
          <Legend layout="vertical" align="center" verticalAlign="top" />
          <Pie
            data={data}
            cx={200}
            cy={140}
            innerRadius={1}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={0}
            dataKey={'value'}
            label
            shapeRendering={'geometricPrecision'}
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS?.length]} />
              ))
            }
          </Pie>
        </PieChart>
    }
  </Box>;
};

export default Chart;
