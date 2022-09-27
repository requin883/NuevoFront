
import API_AXIOS from "../../../settings/settings";
import * as yup from "yup"
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import endpointList from "../../settings/endpoints";
import { Card, CardBody, CardFooter, Alert, CardHeader, CardTitle, Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import { useState } from "react";


const redirectUser = () => {
    window.location.href = "http://localhost:5173"
}


const schema = yup.object().shape({
    password: yup.string().min(6).required(),
    valpass: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "the password confirmation does not match"),
})

function ForgotPassword() {

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [newAlert, setNewAlert] = useState(false);

    const params = useParams();
    let email = params.email

    const fnSend = async (data) => {
        let output = await API_AXIOS.post(endpointList.forgotPassword + `?email=${email}&newPassword=${data.password}`)
        if (output.data == 1) {
            alert("Contraseña cambiada correctamente")
        }
    }

    return (
        <Container>
            <ExamplesNavbar />
            <Container className="text-dark" style={{ marginTop: "30vh" }}>
                <Card>
                    <CardHeader className="text-center" >
                    <Alert isOpen color="danger">
                        The token has expired. Please go back to login page to request a new link sent out to your email address
                    </Alert>
                        <CardTitle className="p-4" style={{ fontWeight: "bold" }}>Update Password</CardTitle>
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
                                        <Label for="password">Password</Label>

                                        {errors?.password && (
                                            <FormFeedback>{errors.password?.message}</FormFeedback>
                                        )}
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
                                        <Label for="valpass"> Confirm Password </Label>

                                        {errors?.valpass && (
                                            <FormFeedback>{errors.valpass?.message}</FormFeedback>
                                        )}
                                    </FormGroup>
                                )}
                            />
                        </Form>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button className="btn-menu" color="info" onClick={redirectUser}> Update now!</Button>
                    </CardFooter>
                </Card>
            </Container>
        </Container>
    )

}

export default ForgotPassword;