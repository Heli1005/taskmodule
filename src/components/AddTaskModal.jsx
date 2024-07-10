import React from "react";
import { Formik, Form } from "formik";
import { TaskSchema } from "./schemas/TaskSchema";
import { VStack, Button, Box } from "@chakra-ui/react";
import CustomInput from "./commonComponents/CustomInput";
import CutomDateInput from "./commonComponents/CutomDateInput";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "./redux/taskSlice";
import UseLocalStorage from "./commonComponents/useLocalStorage";

const AddTaskModal = ({ onClose, edittask, handleAddEditTask }) => {

    let initialState = {
        title: '',
        desc: '',
        duedate: new Date(),
        iscompleted: 0,
        istimerstart: false,
        ...edittask
    }

    
    const [allTaskList, setAllTaskList] = UseLocalStorage('tasks', [])

    let taskObject = {
        title: {
            id: 'title',
            label: 'Title',
            isrequired: true,
            type: 'text'
        },
        desc: {
            id: 'desc',
            label: 'Description',
            isrequired: false,
            type: 'text'
        },
        duedate: {
            id: 'duedate',
            label: "Due Date",
            isrequired: true,
            type: 'date',
        }
    }

 
    
    return <>
        <Formik
            initialValues={initialState}
            validationSchema={TaskSchema}
            onSubmit={(values, actions) => {
                let tempobj = { ...values }
                    handleAddEditTask(tempobj)
            }}
        >
            {
                ({ setFieldValue, values }) => (
                    <Form>
                        <VStack>
                            <CustomInput field={taskObject.title} />
                            <CustomInput field={taskObject.desc} />
                            <CutomDateInput field={taskObject.duedate} setFieldValue={setFieldValue} values={values} />
                            <Box w={'full'} my={4} gap={3} display={'flex'} justifyContent={'center'} >
                                <Button type="submit" w={'30%'} py={5} bg="teal.600"  
                                    color="white"
                                    _hover={{ bg: 'teal.700' }}>{initialState._id ? 'Edit' : 'Add'} </Button>
                                <Button variant='solid' w={'30%'} py={5} bg="gray.200" color={'black'} onClick={onClose}>Cancel</Button>
                            </Box>
                        </VStack>
                    </Form>
                )
            }
        </Formik>
    </>;
};

export default AddTaskModal;
