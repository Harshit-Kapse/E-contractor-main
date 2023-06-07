import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewBooking, setReviews, setTotalBooking } from '../../State/VendorSlice';

const Main = () => {
    const vendor = useSelector((state) => state.vendor.vendor);
    const [ratings, setRatings] = useState();
    console.log(vendor);

    const dispatch = useDispatch();

    const token = useSelector((state) => state.user.token);
    const newBooking = useSelector((state) => state.vendor.newBooking);
    const totalBooking = useSelector((state) => state.vendor.totalBooking);
    const reviews = useSelector((state) => state.vendor.reviews);

    const getNewBookings = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get("http://localhost:3009/api/bookings/newBooking", config);

        dispatch(setNewBooking(data));
    }

    const getTotalBookings = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await axios.get("http://localhost:3009/api/bookings/totalBooking", config);
            dispatch(setTotalBooking(data));
        } catch (error) {
            console.log(error);
        }
    }

    const getReviews = async (vendorId) => {
        const config = {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const { data } = await axios.post("http://localhost:3009/api/vendors/reviews", { vendorId }, config);

        dispatch(setReviews(data.reviews));
    }

    const getRatings = async (vendorId) => {
        const config = {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const { data } = await axios.post("http://localhost:3009/api/vendors/ratings", { vendorId }, config);

        setRatings(data)
    }

    useEffect(() => {
        getNewBookings();
        getTotalBookings();
        getReviews(vendor.vendorInfo)
        getRatings(vendor.vendorInfo)
    }, []);

    return (
        <>
            <Box mt={10}>
                <Flex justify="center" align="center">
                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%' direction="column" justify="center" align="center" m={5} bg='white' p={2}>
                        <Text fontSize="lg">New Booking</Text>
                        <Text fontSize="3xl" as='b' color="teal">
                            {newBooking ? newBooking.length : ""}
                        </Text>
                    </Flex>

                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%' direction="column" justify="center" align="center" m={5} bg='white' p={2}>
                        <Text fontSize="lg">Total Booking</Text>
                        <Text fontSize="3xl" as='b' color="teal">
                            {totalBooking ? totalBooking.length : ""}
                        </Text>
                    </Flex>

                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%' direction="column" justify="center" align="center" mr={10} bg='white' p={2}>
                        <Text fontSize="lg">Total Rating</Text>
                        <Text fontSize="3xl" as='b' color="teal">
                            {vendor? vendor.ratings.length : 0}
                        </Text>
                    </Flex>

                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%' direction="column" justify="center" align="center" mr={10} bg='white' p={2}>
                        <Text fontSize="lg">Average Rating</Text>
                        <Text fontSize="3xl" as='b' color="teal">{vendor ? vendor.averageRating : 0}</Text>
                    </Flex>

                    <Flex boxShadow={'lg'} borderRadius={'lg'} w='20%' direction="column" justify="center" align="center" mr={10} bg='white' p={2}>
                        <Text fontSize="lg">Reviews Count</Text>
                        <Text fontSize="3xl" as='b' color="teal">{reviews ? reviews.length : 0}</Text>
                    </Flex>
                </Flex>
            </Box>

            <Flex w='100%' h='100%' mx='auto' justify={'space-evenly'}>
                <Flex flexDir={'column'} align='center' mt={8} w='60%' h='13.5%'>
                    <Flex w='100%' justify='center'>
                        <Text mb={5} fontFamily={'sans-serif'} fontSize='4xl' align='center' fontWeight={'semibold'}>Reviews:</Text>
                        <Text ml={2} mb={5} fontFamily={'sans-serif'} fontSize='4xl' align='center' fontWeight={'semibold'} color='teal'>{reviews ? reviews.length : 0}</Text>
                    </Flex>

                    {reviews && reviews.length > 0 ?
                        reviews.map((review) => (
                            <Flex key={review._id} mb={3} flexDir='column' bg='white' boxShadow={'lg'} justify={'center'} w='100%' borderRadius={'lg'}>
                                <Flex p={5}>
                                    <Avatar
                                        src={review.customer.img}
                                    />
                                    <Flex ml={5} flexDir='column'>
                                        <Text>Name: {review.customer.name}</Text>
                                        <Text>Email: {review.customer.email}</Text>
                                    </Flex>
                                </Flex>

                                <Text p={5}>{review.review}</Text>
                            </Flex>
                        ))
                        :
                        <Text w='100%' bg='white' mt={10} fontFamily={'sans-serif'} fontSize='2xl' align='center' borderRadius={'lg'}>No Review</Text>
                    }

                </Flex>

                <Flex mt={8} w='30%' flexDir={'column'} h='60%'>
                    <Text w='100%' mb={5} fontFamily={'sans-serif'} fontSize='4xl'
                        align='center' fontWeight={'semibold'}>
                        Ratings
                    </Text>

                    <Flex flexDir={'column'} justify='center' align='center' w='100%' h='100%'
                        bg='white' shadow='lg' borderRadius={'lg'} p={5}
                    >
                        <Flex justify={'space-evenly'} w='85%'>
                            <Text color="teal" bg='lightgray' align='center'
                                w='10%' borderRadius={'full'} as='b' mt={1}
                            >
                                {ratings ? (ratings[5] ? ratings[5] : 0) : 0}
                            </Text>
                            <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                            </Flex>
                        </Flex>

                        <Flex justify={'space-evenly'} w='85%'>
                            <Text color="teal" bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[4] ? ratings[4] : 0) : 0}</Text>
                            <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                            </Flex>
                        </Flex>

                        <Flex justify={'space-evenly'} w='85%'>
                            <Text color="teal" bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[3] ? ratings[3] : 0) : 0}</Text>
                            <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                            </Flex>
                        </Flex>

                        <Flex justify={'space-evenly'} w='85%'>
                            <Text color="teal" bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[2] ? ratings[2] : 0) : 0}</Text>
                            <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                            </Flex>
                        </Flex>

                        <Flex justify={'space-evenly'} w='85%'>
                            <Text color="teal" bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[1] ? ratings[1] : 0) : 0}</Text>
                            <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                <StarIcon color='yellow.600' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                                <StarIcon color='lightgray' mr={4} />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Main