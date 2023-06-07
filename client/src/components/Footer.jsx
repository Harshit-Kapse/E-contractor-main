import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <>
            <Flex
                h='5vh'
                w='100%'
                bg='#FF00FF'
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                justify={'center'}
                align={'center'}
            >
                <Text fontSize={'lg'} color='white'>
                    2023 Copyright: Econtractor. All Rights Reserved | Terms and Conditions "Econtractor"
                </Text>
            </Flex>
        </>
    )
}

export default Footer