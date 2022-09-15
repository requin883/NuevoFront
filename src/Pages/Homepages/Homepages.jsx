import { Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Box, Flex, Heading, useDisclosure, Button, useBoolean, Center, Text } from '@chakra-ui/react';
import Background from "../Background/Background";


function Homepages() {
    const [flag, setFlag] = useBoolean();
    const { isOpen, onClose, onOpen } = useDisclosure();

    let menu = [
        { links: '/Login', options: 'Login' },
        { links: '/Register', options: 'Register' }
    ]

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == 'Login' ? onOpen : setFlag.on} colorScheme="purple" variant="ghost" size="md" className="button"> <Link key={nm.options} to={nm.links}>{nm.options}</Link> </Button>)
    }

    return (
        <Background position="relative">
            <Flex bgColor="black" justify="space-between">
                <Heading pt=".5em" pb=".5em" pl=".5em" fontSize={[0, "1em", "2em", "3em"]} color="white" fontWeight="bold">CryptoCoders</Heading>
                <Flex align="center" gap="1em" mr="2em">
                    {menu.map(cbMenu)}
                </Flex>
            </Flex>
            <Flex color="White" flexDirection="column" align="center" justify="center" position="absolute" mt="15em" ml="30em" fontStyle="italic" fontWeight="bold">
                <Text display="block" fontSize='5xl'>WELCOME</Text>
                <Text fontSize='4xl'>To CryptoCoders</Text>
            </Flex>
            <Routes>
                <Route path='/Login/*' element={<Login val={{ isOpen, onClose }} />} />
                <Route path='/Register' element={<Register flag={{ flag, setFlag }} />} />
            </Routes>
        </Background>
    )
}

export default Homepages;