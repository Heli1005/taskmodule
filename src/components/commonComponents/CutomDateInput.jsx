import React, { useState } from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Box, Input, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { Field } from "formik";
import CustomInputLabel from "./CustomInputLabel";

const CustomInput = ({ field, setFieldValue, values }) => <Field component={CutomDateInput} setFieldValue={setFieldValue} values={values} field={field} />

export default CustomInput;

const CutomDateInput = ({ field, form, setFieldValue, values }) => {

    const { touched, errors, handleBlur } = form

    const handleChange = (val) => {
        setFieldValue(field.id, val);
    };

    let isError = (errors && errors[field.id] && touched[field.id])
    let errorBorder = isError ? `red.500` : `teal.500`

    return <>
        <FormControl>
            <CustomInputLabel field={field} errors={errors} isError={isError} />
            <Box>
                <DateTime
                    errBorder={errorBorder}
                    value={values[field.id]}
                    onChange={handleChange}
                    field={field}
                    id={field.id}
                    name={field.id}
                    handleBlur={handleBlur}
                    renderInput={(props, openCalendar) =>
                        <Input
                            bg={'white'}
                            disabled={field.disabled || false}
                            h={'46px'}
                            shadow={'3px 3px 7px gray'}
                            my={2}
                            borderColor={errorBorder}
                            focusBorderColor={errorBorder}
                            placeholder={`Enter ${field.label}`}
                            {...props}
                            onClick={openCalendar}
                        />
                    }
                />
            </Box>
        </FormControl>
    </>;
};

