import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import AboutVendor from '../../components/Profile/AboutVendor';
import axios from 'axios';

const VendorDetails = () => {
    const [vendor, setVendor] = useState();
    const { vendorId } = useParams();

    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    const getVendor = async () => {
        const config = {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const { data } = await axios.post("http://localhost:3009/api/vendors/vendorDetails", { vendorId }, config);
        setVendor(data);
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else if (user.userType === "vendor") {
            navigate("/vendor/home");
        } else {
            getVendor();
        }
    }, [user, navigate]);

    return (
        <>
            <NavBar />

            {vendor && <AboutVendor vendor={vendor} />}

            <Footer />
        </>
    )
}

export default VendorDetails