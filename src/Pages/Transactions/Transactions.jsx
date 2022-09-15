import {
    Modal,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalOverlay,
    Button,
    Center,
    Spinner
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import endpointList from "../../../settings/endpoints"
import API_AXIOS from "../../../settings/settings"


const currencies = ["USDT", "USDC", "BUSD"]

const schema = yup.object().shape({
    email: yup.string().email().required(),
    amount: yup.number().min(0, "The amount most be possitive ").required(),
    currency: yup.string().required()
})


function Transactions(props) {

    const [spinner, setSpinner] = useState(false);
    const { flag, setFlag } = props.val;

    let [userEmail, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const fnSend = async (data) => {
        try {
            setSpinner(true);
            let string = `?sender=${userEmail.slice(1, userEmail.length - 1)}&receiver=${data.email}&quantity=${data.amount}`
            let output = await API_AXIOS.post(endpointList.sendPayment + string)
            alert(output.data)
            switch (output.data) {
                case 0:
                    alert("no existe el sender")
                    break;
                case 1:
                    alert("No tienes tanta plata")
                    break;
                case 2:
                    alert("Sender = receiver")
                    break
                case 3:
                    alert("Salio bien")
                    break;
                default:
                    alert("error")
                    break;
            }
            setSpinner(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal isOpen={flag}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
                <Center>
                    <ModalHeader>Transactions</ModalHeader>
                </Center>
                <ModalCloseButton disabled={spinner} onClick={setFlag.off} />
                <ModalBody>
                    <Text fontSize="2xl">From:{userEmail}</Text>
                    <form onSubmit={handleSubmit(fnSend)}>
                        <FormControl>
                            <FormLabel> Email of receiver</FormLabel>
                            <Input type='email' id="email" placeholder="Email" {...register("email")} />
                            <FormErrorMessage> {errors.email?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel> Currency </FormLabel>
                            <Select placeholder="select" {...register("currency")}>
                                {currencies?.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage> {errors.currency?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel> Amount of the selected currency </FormLabel>
                            <Input type="number" id="amount" placeholder="Amount" {...register("amount")} />
                            <FormErrorMessage> {errors.amount?.message} </FormErrorMessage>
                        </FormControl>
                        <Center p="0.5em">
                            {spinner ? <Button colorScheme="purple" disabled={spinner}><Spinner /></Button> : <Button colorScheme="purple" type='submit'>Confirm Transaction</Button>}
                        </Center>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default Transactions