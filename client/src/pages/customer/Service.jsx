import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@chakra-ui/react';
import Footer from '../../components/Footer';
import DiffService from '../../components/DiffService/DiffService';
import { useSelector } from 'react-redux';

const Service = () => {
    const { serviceName } = useParams();
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
        <Box minH='100vh'>
            <NavBar />

            <DiffService serviceName={serviceName} />

            <Box pb='3.5rem'>
                <Footer />
            </Box>
        </Box>
    )
}

export default Service
