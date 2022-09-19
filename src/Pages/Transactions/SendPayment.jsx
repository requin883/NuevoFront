import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendPaymentSchema } from "../../Utils/yupSchemas";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../settings/endpoints";
import { Container, Form, Label, Input, FormGroup, FormFeedback, Button } from "reactstrap";

function SendPayment() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(sendPaymentSchema),
    });

    let [placeholder, setPlaceholder] = useState("Select the type of transaction ");

    const currencies = ["usdt", "btc", "eth", "busd"];

    const fnSend = (data) => {

        if (placeholder == "Add receiver email") {
            let email = data.data
            let currency = data.currency
            let amount = data.amount
            alert(`Email=${email} & currency=${currency} & amount ${amount}`)
        } else if (placeholder == "Add receiver secret token") {
            let token = data.data
            let currency = data.currency
            let amount = data.amount
            alert(`Token=${token} & currency=${currency} & amount ${amount}`)
        } else {
            alert("Please select a type of transaction")
        }

    }


    return (

        <Container>
            <h1> Send Payment </h1>
            <Button onClick={() => setPlaceholder("Add receiver email")}> Public </Button> <br></br>
            <Button onClick={() => setPlaceholder("Add receiver secret token")}> Secret </Button>

            <Form onSubmit={handleSubmit(fnSend)}>
                <FormGroup>
                    <Label> {placeholder} </Label>
                    <Input placeholder={placeholder} type="text" {...register("data")} />
                    <FormFeedback> {errors.data?.message}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Amount" type="number" {...register("amount")} />
                    <FormFeedback> {errors.amount?.message}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input type="" placeholder="Select currency" {...register("currency")}>
                        {currencies?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Input>
                    <FormFeedback> {errors.data?.message}</FormFeedback>
                </FormGroup>


                <Input type="submit" value="Send Payment" />
            </Form>


        </Container>
    )
}

export default SendPayment;