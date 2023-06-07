import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Testimonials = () => {
    return (
        <Box w='100%' h='55vh'>
            <Text
                fontSize='4xl'
                align='center'
                color='#FF00FF'
                mt={5}
                fontWeight={'bold'}
            >
                TESTIMONIALS
            </Text>

            <Box
                mt={7}
                display='flex'
                justifyContent={'space-evenly'}
            >
                <Box
                    w='30vw'
                    h='40vh'
                    bg='#d5d5d5'
                    boxShadow={'md'}
                    borderRadius={'lg'}
                    display='flex'
                    flexDir='column'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text p={10} align={'justify'} mt={5}>
                        "I was looking for an electrician to fix a problem at my home, and I found the perfect one through this website. The booking process was so easy, and the electrician was very professional and skilled. I highly recommend this service to anyone looking for quality vendors."
                    </Text>
                    <Text as='b' color='#FF00FF' mb={5}>
                        - Jane Doe
                    </Text>
                </Box>
                <Box
                    w='30vw'
                    h='40vh'
                    bg='#e2e2e2'
                    boxShadow={'md'}
                    borderRadius={'lg'}
                    display='flex'
                    flexDir='column'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text p={10} align={'justify'} mt={5}>
                        "I needed a plumber for an emergency repair, and I found one quickly through this website. The plumber was able to come to my home within an hour, and he fixed the problem quickly and efficiently. I'm so glad I found this service."
                    </Text>
                    <Text as='b' color='#FF00FF' mb={5}>
                        - John Dove
                    </Text>
                </Box>
                <Box
                    w='30vw'
                    h='40vh'
                    bg='#d5d5d5'
                    boxShadow={'md'}
                    borderRadius={'lg'}
                    display='flex'
                    flexDir='column'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text p={10} align={'justify'} mt={5}>
                        "I found a great painter through this website and he did an amazing job on my home. The booking process was easy and the painter was very professional and friendly. I would definitely recommend this website to anyone looking for quality vendors."
                    </Text>
                    <Text as='b' color='#FF00FF' mb={5}>
                        - James Do
                    </Text>
                </Box>
            </Box>
        </Box>
        // <Box
        //     w='100%'
        //     h='65vh'
        // >
        //     <Text
        //         fontSize='4xl'
        //         align='center'
        //         color='#FF00FF'
        //         mt={5}
        //         fontWeight={'bold'}
        //     >
        //         TESTIMONIALS
        //     </Text>
        //     <Box
        //         borderRadius={'xl'}
        //         bg='#e2e2e2'
        //         display={'flex'}
        //         justifyContent={'center'}
        //         alignItems={'center'}
        //         w={'100%'}
        //         h='25vh'
        //         mt={7}
        //     >
        //         <Box
        //             display={'flex'}
        //             flexDir={'column'}
        //             justifyContent={'center'}
        //             alignItems={'center'} h='100%' w='33vw' bg='#d5d5d5'
        //         >
        //             <Text as='b' fontSize={'xl'}>AFFORDABLE SERVICES</Text>
        //             <Text fontSize={'xs'}>All our services are affordable</Text>
        //         </Box>
        //         <Box
        //             display={'flex'}
        //             flexDir={'column'}
        //             justifyContent={'center'}
        //             alignItems={'center'} h='100%' w='33vw' bg='#e2e2e2'
        //         >
        //             <Text as='b' fontSize={'xl'}>EASY TO USE AND NAVIGATE</Text>
        //             <Text fontSize={'xs'}>Easy interface to interact</Text>
        //         </Box>
        //         <Box
        //             display={'flex'}
        //             flexDir={'column'}
        //             justifyContent={'center'}
        //             alignItems={'center'} h='100%' w='33vw' bg='#d5d5d5'
        //         >
        //             <Text as='b' fontSize={'xl'}>SUPPORT 24*7</Text>
        //             <Text fontSize={'xs'}>You can access services at anytime</Text>
        //         </Box>
        //     </Box>
        // </Box>
    )
}

export default Testimonials