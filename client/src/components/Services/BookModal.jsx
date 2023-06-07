import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from "react-redux";

const BookModal = ({ vendor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [problem, setProblem] = useState('');
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    const toast = useToast();

    const handleBooking = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const ids = {
            customer: user._id,
            vendorId: vendor,
            problem: problem
        }

        const { data } = await axios.post("http://localhost:3009/api/bookings/create", { ids }, config);

        toast({
            title: data,
            status: 'success',
            duration: 3000,
            position: 'top',
            isClosable: true
        })

        onclose();
    }

    return (
        <>
            <Button
                onClick={onOpen}
                w='75%'
                size='sm'
                mt="4"
                bg='#FF00FF'
                _hover={{ bg: '#cc00cc' }}
                color='white'
            >
                Book
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
                        Explain your problem
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormControl id="your-message">
                            <FormLabel>Explain</FormLabel>
                            <Input
                                id='heading'
                                autoComplete="off"
                                placeholder="your problem"
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                mb={2}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            // isLoading={loading}
                            colorScheme='green'
                            mr={3}
                            onClick={handleBooking}
                        >
                            Send
                        </Button>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => {
                                onClose();
                                setProblem('');
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

export default BookModal