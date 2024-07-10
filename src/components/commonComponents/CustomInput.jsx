import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Field } from 'formik';
import CustomInputLabel from "./CustomInputLabel";

const CustomInput = ({ field }) => <Field component={FormField} field={field} />

export default CustomInput;

const FormField = ({ field, form }) => {

    const { handleChange, touched, errors, handleBlur, values } = form

    let isError = (errors && errors[field.id] && touched[field.id])
    let errorBorder = isError ? `red.500` : `teal.500`

    return <FormControl>
        <CustomInputLabel field={field} errors={errors} isError={isError} />

        <Input
            id={field.id}
            type={field.type || 'text'}
            bg={'white'}
            disabled={field.disabled || false}
            h={'46px'}
            shadow={'3px 3px 7px gray'}
            name={field.id}
            onChange={handleChange}
            value={values[field.id]}
            onBlur={handleBlur}
            my={2}
            borderColor={errorBorder}
            focusBorderColor={errorBorder}
            placeholder={`Enter ${field.label}`}
        />
    </FormControl>
}