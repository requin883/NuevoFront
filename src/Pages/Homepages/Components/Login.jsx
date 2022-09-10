import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../../settings/settings";
import endpointList from "../../../../settings/endpoints";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Center,
} from '@chakra-ui/react'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

function Login(props) {
  let { isOpen, onClose } = props.val;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const fnSend = async (data) => {
    try {
      let call = await API_AXIOS.get(
        endpointList.login + `?email=${data.email}&password=${data.password}`
      );
      if (call.data == 0) {
        alert("los datos no coinciden pana");
      } else {
        alert("tamo activo menol");
        navigate('/menu')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader> Login </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(fnSend)}>

            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email"> Email </FormLabel>
              <Input id="email" placeholder="email" type="email" {...register("email")} />
              <FormErrorMessage> {errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password"> Password </FormLabel>
              <Input id="pw" placeholder="password" type="password" {...register("password")} />
              <FormErrorMessage>{errors.email && errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Center>
              <Button colorScheme="purple" mt="1.5em" type="submit" value="register">Login</Button>
            </Center>
          </form>
        </ModalBody>
        <ModalFooter>
          <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Login;
