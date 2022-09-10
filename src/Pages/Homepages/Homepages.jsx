import { Routes, Route } from "react-router-dom";
import cbMenu from "../../callbacks/cbMenu";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Box, Flex, Heading, useDisclosure } from '@chakra-ui/react';

function Homepages() {

    const { isOpen, onClose, onOpen } = useDisclosure();

    let menu = [
        { links: '/Login', options: 'Login' },
        { links: '/Register', options: 'Register' }
    ]

    return (
        <Box width="100vw" h="100vh" opacity=".9" bgImage="url(../../Public/img/cryptoMenubg1.jpg)" bgSize="cover">

            <Flex h="6em" textShadow="2px 3px purple" justify="center" bgColor="black">
                <Heading fontSize="4em" color="white" fontWeight="bold">CryptoCoders</Heading>
            </Flex>

            <Flex flexDirection="column" align="center" justify="space-evenly" w="100%" h="100%">

                <Flex visibility={flag ? "hidden" : "visible"} onClick={() => { onOpen(); setFlag.toggle; }} align="center" gap="2em">
                    {menu.map(cbMenu)}
                </Flex>

                <Routes>
                    <Route path='/Login' element={<Login val={{ isOpen, onClose, setFlag }} />} />
                    <Route path='/Register' element={<Register val={{ isOpen, onClose, setFlag }} />} />
                </Routes>

            </Flex>
        </Box>
    )
}

export default Homepages;