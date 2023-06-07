import { Flex } from "@chakra-ui/react";
import Card from "./Card.jsx";
import data from "./data.js"
import { useNavigate } from "react-router-dom";

const Service = () => {
    const navigate = useNavigate();

    return (
        <Flex m={5} align="center" justifyContent={'center'}>
            <Flex justify="center" align="center" mt={3} w='90%'>
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
                    {data.map((val, index) => {
                        return (
                            <Card
                                key={index}
                                imgsrc={val.imgsrc}
                                title={val.title}
                                d={val.d}
                                handleButton={() => navigate(`/services${val.link}`)}
                            />
                        );
                    })}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Service;
