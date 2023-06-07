import { Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Services/Card";

const DiffService = ({ serviceName }) => {
    const token = useSelector((state) => state.user.token);

    const toast = useToast();

    const [vendors, setVendors] = useState([]);

    const getVendors = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                "http://localhost:3009/api/vendors/getVendors",
                { serviceName },
                config
            );
            setVendors(data);
        } catch (err) {
            toast({
                title: err.response.data,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    useEffect(() => {
        getVendors();
    }, []);

    return (
        <>
            <Text
                decoration={"underline"}
                fontSize={"3xl"}
                fontWeight={"extrabold"}
                mt={3}
                casing="uppercase"
                align="center"
            >
                {serviceName}
            </Text>

            <Flex m={5} align="center" justifyContent={'center'}>
                <Flex justify="center" align="center" w='90%'>
                    <Flex
                        direction="row"
                        justify="space-evenly"
                        align="center"
                        flexWrap="wrap"
                        maxWidth="1100px"
                        bg='#ffe5ff'
                        borderRadius={'2xl'}
                        p={5}
                    >
                        {vendors && vendors.length > 0 ? vendors.map((vendor) => {
                            return (
                                <Card
                                    key={vendor._id}
                                    rating={vendor}
                                    vendor={vendor.vendorInfo}
                                    serviceName={serviceName}
                                    imgsrc={vendor.vendorInfo.img}
                                    title={vendor.vendorInfo.name}
                                    d={vendor.vendorInfo.city}
                                />
                            );
                        }) :
                            <Text fontSize={'3xl'} w='100%' align='center'>No Vendors Found</Text>
                        }
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default DiffService;
