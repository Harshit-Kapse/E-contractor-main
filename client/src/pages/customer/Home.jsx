import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import HomeContent from '../../components/Home/Content'
import Footer from '../../components/Footer';
import Perks from '../../components/Home/Perks';
import Testimonials from '../../components/Home/Testimonials';
import { Box } from '@chakra-ui/react';

const Home = () => {

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
        <Box w='100%' h='100%'>

            <NavBar />
            <HomeContent />
            <Perks />
            <Testimonials />
            <Box pb='2rem'>
                <Footer />
            </Box>

        </Box>
    )
}

export default Home