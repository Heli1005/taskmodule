import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";

const Quotes = () => {
    const fetchQuotes = async () => {
        const apiUrl = 'https://quotes.rest/qod?language=en';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch random quote');
            }

            const data = await response.json();
            console.log("data", data);
        } catch (error) {
            console.error('Error fetching random quote:', error.message);
            return null;
        }
    }

    useEffect(() => {
        // fetchQuotes()

    }, [])

    return <Box w={'full'}>
        <Text></Text>
    </Box>;
};

export default Quotes;
