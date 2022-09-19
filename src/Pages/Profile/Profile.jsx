import { Box, Center, Flex, Heading, Text, Button, useBoolean, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProtectedRoute from "../../ProtectedRoute";
import Background from "../Background/Background";
import Balance from "./Components/Balance";
import DepositHistory from "./Components/DepositHistory";
import PaymentHistory from "./Components/PaymentHistory";


function Profile() {
    let [flag, setFlag] = useBoolean();
    let { isOpen, onOpen, onClose } = useDisclosure();
    let [email, setEmail] = (useState(window.localStorage.getItem("userEmailHP")))
 
  let [userLogin, setUserLogin] = useLocalStorage('user', "") 
    // datos personales
    // balance
    // historial de pagos
    // historial de depositos

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == "Payments' history" ? onOpen : setFlag.on} colorScheme="purple" size="lg" className="button"> <Link key={nm.options} to={nm.links}>  {nm.options} </Link> </Button>)
    }


    

    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
    
       // console.log(balance)
       
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
                </Flex>
                <Flex pt="1em" justify="center" align="center" gap="10">
                    {menu.map(cbMenu)}
                </Flex>
                <Box>
                    <Routes>
                        
            <Route element={<ProtectedRoute/>}>
                    <Route path='/paymenthistory' element={<PaymentHistory val={{ isOpen, onClose }} />} />
            </Route>
            <Route element={<ProtectedRoute/>}>
                     <Route path="/deposithistory" element={<DepositHistory flag={{ flag, setFlag }} />} />
            </Route>
            <Route element={<ProtectedRoute/>}>
                    <Route path="/balance" element={<Balance/>}/>
            </Route>
   
           
                    </Routes>
                </Box>
            </Box>
        </Background>
    )
}
export default Profile;