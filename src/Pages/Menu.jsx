import ValidatePays from "./ValidatePays/ValidatePays"
import { Routes, Route } from "react-router-dom";
import cbMenu from "../callbacks/cbMenu";
import { Flex, Center, useDisclosure } from "@chakra-ui/react";
import Profile from "./Profile/Profile";

function Menu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let menu = [
        { links: '/menu/validatepay', options: 'Validate Payments' },

        { links: '/menu/profile', options: 'Profile' }
    ]

    return (
        <Flex justify="center" width="100vw" h="100vh" opacity=".9" bgImage="url(../../Public/img/cryptoMenubg1.jpg)" bgSize="cover">
            <Center onClick={onOpen}>
                {menu.map(cbMenu)}
            </Center>
            <ValidatePays val={{ isOpen, onClose }} />
            <Routes>
                <Route path="/profile/*" element={<Profile />} />
            </Routes>
        </Flex>

    )
}

export default Menu