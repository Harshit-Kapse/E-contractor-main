import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Content = () => {
    const navigate = useNavigate();

    return (
        <Box display='flex'>
            <Box>
                <Text fontSize='4xl' ml='6.4%' mt={'3.4%'} mb='3.4%'>About Us</Text>
                <Text as='b' color='#FF00FF' fontSize='3xl' ml='6.4%'>E-contractor</Text>
                <Text ml='6.4%' mt='3.4%' w='40%' align={'justify'} fontSize={'lg'}>
<<<<<<< Updated upstream
                    Econtractor is a Professional Platform. Here we will provide you only interesting content,
                    which you will like very much. We're dedicated to providing you the best of services,
                    with a focus on dependability and Find the information about people involved in construction of a building.
                    We're working to turn our passion for providing best we can into a booming online website.
                    We hope you enjoy our website as much as we enjoy offering them to you.
                    I will keep posting more important posts on my Website for all of you. Please give your support and love.
=======
>>>>>>> Stashed changes
                    
                </Text>
                <Button
                    onClick={() => navigate('/contact')}
                    bg='#FF00FF'
                    color='white'
                    _hover={{ bg: '#cc00cc' }}
                    borderRadius={'full'} ml='6.4%' mt='3.4%'
                >
                    Contact Us
                </Button>
            </Box>
            <Box>IMAGE</Box>
        </Box>
    )
}

export default Content
