import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

var y = new Date().getFullYear();

const schema = yup.object().shape({
    year: yup.number().min(2000).max(y).required(),
    month: yup.number().min(0).max(12).required(),
    day: yup.number().min(0).max(31).required(),
    hour: yup.number().min(0).max(24).required(),
    minute: yup.number().min(0).max(60).required(),
    second: yup.number().min(0).max(60).required()

  });
function ValidatePays(){
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fnSend = async (data) => {
try {
    alert (JSON.stringify(data));
} catch (error) {
    console.log(error)
}
  }

return(
   <div>
       <h1> Validate payment</h1>

       <form onSubmit={handleSubmit(fnSend)}>
           
           <FormControl isInvalid={errors.year}>
               <FormLabel> Year </FormLabel>
               <Input id="year" placeholder="year" type="number" {...register("year")}/>
                <FormErrorMessage>{errors.year?.message}</FormErrorMessage> 
           </FormControl>


           <FormControl isInvalid={errors.month}>
               <FormLabel> Month </FormLabel>
               <Input id="month" placeholder="month" type="number" {...register("month")}/>
                <FormErrorMessage>{errors.month?.message}</FormErrorMessage> 
           </FormControl>


           <FormControl isInvalid={errors.day}>
               <FormLabel> Day </FormLabel>
               <Input id="day" placeholder="day" type="number" {...register("day")}/>
                <FormErrorMessage>{errors.day?.message}</FormErrorMessage> 
           </FormControl>


           <FormControl isInvalid={errors.hour}>
               <FormLabel> Hour </FormLabel>
               <Input id="hour" placeholder="hour" type="number" {...register("hour")}/>
                <FormErrorMessage>{errors.hour?.message}</FormErrorMessage> 
           </FormControl>

           <FormControl isInvalid={errors.minute}>
               <FormLabel> Minute </FormLabel>
               <Input id="minute" placeholder="minute" type="number" {...register("minute")}/>
                <FormErrorMessage>{errors.minute?.message}</FormErrorMessage> 
           </FormControl>

           <FormControl isInvalid={errors.second}>
               <FormLabel> Second </FormLabel>
               <Input id="second" placeholder="second" type="number" {...register("second")}/>
                <FormErrorMessage>{errors.second?.message}</FormErrorMessage> 
           </FormControl>
           <Center>
              <Button colorScheme="purple" mt="1.5em" type="submit" value="register">Login</Button>
            </Center>
            </form>
   </div>
)

}

export default ValidatePays;