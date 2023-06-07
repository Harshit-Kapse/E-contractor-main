import { StarIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import RatingReviewModal from '../RatingReview/RatingReviewModal';
import BookModal from '../Services/BookModal';

const AboutVendor = ({ vendor }) => {
    const [ratings, setRatings] = useState();
    const [reviews, setReviews] = useState([]);
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.user);
    if (user)
        var userId = user._id;

    console.log(vendor)

    const getReviews = async (vendorId) => {
        const config = {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const { data } = await axios.post("http://localhost:3009/api/vendors/reviews", { vendorId }, config);

        setReviews(data.reviews);
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
        getReviews(vendor.vendorInfo._id);
        getRatings(vendor.vendorInfo._id);
    }, []);

    return (
        <Flex w='100%' mt={10} justify={'space-evenly'} p={3}>
            {vendor ?
                <>
                    <Flex id='vendor' bg='#e2e2e2'
                        flexDir='column' w='15%' h='75vh' align={'center'} justify={'space-evenly'}
                        border='1px solid black' borderRadius={'lg'} p={5}
                    >
                        <Flex>
                            <Avatar mb={5} size='2xl' src={vendor.vendorInfo.img} />
                        </Flex>
                        <Box mx={'auto'} w='100%' align='center' mb={5}>
                            <Text>{vendor.vendorInfo.name}</Text>
                            <Text>{vendor.vendorInfo.email}</Text>
                            <Text>{987654123}</Text>
                            <Text>{vendor.vendorInfo.workType}</Text>
                        </Box>

                        <BookModal />

                        <RatingReviewModal
                            userId={userId}
                            vendorId={vendor.vendorInfo._id}
                            token={token}
                            setReviews={setReviews}
                            setRatings={setRatings}
                            getRatings={getRatings}
                        />
                    </Flex>

                    <Flex id='rating&reviews' bg='#e2e2e2' h='75vh' w='80%'
                        border='1px solid black' borderRadius='lg'
                    >
                        <Flex flexDir={'column'} align='center' p={3} w='65%' overflowY={'scroll'}>
                            <Text mb={5} fontFamily={'sans-serif'} fontSize='4xl' align='center' fontWeight={'semibold'}>
                                Reviews
                            </Text>

                            {reviews && reviews.length > 0 ?
                                reviews.map((review) => (
                                    <Flex key={review._id}
                                        mb={3} flexDir='column' bg='white' boxShadow={'lg'}
                                        justify={'center'} w='90%' borderRadius={'lg'}
                                    >
                                        <Flex p={5}>
                                            <Avatar
                                                src={review.customer.img}
                                            />
                                            <Flex ml={5} flexDir='column'>
                                                <Text fontWeight={'semibold'}>Name: {review.customer.name}</Text>
                                                <Text>Email: {review.customer.email}</Text>
                                            </Flex>
                                        </Flex>

                                        <Text align='center' p={5}>{review.review}</Text>
                                    </Flex>
                                ))
                                :
                                <Text w='100%' bg='white' mt={10} fontFamily={'sans-serif'} fontSize='2xl' align='center' borderRadius={'lg'}>No Review</Text>
                            }
                        </Flex>

                        <Flex flexDir={'column'} align='center' p={3} w='35%' mx='auto'>
                            <Flex>
                                <Text
                                    w='100%' mb={5} fontFamily={'sans-serif'}
                                    fontSize='4xl' align='center' fontWeight={'semibold'}
                                >
                                    Ratings:
                                </Text>
                                <Text
                                    w='100%' mb={5} fontFamily={'sans-serif'}
                                    fontSize='4xl' align='center' fontWeight={'semibold'}
                                >
                                    {vendor.averageRating}⭐
                                </Text>
                            </Flex>

                            <Flex flexDir={'column'} justify='center' align='center' w='80%'
                                h='60%' bg='white' shadow='lg' borderRadius={'lg'}
                            >
                                <Flex justify={'space-evenly'} w='85%'>
                                    <Text color={'#FF00FF'} bg='lightgray' align='center'
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
                                    <Text color={'#FF00FF'} bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[4] ? ratings[4] : 0) : 0}</Text>
                                    <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='lightgray' mr={4} />
                                    </Flex>
                                </Flex>

                                <Flex justify={'space-evenly'} w='85%'>
                                    <Text color={'#FF00FF'} bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[3] ? ratings[3] : 0) : 0}</Text>
                                    <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='lightgray' mr={4} />
                                        <StarIcon color='lightgray' mr={4} />
                                    </Flex>
                                </Flex>

                                <Flex justify={'space-evenly'} w='85%'>
                                    <Text color={'#FF00FF'} bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[2] ? ratings[2] : 0) : 0}</Text>
                                    <Flex justify='flex-end' p={2} w='60%' bg='white'>
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='yellow.600' mr={4} />
                                        <StarIcon color='lightgray' mr={4} />
                                        <StarIcon color='lightgray' mr={4} />
                                        <StarIcon color='lightgray' mr={4} />
                                    </Flex>
                                </Flex>

                                <Flex justify={'space-evenly'} w='85%'>
                                    <Text color={'#FF00FF'} bg='lightgray' align='center' w='10%' borderRadius={'full'} as='b' mt={1}>{ratings ? (ratings[1] ? ratings[1] : 0) : 0}</Text>
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
                : ""
            }
        </Flex>
    )
}

export default AboutVendor