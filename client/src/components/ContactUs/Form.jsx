import { Box, Button, FormControl, FormLabel, Input, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Form = () => {
    const token = useSelector((state) => state.user.token);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !phone || !feedback) {
            toast({
                title: "Enter all the fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.post('http://localhost:3009/api/feedbacks/feedback', { name, email, phone, feedback }, config);

        toast({
            title: data,
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top"
        });

        setName('');
        setEmail('');
        setPhone('');
        setFeedback('');
        setLoading(false);
    }

    return (
        <Box
            display='flex'
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            w='100%'
            h='100%'
        >
            <Text fontSize={'3xl'} mt='5' mb='5'>Contact Us</Text>
            <VStack borderRadius={'3xl'} spacing="20px" w='30%' border={'2px solid #cc00cc'} p={10}>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        autoComplete="off"
                        placeholder="Enter your Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        autoComplete="off"
                        placeholder="Enter your Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl id="phone" isRequired>
                    <FormLabel>Phone No.</FormLabel>
                    <Input
                        type='tel'
                        autoComplete="off"
                        placeholder="Enter your Phone Number"
                        pattern="[0-9]{10}"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormControl>

                <FormControl id="feedback" isRequired>
                    <FormLabel>Feedback</FormLabel>
                    <Textarea
                        autoComplete="off"
                        placeholder="Enter your Feedback"
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </FormControl>

                <Button
                    onClick={submitHandler}
                    isLoading={loading}
                    style={{ marginTop: 15 }}
                    bg='#FF00FF'
                    color='white'
                    _hover={{ bg: '#cc00cc' }}
                    borderRadius={'full'}
                >
                    Submit
                </Button>
            </VStack>
        </Box>
    )
}

export default Form