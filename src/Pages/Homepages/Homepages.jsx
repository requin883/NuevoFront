import { Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Container, Row } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import Card from "../Homepages/Components/Card";
import Message from "../Homepages/Components/Message";
import DefaultFooter from "../Homepages/Components/Footer";

function Homepages() {

    let menu = [
        { links: '/Login', options: 'Login' },
        { links: '/Register', options: 'Register' }
    ]

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == 'Login' ? onOpen : setFlag.on} colorScheme="purple" variant="ghost" size="md" className="button"> <Link key={nm.options} to={nm.links}>{nm.options}</Link> </Button>)
    }

    return (
        <>
            <ExamplesNavbar onOpen={onOpen} setFlag={setFlag} />
            <Container className="d-flex flex-column wrapper m-5">
                <Container className=" d-flex flex-column">
                    <h2 className="align-self-center title p-3">Quienes Somos?</h2>
                    <h5 className="description p-3">
                        Somos CryptoCoders una empresa enfocada en buscar una solución innovadora para
                        las billeteras digitales.
                    </h5>
                </Container>
                <Container>
                    <Container className="p-5">
                        <h2 className="title text-center">Las CryptoMonedas que aceptamos</h2>
                        <div className="CryptoCurrencies">
                            <Row>
                                <Card title="USDT" cat="StableCoin">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, nostrum!
                                </Card>
                                <Card title="BUSD" cat="Stablecoin">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, sapiente.
                                </Card>
                                <Card title="SOL" cat="CryptoCurrency">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, dicta!
                                </Card>
                                <Card title="Another" cat="CryptoCurrency">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, dolores?
                                </Card>
                            </Row>
                        </div>
                    </Container>
                </Container>
                <div className="section section-contact-us text-center">
                    <Container className="d-flex flex-column">
                        <h2 className="title">¿Cómo hago una transacción?</h2>
                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, tempore!</p>
                        <Row className="p-5 align-self-center d-flex flex-column">
                            <Message />
                        </Row>
                    </Container>
                </div>
                <DefaultFooter />
            </Container>
            <Routes>
                <Route path='/Login/*' element={<Login />} />
                <Route path='/Register' element={<Register />} />
            </Routes>
        </>
    )
}

export default Homepages;