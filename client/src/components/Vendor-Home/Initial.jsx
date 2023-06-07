import { Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Main from './Main'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setVendor } from '../../State/VendorSlice'

const Initial = ({ user, setFalse }) => {
    const token = useSelector((state) => state.user.token);
    const vendor = useSelector((state) => state.vendor.vendor);
    const toast = useToast();
    const dispatch = useDispatch();


    const isUserAVendor = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (!vendor) {
                const { data } = await axios.get('http://localhost:3009/api/vendors/isVendor', config);

                console.log(data);

                if (data.vendor)
                    dispatch(setVendor(data.vendor));
            }
        } catch (error) {
            toast({
                description: error.response.data.error,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
        }
    }

    const register = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        };

        const userId = user._id

        const { data } = await axios.post('http://localhost:3009/api/vendors', { userId }, config);

        await isUserAVendor().then(() => {
            toast({
                description: data,
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
        });
    }

    useEffect(() => {
        isUserAVendor();
    }, [])

    return (
        <Flex border='2px solid black' w='80%' h='90vh' bg='#e7e7e7' flexDir={'column'} p={5} borderRadius={'xl'} overflowY={'scroll'}>
            <Text w='100%' fontWeight={'bold'} fontSize={'4xl'} align='center'>
                Welcome! {user.name}
            </Text>
            {!vendor ?
                <Flex flexDir={'column'} align={'center'} mt={'10%'}>
                    <Text w='100%' fontSize={'3xl'} align='center' mb={3}>
                        Current You've not registered yourself in the Vendor's List
                    </Text>
                    <Text w='100%' fontSize={'3xl'} align='center' mb={3}>
                        So, no one can see you or book you or rate you
                    </Text>
                    <Text w='100%' fontSize={'3xl'} align='center' mb={10}>
                        Press the below button to register
                    </Text>
                    <Button
                        onClick={register}
                        bg='#FF00FF'
                        _hover={{ bg: '#cc00cc' }}
                        color='white'
                    >
                        Register
                    </Button>
                </Flex>
                :
                vendor && !setFalse && <Main />
            }
        </Flex>
    )
}

export default Initial