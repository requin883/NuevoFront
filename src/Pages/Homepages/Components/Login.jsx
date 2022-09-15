import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../../settings/settings";
import endpointList from "../../../../settings/endpoints";
import { Route, Routes, useNavigate, Link as reactLink } from "react-router-dom";
import { loginSchema } from "../../../Utils/yupSchemas"
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
  Spinner,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import EmailAlert from "./EmailAlert";
import { useState } from "react";


function Login(props) {
  const [spinner, setSpinner] = useState(false);
  let { isOpen, onClose } = props.val;
  let [email, setEmail] = useLocalStorage('userEmailHP', '')
  let { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const fnSend = async (data) => {
    try {
      setSpinner(true);
      let call = await API_AXIOS.get(
        endpointList.login + `?email=${data.email}&password=${data.password}`
      );
      alert(call.data)
      switch (call.data) {
        case 0:
          alert("los datos no coinciden pana");
          break;
        case 1:
          setEmail(data.email)
          alert("tamo activo menol");
          navigate('/menu')
          break;
        case 2:
          alert("El email no esta registradoo")
          break;

        default:
          alert("error")
          break;
      }
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = () => {
    onOpen1();
    navigate('/login/forgetpassword')
  }

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
            <Flex flexDir="column" justify="center" align="center">
              {spinner ? <Button colorScheme="purple" mt="1em" type="submit" disabled={spinner} value="register"><Spinner /></Button> : <Button colorScheme="purple" mt="1em" type="submit" value="register">Login</Button>}
              <Button onClick={handlePassword} colorScheme="purple" disabled={spinner} mt="1em">Olvidaste tu contraseña</Button>
            </Flex>
          </form>
        </ModalBody>
        <ModalFooter>
          <ModalCloseButton disabled={spinner} onClick={onClose}>X</ModalCloseButton>
        </ModalFooter>
      </ModalContent>
      <Routes>
        <Route path='/forgetpassword' element={<EmailAlert val={{ isOpen1, onClose1 }} />} />
      </Routes>
    </Modal>
  );
}

export default Login;
