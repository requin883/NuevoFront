import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Card, Container, Button, CardTitle, CardBody } from "reactstrap";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProtectedRoute from "../../ProtectedRoute";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import Balance from "./Components/Balance";
import DepositHistory from "./Components/DepositHistory";
import PaymentHistory from "./Components/PaymentHistory";


export default function Profile() {
    // const [paymentFlag, setPaymentFlag] = useState(false);
    // const [depositFlag, setDepositFlag] = useState(false);
    // const [balanceFlag, setBalanceFlag] = useState(false);

    // let [email, setEmail] = (useState(window.localStorage.getItem("userEmailHP")))

    // let [userLogin, setUserLogin] = useLocalStorage('user', "")
    // datos personales
    // balance
    // historial de pagos
    // historial de depositos

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == "Payments' history" ? () => setBalanceFlag(true) : nm.options == "Deposits' history" ? () => setDepositFlag(true) : () => setPaymentFlag(true)} size="lg"> <Link style={{ color: "white", textDecoration: 'none' }} key={nm.options} to={nm.links}>  {nm.options} </Link> </Button>)
    }




    // useEffect(() => {
    //     let date = new Date()
    //     setUserLogin(date);

    //     // console.log(balance)

    // }, [])

    let menu = [

        { links: '/profile/paymenthistory', options: "Payments' history" },
        { links: '/profile/deposithistory', options: "Deposits' history" },
        { links: '/profile/balance', options: "Users' balance" },
        { links: '/menu', options: "Return to menu" }

    ]

    return (
        <>
            <ExamplesNavbar />
            <Card className="profileCard">
                <CardBody>
                    <CardTitle>
                        <h2>User data </h2>
                        {/* <h3> Email: {email} </h3> */}
                    </CardTitle>
                    <Container className="d-flex justify-content-evenly mb-3">
                        {menu.map(cbMenu)}
                    </Container>
                    <Container>
                        <Routes>
                            {/* <Route element={<ProtectedRoute />}> */}
                            <Route path='/paymenthistory' element={<PaymentHistory />} />
                            {/* </Route> */}
                            {/* <Route element={<ProtectedRoute />}> */}
                            <Route path="/deposithistory" element={<DepositHistory />} />
                            {/* </Route> */}
                            {/* <Route element={<ProtectedRoute />}> */}
                            <Route path="/balance" element={<Balance />} />
                            {/* </Route> */}
                        </Routes>
                    </Container>
                </CardBody>
            </Card>
        </>
    )
}