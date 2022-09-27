import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router-dom";
import { sendPaymentSchema } from "../../Utils/yupSchemas";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../settings/endpoints";
import { Container, Form, Label, Input, FormGroup, FormFeedback, Button, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import ProtectedRoute from "../../ProtectedRoute";
import PaymentHistory from "../Profile/Components/PaymentHistory";
import Balance from "../Profile/Components/Balance";
import { pepito } from "../../Utils/pepito";

function SendPayment() {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(sendPaymentSchema),
    });

    const navigate = useNavigate();

    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"));

    const [valCode, setValCode] = useState(false);

    const [modalAlert, setModalAlert] = useState(false);

    const [newColor, setNewColor] = useState("danger");

    const [paymentInfo, setPaymentInfo] = useState({});

    const [modalSpinner, setModalSpinner] = useState(false);

    const [msg, setMsg] = useState("The number can't be less or equal than 0");

    const [newAlert, setNewAlert] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [paymentFlag, setPaymentFlag] = useState(false);
    const [balanceFlag, setBalanceFlag] = useState(false);

    const handleAlert = () => {
        setNewAlert(true);
        setTimeout(() => {
            setNewAlert(false)
        }, 3000);
    }
    const handleModalAlert = () => {
        setModalAlert(true);
        setTimeout(() => {
            setModalAlert(false)
        }, 3000);
    }

    let [switchbtn, setSwitchBtn] = useState(true);

    let [placeholder, setPlaceholder] = useState("Add receiver email");

    const currencies = ["USDT", "BUSD", "BTC", "ETH","DOGE","BNB"];

    const fnSend = async (data) => {
        try{
        setSpinner(true);
        let sender = email;
        if (Number(data.amount) <= 0) {
            handleAlert();
            setSpinner(false);
            return;
        }
        if (!switchbtn) {
            let token = data.data;
            let currency = data.currency;
            let amount = data.amount;
            // const info = await API_AXIOS.post(`${endpointList.sendPayment}?sender=${sender}&receiver=${token}&quantity=${amount}&token=${currency}`)
            setPaymentInfo({ data });
        } else {
            let email = data.data;
            let currency = data.currency;
            let amount = data.amount;
            console.log("hello");
            const info = await API_AXIOS.post(`${endpointList.verifyPayData}?sender=${sender.slice(1, -1)}&receiver=${email}&quantity=${amount}&token=${currency}`);
            setPaymentInfo({ data });
            switch (info.data) {
                case 0:
                    setMsg("The receiver user doesn't exist");
                    handleAlert();
                    break;
                case 1:
                    setMsg("You don't have enought balance to process this transaction");
                    handleAlert();
                    break;
                case 2:
                    setMsg("You can't send money to your own account");
                    handleAlert();
                    break;
                case 4:
                case 5:
                    setValCode(true);
                    break;

                default:
                    break;
            }
        }
        setSpinner(false);
    }catch(err){
        console.log(err);
        setSpinner(false);
    }
        
    }



    const toggleBtn = () => {
        setSwitchBtn(!switchbtn);
        if (switchbtn) {
            setPlaceholder("Add receiver secret token");
        } else {
            setPlaceholder("Add receiver email");
        }
    }

    const handleVerCodeSubmit = async ({ verToken }) => {
        try{
        if (!Number.isInteger(Number(verToken))) {
            setMsg("The verification code must contain only numbers");
            handleModalAlert();
            return;
        } else {
            const info = await API_AXIOS.get(`${endpointList.verifyVerCode}?email=${email.slice(1, -1)}&code=${verToken}`);
            switch (info.data) {
                case 0:
                    setValCode(false);
                    break;
                case 2:
                    const newInfo = await API_AXIOS.post(`${endpointList.sendPayment}?sender=${email.slice(1, -1)}&receiver=${paymentInfo.data}&quantity=${paymentInfo.amount}&token=${paymentInfo.currency}&email=${email.slice(1, -1)}&code=${verToken}`);
                    switch (newInfo.data) {
                        case 0:
                            setMsg("The time to process the payment expired");
                            handleAlert();
                            break;
                        case 1:
                            setMsg("Your payment has been processed");
                            setNewColor("success");
                            handleAlert();
                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }
        }
    }catch(err){
        setSpinner(false);
        console.log(err);
    }

    }

    const navBal = () => {
        setBalanceFlag(true);
        navigate("/sendpayment/balance");
    }
    const navPayment = () => {
        setPaymentFlag(true);
        navigate("/sendpayment/paymenthistory");
    }

    const handleExport = async () => {
        let email = window.localStorage.getItem("userEmailHP");
        pepito(email.slice(1, email.length - 1));
    }

    const menuNavigate = () => {
        navigate("/menu");
    }

    return (
        <>
            <ExamplesNavbar env="pro" />
            <Modal isOpen={valCode} style={{ marginTop: "20vh" }} className="text-dark">
                <Alert isOpen={modalAlert} className="m-2 text-center" color="danger">
                    {msg}
                </Alert>
                <ModalHeader>Verification Code</ModalHeader>
                <ModalBody>
                    <h6 className="text-center pb-4">Please type the authorization code that has been sent to you email for verification purposes</h6>
                    <Form onSubmit={handleSubmit(handleVerCodeSubmit)}>
                        <Controller
                            control={control}
                            name="verToken"
                            render={({ field: { ref, ...verTokenProps } }) => (
                                <FormGroup floating>
                                    <Input
                                        name="verToken"
                                        placeholder="Authorization Code"
                                        type="text"
                                        id="verToken"
                                        invalid={errors.verToken ? true : false}
                                        innerRef={ref} {...verTokenProps}
                                    />
                                    <Label for="verToken">Enter verification Code</Label>
                                    {errors?.verToken && (
                                        <FormFeedback>{errors.verToken?.message}</FormFeedback>
                                    )}
                                </FormGroup>
                            )}
                        />
                        <Container className="d-flex justify-content-center">
                            {modalSpinner ? <Button className="btn-menu" color="info"><Spinner /></Button> : <Button className="btn-menu" color="info">Verify Code</Button>}
                        </Container>
                    </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

            <Container className="cont flex-column d-flex justify-content-between">
                <Alert isOpen={newAlert} className="m-2 text-center" color={newColor}>
                    {msg}
                </Alert>
                <Container className="d-flex justify-content-between" style={{ marginTop: "5em" }}>
                    <Container >
                        <Container className="d-flex flex-column gap-3">
                            <Container className="bg-light text-dark rounded">
                                <h1 className="text-center pt-3">Payment Types</h1>
                                <ul>
                                    <li>Public: Used to send payments by email address</li>
                                    <li className="pb-3">Private: Used to send payments with secret token </li>
                                </ul>
                            </Container>
                            <Button disabled={spinner} color="info" onClick={navBal} className="p-3 btn-menu text-light">Show Balance</Button>
                            <Button disabled={spinner} color="info" onClick={navPayment} className="p-3 btn-menu text-light">Show Payment History</Button>
                            <Button disabled={spinner} color="info" onClick={handleExport} className="p-3 btn-menu text-light">Show Export payments to Excel</Button>
                            <Button disabled={spinner} color="info" onClick={menuNavigate} className="p-3 btn-menu text-light">Return to Menu</Button>
                        </Container>
                    </Container>
                    <div className="separator"></div>
                    <Container className="d-flex flex-column align-items-center">
                        <h1 className="text-center"> Send Payment </h1>
                        <FormGroup switch className="ms-auto">
                            <Input type="switch" disabled={spinner} onChange={toggleBtn} role="switch" />
                            <Label check>{switchbtn ? "Public" : "Secret"}</Label>
                        </FormGroup>
                        <Form onSubmit={handleSubmit(fnSend)}>
                            <Controller
                                control={control}
                                name="data"
                                render={({ field: { ref, ...dataProps } }) => (
                                    <FormGroup>
                                        <Label for="data"> {placeholder} </Label>
                                        <Input
                                            disabled={spinner}
                                            className="controlledInput"
                                            name="data"
                                            placeholder={placeholder}
                                            type="text"
                                            id="data"

                                            invalid={errors.data ? true : false}
                                            innerRef={ref} {...dataProps}
                                        />
                                        {errors?.data && (
                                            <FormFeedback>{errors.data?.message}</FormFeedback>
                                        )}
                                    </FormGroup>
                                )}
                            />
                            <Controller
                                control={control}
                                name="amount"
                                render={({ field: { ref, ...amountProps } }) => (
                                    <FormGroup>
                                        <Label for="amount"> Amount  </Label>
                                        <Input
                                            disabled={spinner}
                                            name="amount"
                                            placeholder="Put amount"
                                            type="text"
                                            id="amount"

                                            invalid={errors.amount ? true : false}
                                            innerRef={ref} {...amountProps}
                                        />


                                        {errors?.amount && (
                                            <FormFeedback>{errors.amount?.message}</FormFeedback>
                                        )}
                                    </FormGroup>
                                )}
                            />

                            <Controller
                                defaultValue="usdt"
                                control={control}
                                name="currency"
                                render={({ field: { ref, ...currencyProps } }) => (
                                    <FormGroup>
                                        <Label for="Currency"> Currency </Label>
                                        <Input

                                            name="currency"
                                            placeholder="Select currency"
                                            type='select'
                                            id="currency"
                                            disabled={spinner}
                                            invalid={errors.currency ? true : false}
                                            innerRef={ref} {...currencyProps}
                                        >
                                            <optgroup label="Choose a currency">
                                                {currencies?.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        </Input>


                                        {errors?.currency && (
                                            <FormFeedback>{errors.currency?.message}</FormFeedback>
                                        )}
                                    </FormGroup>
                                )}
                            />
                            <Container className="text-center">
                                {spinner ? <Button color="info" disabled={spinner} className="btn-menu text-light" type="submit"><Spinner /></Button> : <Button color="info" className="btn-menu text-light" type="submit">Send Payment</Button>}
                            </Container>
                        </Form>
                    </Container>
                </Container>
            </Container>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/paymenthistory' element={<PaymentHistory val={{ paymentFlag, setPaymentFlag }} from="sendp" />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/balance" element={<Balance val={{ balanceFlag, setBalanceFlag }} />} />
                </Route>
            </Routes>
        </>
    )
}

export default SendPayment;