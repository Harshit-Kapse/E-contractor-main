import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/AuthPage/Login'
import Signup from '../components/AuthPage/Signup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Auth = () => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else if (user.userType === "vendor") {
            navigate("/vendor/home");
        }
    }, [user, navigate]);

    return (
        <Box h='120vh' bg='linear-gradient(to right, #0f0c29, #302b63, #24243e)' overflowY='scroll'>
            <Container maxW="xl" centerContent>
                <Box
                    boxShadow={'dark-lg'}
                    bg="white"
                    w="100%"
                    p={4}
                    mt={10}
                    borderRadius="lg"
                    borderWidth="1px"
                    color="black"
                >
                    <Tabs variant='soft-rounded'>
                        <TabList mb="1em">
                            <Tab width="50%">Login</Tab>
                            <Tab width="50%">Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Box>
    )
}

export default Auth