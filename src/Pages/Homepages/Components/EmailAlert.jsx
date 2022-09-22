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
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPwSchema } from '../../../Utils/yupSchemas';
import API_AXIOS from '../../../settings/settings';
import endpointList from '../../../settings/endpoints';
import { useState } from 'react';


function EmailAlert(props) {
    const [spinner, setSpinner] = useState(false);

    const { flag, setFlag } = props.val;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(forgetPwSchema),
    });


    const fnSend = async (data) => {
        setSpinner(true);
        let { email } = data;
        let registeredFlag = await API_AXIOS.get(`${endpointList.findEmail}?email=${email}`);
        if (registeredFlag.data) {
            await API_AXIOS.post(`${endpointList.forgetPw}?email=${email}`)
            alert("Recibirá un correo para cambiar su contraseña");
        } else {
            alert("El correo no está registrado");
        }
        setSpinner(false);
        reset();

    }

    return (
        <Modal isOpen={flag} size="md" className="text-dark">
            <ModalHeader className="clearfix text-center text-black">
                Forgot Password
            </ModalHeader>
            <ModalBody>
                <Form className="text-center" onSubmit={handleSubmit(fnSend)}>
                    <FormGroup floating>
                        <Input name="email" id="email" placeholder="Email" type="email" {...register("email")} />
                        <Label for="email">Email</Label>
                        <FormFeedback>{errors.email?.message}</FormFeedback>
                    </FormGroup>
                    {spinner ? <Button mt="2em" disabled={spinner} colorScheme="purple" type="submit"><Spinner /></Button> : <Button mt="2em" colorScheme="purple" type="submit">Enviar</Button>}
                </Form>
            </ModalBody>
        </Modal>
    )
}


export default EmailAlert;
