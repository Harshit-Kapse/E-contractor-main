import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SideNav from '../../components/Vendor-Home/SideNav';
import Initial from '../../components/Vendor-Home/Initial';

const AdminPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

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
                    <Initial user={user} />
                )}
            </Box>
        </div>
    )
}

export default AdminPage