import { Avatar, Badge, Box, Button, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { FaMapMarkerAlt } from 'react-icons/fa';
import React from 'react'
import EditProfile from './EditProfile';

const Profile = ({ user }) => {
    console.log(user);

    const LocationIcon = (props) => {
        return (
            <Icon as={FaMapMarkerAlt} {...props} />
        );
    }

    return (
        <Flex
            border='2px solid black'
            w='80%' h='90vh' bg='#e7e7e7'
            flexDir={'column'} p={5}
            borderRadius={'xl'}
            justify={'space-between'}
            align={'center'}
        >
            <Flex w='80%' flexDir={'column'} p={10} bg='white' borderRadius={'3xl'}>
                <Flex id='avatar' justify={'center'} mb={5}>
                    <Avatar size='2xl' src={user.img} />
                </Flex>

                <Flex id='name' justify={'center'} mb={8}>
                    <Flex flexDir={'column'} align='center' w='fit-content'>
                        <Heading fontSize="5xl" mb={3}>{user.name}</Heading>
                        <Badge
                            px={2} py={1}
                            w='fit-content'
                            borderRadius="lg"
                            mb={3} variant="solid"
                            border={'1px solid black'}
                            letterSpacing={'1px'}
                        >
                            {user.workType}
                        </Badge>
                    </Flex>
                </Flex>

                <Grid id='location' mb={8} gap={6} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} p={2}>
                    <Box ml='30%'>
                        <Text fontWeight={'bold'} color='#0067ff' align='left' mb={3}>Address</Text>
                        <Flex>
                            <LocationIcon mt={1} />
                            <Text ml={2} align='left'>{user.shopAddress}</Text>
                        </Flex>
                    </Box>

                    <Box ml='40%'>
                        <Text fontWeight={'bold'} color='#0067ff' align='left' mb={3}>City</Text>
                        <Flex>
                            <LocationIcon mt={1} />
                            <Text ml={2} align='left'>{user.city}</Text>
                        </Flex>
                    </Box>
                </Grid>

                <Grid id='contact' gap={6} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} p={2}>
                    <Box ml={'30%'}>
                        <Text fontWeight={'bold'} color='#0067ff' align='left' mb={2}>Email</Text>
                        <Flex>
                            <EmailIcon mt={1} />
                            <Text ml={2} align='left' mb={3}> {user.email}</Text>
                        </Flex>
                    </Box>

                    <Box ml={'40%'}>
                        <Text fontWeight={'bold'} color='#0067ff' align='left' mb={2}>Phone Number</Text>
                        <Flex>
                            <PhoneIcon mt={1} />
                            <Text ml={2} align='left' mb={3}>6358749822</Text>
                        </Flex>
                    </Box>
                </Grid>
            </Flex>

            <EditProfile userId={user._id} />
        </Flex>
    )
}

export default Profile