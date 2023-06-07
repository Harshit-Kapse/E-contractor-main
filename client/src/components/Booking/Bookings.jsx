import { Avatar, Box, Button, ButtonGroup, Flex, Heading, Text, IconButton, CircularProgress, useToast } from '@chakra-ui/react'
import { FaSync } from "react-icons/fa"
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setNewBooking, setTotalBooking } from '../../State/VendorSlice';

const Bookings = () => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    const toast = useToast();

    const token = useSelector((state) => state.user.token);
    const vendor = useSelector((state) => state.vendor.vendor);
    const vendorId = vendor.vendorInfo;
    const newBooking = useSelector((state) => state.vendor.newBooking);
    const totalBooking = useSelector((state) => state.vendor.totalBooking);

    const getNewBookings = async () => {
        setIsLoading(true)
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await axios.get("http://localhost:3009/api/bookings/newBooking", config);
            dispatch(setNewBooking(data));
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false)
    }

    const rejectBooking = async (bookingId) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post("http://localhost:3009/api/bookings/rejectBooking", { bookingId }, config)

        await getNewBookings();

        toast({
            title: data,
            duration: 1500,
            status: "success",
            position: "top"
        })

    }

    const bookingComplete = async (requestId) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await axios.post("http://localhost:3009/api/bookings/completedBooking", { requestId, vendorId }, config);

            await getNewBookings();

            dispatch(setTotalBooking(data));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Flex
            border='2px solid black'
            w='80%' h='90vh'
            bg='#e7e7e7' flexDir={'column'} p={5}
            borderRadius={'xl'} overflowY={'scroll'}
        >
            <Flex>
                <IconButton
                    aria-label="Refresh"
                    icon={isLoading ? <CircularProgress isIndeterminate size="30px" /> : <FaSync />}
                    rounded="full"
                    onClick={getNewBookings}
                    transition="all 0.2s ease-in-out"
                    _hover={{ transform: "rotate(90deg)" }}
                    _active={{ transform: "rotate(360deg)" }}
                    isLoading={isLoading}
                />
                <Flex w='100%' justify="center" align="center">

                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%'
                        direction="column" justify="center"
                        align="center" m={5} bg='white' p={2}
                    >
                        <Text fontSize="lg">New Booking</Text>
                        <Text fontSize="3xl" as='b' color="teal">
                            {newBooking === undefined ? 0 : newBooking.length}
                        </Text>
                    </Flex>

                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%'
                        direction="column" justify="center"
                        align="center" m={5} bg='white' p={2}
                    >
                        <Text fontSize="lg">Total Booking</Text>
                        <Text fontSize="3xl" as='b' color="teal">
                            {totalBooking === undefined ? 0 : totalBooking.length}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex w='100%' h='100%' p={3} justify='space-evenly'>
                <Flex id='new-booking'
                    flexDir='column' align='center' borderRadius={'lg'}
                    p={2} w='60%' bg='white' shadow='lg' overflowY={'scroll'}
                >
                    <Heading fontSize={'2xl'}>New Booking</Heading>

                    {newBooking && newBooking.length !== 0 ?
                        <Flex mt={10} w='100%' h='50vh' flexDir={'column'} align='center'>

                            {newBooking.map((newBook) => (
                                <Flex
                                    key={newBook._id}
                                    mb={3} flexDir='column' bg='#f4f4f4' border='2px solid #767575'
                                    justify={'center'} w='90%' borderRadius={'lg'}
                                >
                                    <Flex justify={'space-between'} p={3} align={'center'}>
                                        <Flex p={5}>
                                            <Avatar
                                                src={newBook.customer.img}
                                            />
                                            <Flex flexDir={'column'}>
                                                <Text as='b' ml={5}>{newBook.customer.name}</Text>
                                                <Text ml={5}>{newBook.customer.email}</Text>
                                                <Text ml={5}>1234567898</Text>
                                            </Flex>
                                        </Flex>
                                        <ButtonGroup>
                                            <Button colorScheme='green' onClick={() => bookingComplete(newBook._id)}>
                                                <CheckIcon />
                                            </Button>
                                            <Button colorScheme='red' onClick={() => rejectBooking(newBook._id)}>
                                                <CloseIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </Flex>

                                    <Flex justify={'center'} align='center' w='100%' p={5}>
                                        <Text align='justify'>
                                            {newBook.request}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ))}

                        </Flex>
                        :
                        <Text borderRadius={'lg'} w='100%' bg='lightgray' mt={10} fontFamily={'sans-serif'} fontSize='2xl' align='center'>No new bookings</Text>
                    }
                </Flex>

                <Flex id='total-booking'
                    flexDir='column' align='center' borderRadius={'lg'}
                    p={2} w='30%' bg='white' shadow='lg' overflowY={'scroll'}
                >
                    <Heading fontSize={'2xl'}>Total Booking</Heading>

                    {totalBooking && totalBooking.length !== 0 ?
                        <Flex mt={10} w='100%' h='50vh' flexDir={'column'} align='center'>
                            {totalBooking.map((totalBook) => (
                                <Flex
                                    key={totalBook._id}
                                    mb={3} flexDir='column' border='2px solid #767575'
                                    justify={'center'} w='90%' borderRadius={'lg'}
                                >
                                    <Flex justify={'space-between'} p={3} align={'center'}>
                                        <Flex p={5}>
                                            <Avatar
                                                src={totalBook.customer.img}
                                            />
                                            <Flex flexDir={'column'}>
                                                <Text as='b' ml={5}>{totalBook.customer.name}</Text>
                                                <Text ml={5}>{totalBook.customer.email}</Text>
                                                <Text ml={5}>1234567898</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                        :
                        <Text borderRadius={'lg'} w='100%' bg='#e2a0a0' mt={10} fontFamily={'sans-serif'} fontSize='2xl' align='center'>0 bookings</Text>
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Bookings