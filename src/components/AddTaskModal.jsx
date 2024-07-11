import React from "react";
import { Formik, Form } from "formik";
import { TaskSchema } from "./schemas/TaskSchema";
import { VStack, Button, Box } from "@chakra-ui/react";
import CustomInput from "./commonComponents/CustomInput";
import CutomDateInput from "./commonComponents/CutomDateInput";

const AddTaskModal = ({ onClose, edittask, handleAddEditTask }) => {

    let initialState = {
        title: '',
        desc: '',
        duedate: '',
        iscompleted: 0,
        ...edittask
    }
    
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
                const errors = {};
                let tempobj = { ...values }
                const now = new Date();
                const dueDate = new Date(values.duedate);
                if (dueDate < now) {
                    errors.duedate = 'Due date cannot be in the past';
                }  

                if (Object.keys(errors)?.length > 0) {
                    actions.setErrors(errors);
                } else {
                    handleAddEditTask(tempobj)
                    actions.resetForm();
                }
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
