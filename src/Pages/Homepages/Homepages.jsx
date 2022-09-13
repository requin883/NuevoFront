import { Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Box, Flex, Heading, useDisclosure, Button, useBoolean } from '@chakra-ui/react';

function Homepages() {
    const [flag, setFlag] = useBoolean();
    const { isOpen, onClose, onOpen } = useDisclosure();

    let menu = [
        { links: '/Login', options: 'Login' },
        { links: '/Register', options: 'Register' }
    ]

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == 'Login' ? onOpen : setFlag.on} colorScheme="purple" size="lg" className="button"> <Link key={nm.options} to={nm.links}>{nm.options}</Link> </Button>)
    }

    return (
        <Box width="100vw" h="100vh" opacity=".9" bgImage="url(../../Public/img/cryptoMenubg1.jpg)" bgSize="cover">

            <Flex h="6em" justify="center" bgColor="black">
                <Heading fontSize="4em" color="white" fontWeight="bold">CryptoCoders</Heading>
            </Flex>

            <Flex flexDirection="column" align="center" justify="space-evenly" w="100%" h="100%">

                <Flex align="center" gap="2em">
                    {menu.map(cbMenu)}
                </Flex>

                <Routes>
                    <Route path='/Login/*' element={<Login val={{ isOpen, onClose }} />} />
                    <Route path='/Register' element={<Register flag={{ flag, setFlag }} />} />
                </Routes>

            </Flex>
        </Box>
    )
}

export default Homepages;