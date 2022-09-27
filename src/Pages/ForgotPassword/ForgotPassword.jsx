
import API_AXIOS from "../../../settings/settings";
import * as yup from "yup"
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, set } from "react-hook-form";
import endpointList from "../../settings/endpoints";
import { Card, CardBody, CardFooter, Alert, CardHeader, CardTitle, Container, Form, FormGroup, Label, Input, Button, FormFeedback, Spinner } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import { useState } from "react";

const schema = yup.object().shape({
    password: yup.string().min(6).required(),
    valpass: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "the password confirmation does not match"),
})

function ForgotPassword() {

    const navigate = useNavigate();

    const redirectUser = () => {
        navigate("/home");
    }

    const { token } = useParams();

    const [spinner, setSpinner] = useState(false);

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [newAlert, setNewAlert] = useState(false);

    const [msg, setMsg] = useState(false);

    const [color, setColor] = useState("success");

    const handleShowAlert = () => {
        setNewAlert(true);
        setTimeout(() => {
            setNewAlert(false);
        }, 3000);
        setSpinner(false);
        reset();
    }
    const params = useParams();

    const fnSend = async (data) => {
        setSpinner(true);
        let output = await API_AXIOS.post(endpointList.forgotPassword + `?newPassword=${data.password}&token=${token}`)
        if (output.data == 1) {
            setMsg("The password has been changed");
            handleShowAlert();
            redirectUser();
        } else {
            setColor("danger");
            setMsg("An error has ocurred. Please go back to login page to request a new link sent out to your email address");
            handleShowAlert();
        }
    }

    return (
        <Container>
            <ExamplesNavbar />
            <Container className="text-dark" style={{ marginTop: "30vh" }}>
                <Card>
                    <CardHeader className="text-center" >
                        <Alert isOpen={newAlert} color={color}>
                            {msg}
                        </Alert>
                        <CardTitle className="p-4" style={{ fontWeight: "bold", fontSize: "4vh" }}>Update Password</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit(fnSend)}>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { ref, ...passProps } }) => (
                                    <FormGroup floating>
                                        <Input
                                            name="password"
                                            placeholder="Password"
                                            type="password"
                                            id="password"
                                            invalid={errors.password ? true : false}
                                            innerRef={ref} {...passProps}
                                        />


                                        {errors?.password && (
                                            <FormFeedback>{errors.password?.message}</FormFeedback>
                                        )}
                                        <Label for="password"> Password </Label>

                                    </FormGroup>

                                )}
                            />

                            <Controller
                                control={control}
                                name="valpass"
                                render={({ field: { ref, ...valpassProps } }) => (
                                    <FormGroup floating>
                                        <Input

                                            name="valpass"
                                            placeholder="Confirm password"
                                            type="password"
                                            id="valpass"

                                            invalid={errors.valpass ? true : false}
                                            innerRef={ref} {...valpassProps}
                                        />


                                        {errors?.valpass && (
                                            <FormFeedback>{errors.valpass?.message}</FormFeedback>
                                        )}
                                        <Label for="valpass"> Confirm Password </Label>
                                    </FormGroup>
                                )}
                            />
                            <Container className="text-center">
                                {spinner ? <Button className="btn-menu text-light" disabled={spinner} color="info"><Spinner /></Button> : <Button className="btn-menu text-light" type="submit" color="info"> Update now!</Button>}
                            </Container>
                        </Form>
                    </CardBody>
                    <CardFooter className="text-center">

                    </CardFooter>
                </Card>
            </Container>
        </Container>
    )

}

export default ForgotPassword;