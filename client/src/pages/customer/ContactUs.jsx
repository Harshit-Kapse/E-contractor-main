import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import { Box } from '@chakra-ui/react'
import Footer from '../../components/Footer'
import Form from '../../components/ContactUs/Form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ContactUs = () => {
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
        <>
            <NavBar />
            <Form />
            <Box position='absolute' bottom={0} w='100%'>
                <Footer />
            </Box>
        </>
    )
}

export default ContactUs