import React, { useState } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import axios from 'axios';

const Feedbacks = () => {

    const [feedbacks, setFeedbacks] = useState([]);

    const allFeedbacks = async () => {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const { data } = await axios.get('http://localhost:3009/api/feedbacks/feedback', config);

        setFeedbacks(data);
    }

    useState(() => {
        allFeedbacks();
    }, [])

    return (
        <Box
            w='100%'
            h='100%'
            p={5}
            pt={10}
            bg='#b9f4cd'
        >
            {console.log(feedbacks)}
            <Box
                display='flex'
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                overflowY={'scroll'}
                p={5}
            >
                {
                    feedbacks ?
                        feedbacks.map((feedback) =>
                            <Box
                                display='flex'
                                p={5}
                                mb={10}
                                borderRadius={'md'}
                                bg='#f2d8f2'
                                boxShadow={'dark-lg'}
                                border='1px solid black'
                                key={feedback._id}
                                w='60%'
                                h='30vh'
                            >
                                <Box
                                    display='flex'
                                    flexDir={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    w='30%' mr={10}
                                >
                                    <Text as='b'>{feedback.name}</Text>
                                    <Text>{feedback.email}</Text>
                                    <Text>{feedback.phone}</Text>
                                </Box>

                                <Box w='5%' borderLeft={'1px solid black'}></Box>

                                <Box
                                    display='flex'
                                    flexDir={'column'}
                                    justifyContent={'center'}
                                    w='50%' ml={10}
                                >
                                    <Text as='b'>Feedback:-</Text>
                                    <Text>{feedback.feedback}</Text>
                                </Box>
                            </Box>
                        )
                        :
                        <Text>No Feedbacks</Text>
                }
            </Box>
        </Box>
    )
}

export default Feedbacks