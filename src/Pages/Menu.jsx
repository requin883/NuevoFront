import ValidatePays from "./ValidatePays/ValidatePays"
import { Routes, Route, useNavigate } from "react-router-dom";
import { Container, Button, Card, CardText, CardTitle, Col, Row, CardGroup, CardHeader, CardBody } from "reactstrap";
import Transactions from "./Transactions/Transactions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute";
import ExamplesNavbar from "./Homepages/Components/Navbar";
import { useState } from "react";



function Menu() {
    const [valFlag, setValFlag] = useState(false);
    const [transFlag, setTransFlag] = useState(false);
    const [profileFlag, setProfileFlag] = useState(false);

    const navigate = useNavigate();

    let [userLogin, setUserLogin] = useLocalStorage('user', "")

    let menu = [
        { links: '/validatePayment', options: 'Validate Payments', opt: 'vp', txt: 'To validate a payments you\'ve made in the past', ico: 'bi bi-wallet' },
        { links: '/sendpayment', options: 'Make a transaction', opt: 'mt', txt: ' To process a new transactions', ico: 'bi bi-credit-card-fill' },
        { links: '/profile', options: 'Profile', opt: 'pf', txt: 'Go to your profile to see general information about payments and deposits', ico: 'bi bi-person-circle' },
        { links: '/home', options: 'Return to main menu', txt: 'Go back to the main menu', ico: 'bi bi-backspace-fill' }
    ]

    const cbMenu = (nm) => {
        const handleClick = () => {
            nm.opt == 'vp' ? setValFlag(true) :
                nm.opt == 'mt' ? setTransFlag(true) :
                    setProfileFlag(true);
            navigate(nm.links);
        }
        return (<Button  key={nm.options} className="btn-menu m-3 p-3 text-dark" color="info" onClick={handleClick} size="lg" >
            <Card key={nm.options} style={{width:"30vw"}}>
                <CardHeader>
                    <CardTitle>{nm.options}<i className={`${nm.ico} text-dark ms-3`} style={{fontSize:"1.5rem"}}></i></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText className="fs-6">
                        {nm.txt}
                    </CardText>
                </CardBody>
            </Card>
        </Button>)
    }
    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
    }, []);
    return (
        <>
            <ExamplesNavbar />
            <Container className="linkscontainer d-flex flex-column">
                <h1 className="text-center text-decoration-underline pb-3">Menu</h1>
                <CardGroup className="d-flex justify-content-center">
                    {menu.map(cbMenu)}
                </CardGroup>
            </Container>
            <Routes>
                <Route path="/transactions" element={<Transactions val={{ transFlag, setTransFlag }} />} />
            </Routes>
        </>
    )
}

export default Menu