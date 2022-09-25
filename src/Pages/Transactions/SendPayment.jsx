import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Route, Routes } from "react-router-dom";
import { sendPaymentSchema } from "../../Utils/yupSchemas";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../settings/endpoints";
import { Container, Form, Label, Input, FormGroup, FormFeedback, Button } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";

function SendPayment() {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(sendPaymentSchema),
    });

    const [paymentFlag, setPaymentFlag] = useState(false);
    const [balanceFlag, setBalanceFlag] = useState(false);

    let [switchbtn, setSwitchBtn] = useState(true);

    let [placeholder, setPlaceholder] = useState("Add receiver email");

    const currencies = ["usdt", "btc", "eth", "busd"];

    const fnSend = (data) => {

        if (!switchbtn) {
            let token = data.data;
            let currency = data.currency;
            let amount = data.amount;
            alert(`Token=${token} & currency=${currency} & amount ${amount}`)
        } else {
            let email = data.data;
            let currency = data.currency;
            let amount = data.amount;
            alert(`Email=${email} & currency=${currency} & amount ${amount}`)
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

    return (
        <>
            <ExamplesNavbar />
            <Container className="cont d-flex justify-content-between">
                <Container>
                    <Container className="d-flex flex-column gap-3">
                        <Container className="bg-light text-dark rounded ">
                            <h1 className="text-center pt-3">Payment Types</h1>
                            <ul>
                                <li>Public: Uses Email</li>
                                <li className="pb-3">Private: Uses Secret Token</li>
                            </ul>
                        </Container>
                        <Button className="p-3">Show Balance</Button>
                        <Button className="p-3">Show Payment History</Button>
                        <Button className="p-3">Show Export payments to Excel</Button>
                    </Container>
                </Container>
                <div className="separator"></div>
                <Container className="d-flex flex-column align-items-center">
                    <h1 className="text-center"> Send Payment </h1>
                    <FormGroup switch className="ms-auto">
                        <Input type="switch" onChange={toggleBtn} role="switch" />
                        <Label check>{switchbtn ? "Public" : "Secret"}</Label>
                    </FormGroup>
                    {/* <Button onClick={() => setPlaceholder()}> Public </Button> <br></br>
                    <Button onClick={() => setPlaceholder()}> Secret </Button> */}

                    <Form onSubmit={handleSubmit(fnSend)}>


                        <Controller
                            control={control}
                            name="data"
                            render={({ field: { ref, ...dataProps } }) => (
                                <FormGroup>
                                    <Label for="data"> {placeholder} </Label>
                                    <Input
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

                                        name="amount"
                                        placeholder="Put amount"
                                        type="number"
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
                        <Input type="submit" value="Send Payment" />
                    </Form>
                </Container>
            </Container>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/paymenthistory' element={<PaymentHistory val={{ paymentFlag, setPaymentFlag }} />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/balance" element={<Balance val={{ balanceFlag, setBalanceFlag }} />} />
                </Route>
            </Routes>
        </>
    )
}

export default SendPayment;