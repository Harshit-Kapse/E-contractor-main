import { Box, Image, Flex, Text, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import BookModal from "./BookModal";
import { useNavigate } from "react-router-dom";
import Star from "../Stars/Star";

const Card = (props) => {

    const navigate = useNavigate();

    return (
        <Flex
            border={'2px solid black'}
            direction="column"
            align="center"
            justify="center"
            maxW="xs"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg='#d5d5d5'
            mb={5}
        >
            <Image
                borderBottom={'1px solid black'}
                w='420px' h='280px'
                objectFit='cover'
                src={props.imgsrc} alt="..."
            />

            <Box w='100%' p="6">

                <Text fontWeight="bold" fontSize="xl" mb="0">
                    {props.title}
                </Text>

                <Text fontSize="md">{props.d}</Text>

                {props.rating ?
                    <Star stars={props.rating.averageRating} total={props.rating.ratings.length} />
                    : ""
                }

                {
                    props.handleButton ?
                        <Button
                            onClick={props.handleButton}
                            size='sm'
                            mt="4"
                            bg='#FF00FF'
                            _hover={{ bg: '#cc00cc' }}
                            color='white'
                        >
                            Get Best Deal
                        </Button>
                        :
                        <Flex justify={'space-between'}>
                            <BookModal vendor={props.vendor} />
                            <Button
                                mt="3"
                                onClick={() => navigate(`/services/${props.serviceName}/${props.rating._id}`)}
                            >
                                <ViewIcon />
                            </Button>
                        </Flex>
                }

            </Box>
        </Flex>
    );
};

export default Card;