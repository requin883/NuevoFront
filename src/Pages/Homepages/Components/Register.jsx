import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../../settings/settings";
import endpointList from "../../../../settings/endpoints";
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
  Center
} from '@chakra-ui/react'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  valpass: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "the password confirmation does not match"),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  address: yup.string().required(),
});

function Register(props) {
  const { isOpen, onClose } = props.val;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fnSend = async (data) => {
    
    try {
      let registeredFlag = await API_AXIOS.get(
        endpointList.findEmail + `?email=${data.email}`
      );

      if (registeredFlag.data == 0) {alert("no hay un email registrado");
        await API_AXIOS.post(endpointList.register +`?email=${data.email}&names=${data.firstname}&lastnames=${data.lastname}&address=${data.address}&password=${data.password}` );} 
        else {
        alert("hay un email registrado");}


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
              <Button colorScheme="purple" mt="1em" type="submit" value="register">Register</Button>
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

export default Register;
