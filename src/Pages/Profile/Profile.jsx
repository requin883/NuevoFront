import { Box, Center, Flex, Heading, Text, Button, useBoolean, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import Background from "../Background/Background";
import Balance from "./Components/Balance";
import DepositHistory from "./Components/DepositHistory";
import PaymentHistory from "./Components/PaymentHistory";


function Profile() {
    let [flag, setFlag] = useBoolean();
    let { isOpen, onOpen, onClose } = useDisclosure();
    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
    let [balance, setBalance] = useState()
    // datos personales
    // balance
    // historial de pagos
    // historial de depositos

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == "Payments' history" ? onOpen : setFlag.on} colorScheme="purple" size="lg" className="button"> <Link key={nm.options} to={nm.links}>  {nm.options} </Link> </Button>)
    }

    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            let { data } = await API_AXIOS.get(endpointList.getBalance + string)
            console.log(data)
            setBalance(data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getData()
        console.log(balance)
    }, [])

    let menu = [

        { links: '/profile/paymenthistory', options: "Payments' history" },
        { links: '/profile/deposithistory', options: "Deposits' history" },
        { links: '/profile/balance', options: "Users' balance" },
        {links: '/menu', options: "Return to menu"}

    ]

    return (
        <Background>
            <Box bgColor="black" w="100%" h="50%">
                <Flex color="white" justifyContent="space-between" align="center">
                    <Text fontSize="4xl" pl="2em">User data </Text>
                    <Text fontSize="2xl"> Email: {email} </Text>
                    <Text fontSize="2xl" pr="2em"> Balance {balance} </Text>
                </Flex>
                <Flex pt="1em" justify="center" align="center" gap="10">
                    {menu.map(cbMenu)}
                </Flex>
                <Box>
                    <Routes>
                        <Route path='/paymenthistory' element={<PaymentHistory val={{ isOpen, onClose }} />} />
                        <Route path="/deposithistory" element={<DepositHistory flag={{ flag, setFlag }} />} />
                        <Route path="/balance" element={<Balance/>}/>
                    </Routes>
                </Box>
            </Box>
        </Background>
    )
}
export default Profile;