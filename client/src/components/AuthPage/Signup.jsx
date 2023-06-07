import { useState } from 'react'
import { useToast, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Stack, Radio, RadioGroup, Flex, Select } from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setLogin } from '../../State/UserSlice';

const Signup = () => {
    const [value, setValue] = useState('customer')
    const [showP, setShowP] = useState(false)
    const [showCP, setShowCP] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()
    const [city, setCity] = useState()
    const [workType, setWorktype] = useState("none")
    const [shopAddress, setShopAddress] = useState()
    const [loading, setLoading] = useState(false)
    const [pic, setPic] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => setShowP(!showP)
    const handleClicks = () => setShowCP(!showCP)

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }

        if (pics.type === "image/jpg" || pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "econtractor");
            data.append("cloud_name", "dp0bupkuf");
            fetch("https://api.cloudinary.com/v1_1/dp0bupkuf/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
            return;
        }
    }

    const submitHandler = async () => {
        setLoading(true);

        if (!name || !email || !password || !cPassword || !city) {
            toast({
                title: "Please fill all the fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
            return;
        }
        if (password !== cPassword) {
            toast({
                title: "Password doesn't match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            if (value === 'vendor') {
                if (workType === "none" || !shopAddress) {
                    toast({
                        title: "Please fill all the fields!",
                        status: "warning",
                        duration: 2000,
                        isClosable: true,
                        position: "bottom"
                    });
                    setLoading(false)
                    return;
                }
            }
            const { data } = await axios.post("http://localhost:3009/api/user", { name, city, email, password, value, pic, workType, shopAddress }, config);

            toast({
                title: "Registration Successful!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            });
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token
                })
            );
            setLoading(false);
            navigate("/home");
        } catch (err) {
            setLoading(false);
            toast({
                title: err.response.data,
                status: "error",
                duration: 6000,
                isClosable: true,
                position: "bottom"
            });

            return;
        }
    }

    return (
        <VStack spacing="5px">
            <Flex justify={'space-between'} w='100%'>
                <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        autoComplete="off"
                        w="95%"
                        placeholder="Enter your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <Input
                        autoComplete="off"
                        w="99%"
                        placeholder="Enter your Name"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </FormControl>
            </Flex>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    autoComplete="off"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showP ? 'text' : 'password'}
                        placeholder="Enter your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {showP ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup mb={5}>
                    <Input
                        type={showCP ? 'text' : 'password'}
                        placeholder="Confirm Your Password"
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClicks}>
                            {showCP ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <RadioGroup onChange={setValue} value={value}>
                <Stack mb={5} direction='row'>
                    <Radio mr={3} value='vendor'>vendor</Radio>
                    <Radio value='customer'>customer</Radio>
                </Stack>
            </RadioGroup>

            {value === 'vendor'
                ?
                <>
                    <FormControl id="pic">
                        <FormLabel>Upload your Picture</FormLabel>
                        <Input
                            type="file"
                            p={1.5}
                            accept="image/*"
                            onChange={(e) => postDetails(e.target.files[0])}
                        />
                    </FormControl>

                    <FormControl id="work-type" isRequired>
                        <FormLabel>Work Type</FormLabel>
                        <Select value={workType} onChange={(e) => setWorktype(e.target.value)}>
                            <option value="none">Select a format</option>
                            <option value="contractor">Contractor</option>
                            <option value="painters">Painter</option>
                            <option value="electrician">Electrician</option>
                            <option value="carpenter">Carpenter</option>
                            <option value="plumber">Plumber</option>
                            <option value="bricks">Bricks</option>
                            <option value="sand">Sand</option>
                            <option value="welder">Welder</option>
                            <option value="flooring">Flooring</option>
                        </Select>
                    </FormControl>

                    <FormControl id="shop-address" isRequired>
                        <FormLabel>Shop Address</FormLabel>
                        <Input
                            autoComplete="off"
                            placeholder="Enter your Shop Address"
                            onChange={(e) => setShopAddress(e.target.value)}
                        />
                    </FormControl>
                </>
                :
                ""
            }

            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup