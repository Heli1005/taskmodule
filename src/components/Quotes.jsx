import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Quotes = () => {
    const [quotesObject, setquotesObject] = useState(null);
    
    const fetchQuotes = async () => {
        const apiUrl = 'https://api.quotable.io/random';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch random quote');
            }
            const data = await response.json(); 
                setquotesObject(data)
        } catch (error) {
            console.error('Error fetching random quote:', error.message);
            return null;
        }
    }

    let isMounted=false
    useEffect(() => {
        if (!isMounted) {
            // Run your initialization logic here
            isMounted = true;
            fetchQuotes()
        }

    }, [])

    return <Box w={'full'} bg={'gray.200'} py={2}>
        <marquee behavior="scroll" direction="left"  scrollamount="10">

        <Text color={'teal.600'} fontFamily={'monospace'} fontWeight={'bold'} fontSize={'1.5rem'} >{quotesObject?.content}</Text>
        </marquee>
    </Box>;
};

export default Quotes;
