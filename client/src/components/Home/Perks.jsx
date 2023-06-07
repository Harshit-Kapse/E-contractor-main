import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Perks = () => {
    return (
        <Box
            borderRadius={'xl'}
            bg='#e2e2e2'
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            h='25vh'
        >
            <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'} h='100%' w='33vw' bg='#e2e2e2'
            >
                <Text as='b' fontSize={'xl'}>AFFORDABLE SERVICES</Text>
                <Text fontSize={'xs'}>All our services are affordable</Text>
            </Box>
            <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'} h='100%' w='33vw' bg='#d5d5d5'
            >
                <Text as='b' fontSize={'xl'}>EASY TO USE AND NAVIGATE</Text>
                <Text fontSize={'xs'}>Easy interface to interact</Text>
            </Box>
            <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'} h='100%' w='33vw' bg='#e2e2e2'
            >
                <Text as='b' fontSize={'xl'}>SUPPORT 24*7</Text>
                <Text fontSize={'xs'}>You can access services at anytime</Text>
            </Box>
        </Box>
    )
}

export default Perks