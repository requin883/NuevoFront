import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    FormFeedback,
    Input,
    Label,
    FormGroup,
    Container,
    ModalFooter,
    Spinner,
    Alert,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPwSchema } from '../../../Utils/yupSchemas';
import API_AXIOS from '../../../settings/settings';
import endpointList from '../../../settings/endpoints';
import { useState } from 'react';


function EmailAlert(props) {
    
    const [spinner, setSpinner] = useState(false);

    const [msg, setMsg] = useState("");

    const [color, setColor] = useState("primary");

    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = (color) => {
        setColor(color);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
        setSpinner(false);
        reset();
    }

    const { valFlag, setValFlag } = props.val;

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(forgetPwSchema),
    });


    const { ref, ...emailField } = register("email");

    const fnSend = async (data) => {
        setSpinner(true);
        let { email } = data;
        let info = await API_AXIOS.post(`${endpointList.sendForgot}?email=${email}`);
        switch (info.data) {
            case 0:
                setMsg("The user is not registered in our database")
                handleShowAlert("danger");
                break;
            case 1:
                setMsg("The user is not verified, you need to verify your account in order to access this feature")
                handleShowAlert("danger");
                break;
            case 2:
                setMsg("An email has been sent to your account with further information to recover your password")
                handleShowAlert("success");
                break;
            default:
                setMsg("An error has occured, please try again");
                handleShowAlert("danger");
                break;
        }
    }

    return (
        <Modal isOpen={valFlag} size="md" className="text-dark">
            <Container className="text-black">
                <Alert className="m-2" fade isOpen={showAlert} color={color}>
                    {msg}
                </Alert>
                <ModalHeader>
                    Forgot Password
                </ModalHeader>
            </Container>
            <ModalBody>
                <Form className="text-center" onSubmit={handleSubmit(fnSend)}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { ref, ...emailField } }) => (
                            <FormGroup floating>
                                <Input
                                    bsSize="sm"
                                    name="email"
                                    placeholder="email"
                                    type="email"
                                    invalid={errors.email ? true : false}
                                    innerRef={ref} {...emailField}
                                />

                                <Label for="email"> Email </Label>
                                {errors?.email && (
                                    <FormFeedback>{errors.email?.message}</FormFeedback>
                                )}
                            </FormGroup>
                        )}
                    />
                    {spinner ? <Button mt="2em" disabled={spinner} className="btn-menu text-light" color="info" type="submit"><Spinner /></Button> : <Button mt="2em" className="btn-menu text-light" color="info" type="submit">Enviar</Button>}
                </Form>
            </ModalBody>
            <ModalFooter><Button disabled={spinner} onClick={() => setValFlag(false)} className="btn-menu text-light" color="info" >X</Button></ModalFooter>
        </Modal>
    )
}


export default EmailAlert;
