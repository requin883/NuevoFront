import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatePaySchema } from "../../Utils/yupSchemas";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react'
import { useState } from "react";


function ValidatePays(props) {
  const [spinner, setSpinner] = useState(false);
  let { isOpen, onClose } = props.val;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validatePaySchema),
  });

  const fnSend = async (data) => {
    try {
      setSpinner(true);
      alert(JSON.stringify(data));
      setSpinner(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <Center><ModalHeader> Validate payment</ModalHeader></Center>
        <ModalBody>
          <form onSubmit={handleSubmit(fnSend)}>

            <FormControl isInvalid={errors.year}>
              <FormLabel> Year </FormLabel>
              <Input id="year" placeholder="year" type="number" {...register("year")} />
              <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.month}>
              <FormLabel> Month </FormLabel>
              <Input id="month" placeholder="month" type="number" {...register("month")} />
              <FormErrorMessage>{errors.month?.message}</FormErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.day}>
              <FormLabel> Day </FormLabel>
              <Input id="day" placeholder="day" type="number" {...register("day")} />
              <FormErrorMessage>{errors.day?.message}</FormErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.hour}>
              <FormLabel> Hour </FormLabel>
              <Input id="hour" placeholder="hour" type="number" {...register("hour")} />
              <FormErrorMessage>{errors.hour?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.minute}>
              <FormLabel> Minute </FormLabel>
              <Input id="minute" placeholder="minute" type="number" {...register("minute")} />
              <FormErrorMessage>{errors.minute?.message}</FormErrorMessage>
            </FormControl>


           <FormControl isInvalid={errors.second}>
               <FormLabel> Second </FormLabel>
               <Input id="second" placeholder="second" type="number" {...register("second")}/>
                <FormErrorMessage>{errors.second?.message}</FormErrorMessage> 
           </FormControl>
           <Center>
              {spinner?<Button disabled={spinner} colorScheme="purple" mt="1.5em" type="submit" value="register"><Spinner/></Button>:<Button colorScheme="purple" mt="1.5em" type="submit" value="register">Validate</Button>}
            </Center>
            <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )

}

export default ValidatePays;