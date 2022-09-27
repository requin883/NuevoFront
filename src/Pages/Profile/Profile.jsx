import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Card, Container, Button, CardTitle, CardBody, CardHeader, CardText, CardGroup } from "reactstrap";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProtectedRoute from "../../ProtectedRoute";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import Balance from "./Components/Balance";
import DepositHistory from "./Components/DepositHistory";
import PaymentHistory from "./Components/PaymentHistory";


export default function Profile() {
    const [paymentFlag, setPaymentFlag] = useState(false);
    const [depositFlag, setDepositFlag] = useState(false);
    const [balanceFlag, setBalanceFlag] = useState(false);

    const navigate = useNavigate();

    let [email, setEmail] = (useState(window.localStorage.getItem("userEmailHP")))

    // let [userLogin, setUserLogin] = useLocalStorage('user', "")
    // datos personales
    // balance
    // historial de pagos
    // historial de depositos

    const cbMenu = (nm) => {
        const handleClick = () => {
            nm.opt == 'ph' ? setPaymentFlag(true) :
                nm.opt == 'dh' ? setDepositFlag(true) :
                    nm.opt == 'pr' ? setBalanceFlag(true) : "";
            navigate(nm.links)
        }
        return (<Button key={nm.options} className="btn-menu m-3 p-3 text-dark" color="info" onClick={handleClick} size="lg" >
            <Card key={nm.options} style={{ width: "30vw" }}>
                <CardHeader>
                    <CardTitle>{nm.options}<i className={`${nm.ico} text-dark ms-3`} style={{ fontSize: "1.5rem" }}></i></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText className="fs-6">
                        {nm.txt}
                    </CardText>
                </CardBody>
            </Card>
        </Button>)
    }

    // useEffect(() => {
    //     let date = new Date()
    //     setUserLogin(date);

    //     // console.log(balance)

    // }, [])

    let menu = [

        { links: '/profile/paymenthistory', options: "Payments' history", opt: "ph",txt: 'To validate the payments history' , ico: 'bi bi-wallet' },
        { links: '/profile/deposithistory', options: "Deposits' history", opt: "dh",txt: 'To validate the deposits history' ,ico:'bi bi-cash-coin' },
        { links: '/profile/balance', options: "Users' balance", opt: "pr", txt:'To see the your account\'s current balance', ico:'bi bi-piggy-bank' },
        { links: '/menu', options: "Return to menu", txt:'Go back to the main menu', ico:'bi bi-backspace-fill' }

    ]

    return (
        <>
            <ExamplesNavbar env="pro" />
            <Container className="linkscontainer d-flex flex-column">
                <h1 className="text-center text-decoration-underline pb-3">Menu</h1>
                <CardGroup className="d-flex justify-content-center">
                    {menu.map(cbMenu)}
                </CardGroup>
            </Container>
            <Container>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path='/paymenthistory' element={<PaymentHistory val={{ paymentFlag, setPaymentFlag }} from="profile" />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/deposithistory" element={<DepositHistory val={{ depositFlag, setDepositFlag }} />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/balance" element={<Balance val={{ balanceFlag, setBalanceFlag }} />} />
                    </Route>
                </Routes>
            </Container>
        </>
    )
}   