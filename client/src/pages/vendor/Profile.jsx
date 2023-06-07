import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import SideNav from '../../components/Vendor-Home/SideNav';
import Initial from '../../components/Vendor-Home/Initial';
import MyProfile from '../../components/Profile/Profile';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const vendor = useSelector((state) => state.vendor.vendor);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else if (user.userType === "customer") {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <div style={{ width: "100%", padding: "0px 20px 0px 20px", background: 'white' }}>
            <Box display='flex' justifyContent="space-evenly" w="100%" h='100vh' alignItems={'center'}>
                {user && <SideNav user={user} />}
                {user && (
                    !vendor ? <Initial user={user} setFalse={true} /> : <MyProfile user={user} />
                )}
            </Box>
        </div>
    )
}

export default Profile