import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Box } from '@chakra-ui/react'
import AllServices from '../../components/Services/AllServices'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Services = () => {
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

            <AllServices />

            <Box pb='3.5rem'>
                <Footer />
            </Box>
        </>
    )
}

export default Services