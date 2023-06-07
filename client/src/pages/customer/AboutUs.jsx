import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Content from '../../components/AboutUs/Content'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AboutUs = () => {
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
            <Content />
            <Footer />
        </>
    )
}

export default AboutUs