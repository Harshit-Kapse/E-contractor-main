import React from 'react'
import { Avatar, Button, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../State/UserSlice';
import { useNavigate } from 'react-router-dom';
import { setVendor } from '../../State/VendorSlice';

const SideNav = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const logout = () => {
        dispatch(setLogout());
        dispatch(setVendor(null));
        toast({
            title: 'Logout Succesfully!',
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom"
        });
    }

    return (
        <Flex w='15%' h='90vh' bg='#e7e7e7' border='2px solid black' p={5} borderRadius={'xl'}>
            <Flex w='100%' flexDir='column' justify={'space-between'} align={'center'}>
                {user ?
                    <Flex flexDir={'column'} align='center'>
                        <Avatar
                            name={user.name}
                            src={user.img}
                            size={'xl'}
                            cursor={'pointer'}
                        />
                        <Text fontSize={'lg'} align='center' mt={2}>{user.name}</Text>
                        <Text fontSize={'sm'} fontWeight={'medium'} align='center' mt={2}>{user.workType.toUpperCase()}</Text>
                    </Flex> :
                    ""
                }

                <Flex w='100%' h='35%' flexDir='column' justify={'space-evenly'} align={'center'}>
                    <Flex onClick={() => navigate('/vendor/home')}
                        w='70%' h='20%' justify={'center'} align='center' fontSize={'xl'} cursor={'pointer'} _hover={{ bg: 'black', color: "white" }} bg='white' borderRadius={'lg'}
                    >
                        Home
                    </Flex>

                    <Flex onClick={() => navigate('/vendor/bookings')}
                        w='70%' h='20%' justify={'center'} align='center' fontSize={'xl'} cursor={'pointer'} _hover={{ bg: 'black', color: "white" }} bg='white' borderRadius={'lg'}
                    >
                        Bookings
                    </Flex>

                    <Flex onClick={() => navigate('/vendor/profile')}
                        w='70%' h='20%' justify={'center'} align='center' fontSize={'xl'} cursor={'pointer'} _hover={{ bg: 'black', color: "white" }} bg='white' borderRadius={'lg'}
                    >
                        Profile
                    </Flex>
                </Flex>

                <Button
                    onClick={logout}
                    colorScheme='red'
                >
                    Logout
                </Button>
            </Flex>
        </Flex>
    )
}

export default SideNav