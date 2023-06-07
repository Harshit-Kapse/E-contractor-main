import { Box, Button, Text, Image, useToast } from '@chakra-ui/react'
import React from 'react'
import { setLogout } from '../State/UserSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const user = useSelector((state) => state.user.user);

    const logout = () => {
        dispatch(setLogout())
        toast({
            title: 'Logout Succesfully!',
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "bottom"
        });
    }
    return (
        <Box
            w='100%'
            h='8vh'
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            color='black'
            bg='#e2e2e2'
            borderRadius={'md'}
        >
            <Image
                boxSize='80px'
                objectFit='cover'
                src="https://res.cloudinary.com/dz4wzkogr/image/upload/v1671700663/Econt/icon_inrkib.png"
            />

            <Box
                display='flex'
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Text
                    fontSize={'lg'}
                    onClick={() => navigate('/home')}
                    mr={5}
                    cursor={'pointer'}
                    _hover={{ color: 'gray' }}
                >
                    Home
                </Text>
                <Text
                    fontSize={'lg'}
                    onClick={() => navigate('/services')}
                    mr={5}
                    cursor={'pointer'}
                    _hover={{ color: 'gray' }}
                >
                    Service
                </Text>
                <Text
                    fontSize={'lg'}
                    onClick={() => navigate('/about')}
                    mr={5}
                    cursor={'pointer'}
                    _hover={{ color: 'gray' }}
                >
                    About Us
                </Text>
                <Text
                    fontSize={'lg'}
                    onClick={() => navigate('/contact')}
                    cursor={'pointer'}
                    _hover={{ color: 'gray' }}
                >
                    Contact Us
                </Text>
            </Box>

            <Box
                display='flex'
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Text
                    borderRadius={'md'}
                    p={0.5}
                    color='black'
                    mr={5}
                    border={'1px solid black'}
                >
                    {user ? user.name : ""}
                </Text>

                <Button
                    size='sm'
                    onClick={logout}
                    bg='#FF00FF'
                    _hover={{ bg: '#cc00cc' }}
                    color='white'
                >
                    Log out
                </Button>
            </Box>
        </Box>
    )
}

export default NavBar