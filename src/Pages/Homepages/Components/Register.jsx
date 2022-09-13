import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../../settings/settings";
import endpointList from "../../../../settings/endpoints";
import { registerSchema } from "../../../Utils/yupSchemas";
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
  Textarea,
  Center,
  Spinner
} from '@chakra-ui/react'
import { useState } from "react";


function Register(props) {
  const [spinner, setSpinner] = useState(false);
  const { flag, setFlag } = props.flag;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const fnSend = async (data) => {
    try {
      setSpinner(true);
      let registeredFlag = await API_AXIOS.get(
        endpointList.findEmail + `?email=${data.email}`
      );
      console.log(registeredFlag.data);
      if (registeredFlag.data == 0) {
        await API_AXIOS.post(endpointList.register + `?email=${data.email}&names=${data.firstname}&lastnames=${data.lastname}&address=${data.address}&password=${data.password}`);
        alert("Su cuenta ha sido creada satisfactoriamente, por favor revise su correo para verificar la cuenta");
      }
      else {
        alert("Ya hay una cuenta con este email registrado");
      }
      reset();
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={flag} size="lg">
      <ModalContent>
        <ModalHeader> Register </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(fnSend)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email"> Email </FormLabel>
              <Input id="email" placeholder="Email" type="email" {...register("email")} />
              <FormErrorMessage> {errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password"> Password </FormLabel>
              <Input id="pw" placeholder="Password" type="password" {...register("password")} />
              <FormErrorMessage>{errors.email && errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.valpass}>
              <FormLabel htmlFor="valpass"> Confirm password </FormLabel>
              <Input id="pw2" placeholder="Password" type="password" {...register("valpass")} />
              <FormErrorMessage>{errors.valpass && errors.valpass?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.firstname}>
              <FormLabel htmlFor="firstName"> First name </FormLabel>
              <Input id="firstName" placeholder="First name" type="text" {...register("firstname")} />
              <FormErrorMessage> {errors.firstname?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.lastname}>
              <FormLabel htmlFor="LastName"> Last name </FormLabel>
              <Input id="lastName" placeholder="Last name" type="text" {...register("lastname")} />
              <FormErrorMessage> {errors.lastname && errors.lastname?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.address}>
              <FormLabel htmlFor="Address"> address </FormLabel>
              <Textarea id="address" placeholder="Address"  {...register("address")} />
              <FormErrorMessage> {errors.address?.message} </FormErrorMessage>
            </FormControl>
            <Center>
              {spinner?<Button disabled={spinner} colorScheme="purple" mt="1em" type="submit" value="register"><Spinner/></Button>:<Button colorScheme="purple" mt="1em" type="submit" value="register">Register</Button>}
            </Center>
          </form>
        </ModalBody>
        <ModalFooter>
          <ModalCloseButton disabled={spinner} onClick={setFlag.off}>X</ModalCloseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Register;
