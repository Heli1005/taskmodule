import { Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import UseLocalStorage from "./useLocalStorage";


const CustomTimer = ({ obj, taskData }) => {
    const [remainingTimes, setRemainingTimes] = useState({});
    const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])

    const timerRef = useRef(null);

    useEffect(() => {
        updateRemainingTimes();
        timerRef.current = setInterval(updateRemainingTimes, 1000 );
        setAllTaskList(taskData)
        return () => clearInterval(timerRef.current);
    }, [taskData]);

    const formatTimeLeft = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        // const weeks = Math.floor(totalSeconds / (3600 *24* 7));
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // let w = weeks ? weeks + 'w' : ''
        let d = days ? days + 'd' : ''
        let h = hours ? hours + 'h' : ''
        let m = minutes ? (minutes < 10 ? '0' : '') + minutes + 'm' : '00 m'
        let s = seconds ? (seconds < 10 ? '0' : '') + seconds + 's' : '00 s'

        return `${d} ${h} ${m} ${s}`;
    };

    const updateRemainingTimes = () => {
        const newRemainingTimes = taskData.reduce((acc, task) => {
            let time = calculateRemainingTime(task.duedate);
            acc[task._id] = time<0?0:time
            return acc;
        }, {});
        setRemainingTimes(newRemainingTimes);
    };

    const calculateRemainingTime = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        return due - now;
    };

    return <>
        <span id={obj._id} ref={!obj.iscompleted ? timerRef : null} >
            {
                remainingTimes[obj._id] !== undefined
                &&
                (
                    <Text color={calculateRemainingTime(obj.duedate)<0?'red.600':'black'} >{formatTimeLeft(remainingTimes[obj._id])}</Text>
                )
            }
        </span>
    </>;
};

export default CustomTimer;
