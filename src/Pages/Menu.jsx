import ValidatePays from "./ValidatePays/ValidatePays"
import { Routes, Route, Link } from "react-router-dom";
import cbMenu from "../callbacks/cbMenu";
import { Flex, Button, useDisclosure, useBoolean } from "@chakra-ui/react";
import Profile from "./Profile/Profile";
import Transactions from "./Transactions/Transactions";
import Background from "./Background/Background";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute";

function Menu() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let [userLogin, setUserLogin] = useLocalStorage('user', "") 
    const [flag, setFlag] = useBoolean();

    let menu = [
        { links: '/menu/validatepay', options: 'Validate Payments', opt: 'vp' },
        { links: '/menu/transactions', options: 'Make a transaction', opt: 'mt' },
        { links: '/profile', options: 'Profile', opt: 'pf' },
    ]

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.opt == 'vp' ? onOpen : nm.opt == 'mt' ? setFlag.on : () => 0} colorScheme="purple" size="lg" className="button"> <Link key={nm.options} to={nm.links}>  {nm.options} </Link> </Button>)
    }
    useEffect (() => {
        let date = new Date()
              setUserLogin(date)
    }, [])
    return (
        <Background position="absolute">
            <Flex h="5em" bgColor="black" align="center" justify="center" gap="1em">
                {menu.map(cbMenu)}
            </Flex>
            <Routes>
            <Route element={<ProtectedRoute/>}>
                <Route path='/validatepay' element={<ValidatePays val={{ isOpen, onClose }} />} />
            </Route>
   
            <Route element={<ProtectedRoute/>}>
                <Route path="/transactions" element={<Transactions val={{ flag, setFlag }} />} />
            </Route>
   
            </Routes>
        </Background>
    )
}

export default Menu