import React from "react";
import {  FormLabel, Text } from "@chakra-ui/react";

const CustomInputLabel = ({ field, errors, isError }) => {
  return <>
      <FormLabel mb={-2} display={'flex'} justifyContent={'space-between'}>
          <Text>
              {field.label}
              <Text as={'span'} color={'red.600'}>
                  {field.isrequired ? ' *' : ''}
              </Text>
          </Text>

          {
              isError
                  ?
                  <>
                      <Text color="red.600">{errors[field.id]}</Text>
                  </>
                  :
                  <></>
          }
      </FormLabel>
  </>;
};

export default CustomInputLabel;
