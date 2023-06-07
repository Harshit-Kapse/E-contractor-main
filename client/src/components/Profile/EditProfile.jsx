import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from "../../State/UserSlice"

const EditProfile = (userId) => {
    const [shopAddress, setShopAddress] = useState();
    // const [email, setEmail] = useState();
    const [city, setCity] = useState();
    // const [phone, setPhone] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const token = useSelector((state) => state.user.token)
    const dispatch = useDispatch();
    const toast = useToast();

    const editDetails = async() => {
        try {
            const config = {
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
            };
    
            const { data } = await axios.patch("http://localhost:3009/api/vendors/updateprofile", {userId, shopAddress, city}, config)

            setShopAddress('')
            setCity('')

            dispatch(
                setLogin({
                user: data.user,
                token: token
            }))

            toast({
                title: data.msg,
                status: "success",
                duration: "2000",
                position: "top"
            })

            onClose();
        } catch (error) {
            toast({
                title: error.response.data.error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

  return (
    <>
        <Button onClick={onOpen} colorScheme='orange' w='8%'>
                Edit
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
                        Edit Profile
                    </ModalHeader>

                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormControl>
                            <FormLabel>Shop Address</FormLabel>
                            <Input
                                autoComplete="off"
                                placeholder="Address"
                                onChange={(e) => setShopAddress(e.target.value)}
                            />
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                autoComplete="off"
                                placeholder="Address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl> */}
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input
                                autoComplete="off"
                                placeholder="City"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Phone no.</FormLabel>
                            <Input
                                autoComplete="off"
                                placeholder="Address"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl> */}

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            // isLoading={loading}
                            colorScheme='green'
                            mr={3}
                            onClick={editDetails}
                        >
                            Confirm
                        </Button>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => {
                                onClose();
                                setAddress('')
                                setCity('')
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

export default EditProfile