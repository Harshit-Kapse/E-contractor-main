import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { AiOutlineStar } from "react-icons/ai"
import { Flex, Text } from "@chakra-ui/react";

const Star = ({ stars, total }) => {
    console.log(stars)
    const ratingStar = Array.from({ length: 5 }, (ele, index) => {
        // debugger;
        let number = index + 0.5;
        return (
            <span key={index}>
                {
                    stars >= index + 1
                        ? <FaStar color='orange' />
                        : stars >= number ? <FaStarHalfAlt color='orange' />
                            : <AiOutlineStar size={19} color='orange' />
                }
            </span>
        )
    });


    return (
        <Flex align='center' mt={1}>
            {ratingStar}
            <Text as='b' ml={2}>({total})</Text>
        </Flex>
    )
}

export default Star