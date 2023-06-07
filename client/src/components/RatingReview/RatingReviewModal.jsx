import { StarIcon } from '@chakra-ui/icons';
import {
    Button, Flex, FormControl, FormLabel, Modal,
    ModalBody, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Radio, RadioGroup, Stack, Textarea,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setVendor } from '../../State/VendorSlice';

const RatingReviewModal = ({ userId, vendorId, token, setReviews, setRatings, getRatings }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const toast = useToast();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const reviewAndRate = async () => {
        if (!review && !rating) {
            toast({
                title: "No rating & No review",
                status: "error",
                duration: "2000",
                position: "top"
            })
            return;
        }

        onClose();
        try {
            const config = {
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const { data } = await axios.post("http://localhost:3009/api/vendors/ratingsAndReviews", { userId, vendorId, review, rating }, config)

            console.log(data);
            console.log(data.starCounts);
            console.log(Object.keys(data.starCounts).length)

            if (data.reviews)
                setReviews(data.reviews);

            if (data.ratings) {
                setRatings(data.ratings)
            }
            if (data.vendor) {
                dispatch(setVendor(data.vendor))
            }

            toast({
                title: data.msg,
                status: "success",
                duration: "2000",
                position: "top"
            })
        } catch (err) {
            toast({
                title: err.response.data,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme='orange'
                w='75%'
                size='sm'
            >
                Rate & Review
            </Button>


            <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Rate & Review
                    </ModalHeader>

                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormControl id="review">
                            <FormLabel>Review</FormLabel>
                            <Textarea
                                autoComplete="off"
                                placeholder="Write a review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="rate" mt={5}>
                            <FormLabel>Rate</FormLabel>
                            <Flex justify={'center'}>
                                <RadioGroup onChange={setRating} value={rating}>
                                    <Stack mb={5} direction='column'>
                                        <Radio value={5}>
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                        </Radio>
                                        <Radio value={4}>
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                        </Radio>
                                        <Radio value={3}>
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                        </Radio>
                                        <Radio value={2}>
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                        </Radio>
                                        <Radio value={1}>
                                            <StarIcon color='yellow.600' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                            <StarIcon color='lightgray' mr={4} />
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </Flex>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            // isLoading={loading}
                            colorScheme='green'
                            mr={3}
                            onClick={reviewAndRate}
                        >
                            Add
                        </Button>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => {
                                onClose();
                                setReview('');
                                setRating(0);
                            }}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RatingReviewModal