import React from "react";
import { Formik, Form } from "formik";
import { TaskSchema } from "./schemas/TaskSchema";
import { VStack, Button, Box } from "@chakra-ui/react";
import CustomInput from "./commonComponents/CustomInput";
import CutomDateInput from "./commonComponents/CutomDateInput";
import { useDispatch } from "react-redux";
import { addTask } from "./redux/taskSlice";
import UseLocalStorage from "./commonComponents/useLocalStorage";

let initialState = {
    title: '',
    desc: '',
    duedate: new Date(),
    iscompleted: false,
    isLoading: false
}

const AddTaskModal = ({ onClose }) => {
    const dispatch = useDispatch()
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

    const handleAddTask = async (obj) => {
        obj['isLoading'] = true
        let req = { ...obj }
        req.duedate = req.duedate.toString()
        delete req.isLoading

        await dispatch(addTask(req))
        await setAllTaskList([...allTaskList,req])
        onClose()

        obj['isLoading'] = false
    }

    const handleCancel = () => {
        onClose()
    }
    return <>
        <Formik
            initialValues={initialState}
            validationSchema={TaskSchema}
            onSubmit={(values, actions) => {
                const timestamp = new Date().getTime();
                let tempObj = { ...values, _id: timestamp, timer: 0 }
                handleAddTask(tempObj)

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
                                <Button type="submit" w={'30%'} py={5} bg="teal.600" isLoading={values['isLoading'] || false}
                                    color="white"
                                    _hover={{ bg: 'teal.700' }}>Add </Button>
                                <Button variant='solid' w={'30%'} py={5} bg="gray.200" color={'black'} onClick={handleCancel}>Cancel</Button>
                            </Box>
                        </VStack>
                    </Form>
                )
            }
        </Formik>
    </>;
};

export default AddTaskModal;
