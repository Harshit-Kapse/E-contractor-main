import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeContent = () => {
    const navigate = useNavigate();

    return (
        <Box
            w='100%'
            h='66vh'
            display='flex'
            justifyContent='space-between'
            alignItems={'center'}
        >
            <Box id='Intro' ml={'100px'}>
                <Text
                    fontSize={'3xl'}
                >
                    Find the perfect vendor for your
                </Text>
                <Text
                    mb={2}
                    fontSize={'2xl'}
                >
                    project with our easy-to-use
                </Text>

                <Text
                    as='b'
                    color='#FF00FF'
                    fontSize={'4xl'}
                >
                    E-contractor
                </Text>

                <Text
                    mt={2.5}
                    fontSize={'lg'}
                >
                    Get the job done right
                </Text>

                <Button
                    onClick={() => navigate('/services')}
                    bg='#FF00FF'
                    color='white'
                    _hover={{ bg: '#cc00cc' }}
                    mt={5}
                    borderRadius={'full'}
                >
                    Get Started
                </Button>
            </Box>

            <Flex id='Image' mr={'100px'} h="100%">
                <Image
                    mt={'10%'}
                    borderRadius={'lg'}
                    boxSize={'250px'}
                    src="https://res.cloudinary.com/dz4wzkogr/image/upload/v1671899811/Econt/flooring3_lidqer.jpg"
                />
                <Image
                    borderRadius={'lg'}
                    mt={'35%'}
                    ml={3}
                    boxSize={'250px'}
                    src="https://res.cloudinary.com/dz4wzkogr/image/upload/v1671899810/Econt/flooring2_b23vks.jpg"
                />
            </Flex>
        </Box>
    )
}

export default HomeContent