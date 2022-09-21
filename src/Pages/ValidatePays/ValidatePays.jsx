import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatePaySchema } from "../../Utils/yupSchemas";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Input,
  Button,
  Spinner,
  Container,
} from 'reactstrap'
import { useEffect, useState } from "react";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../../settings/endpoints";
import { useLocalStorage } from "../../hooks/useLocalStorage";



function ValidatePays(props) {
  let [userEmail, setEmail] = useState(window.localStorage.getItem("userEmailHP"));
  let [userLogin, setUserLogin] = useLocalStorage('user', "")
  const [spinner, setSpinner] = useState(false);

  let { valFlag, setValFlag } = props.val;

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
      let string = `?email=${userEmail.slice(1, userEmail.length - 1)}&year=${data.year}&month=${data.month}&day=${data.day}&hours=${data.hour}&minutes=${data.minute}&seconds=${data.second}&quantity=${data.quantity}`
      let output = await API_AXIOS.post(endpointList.verifyPayment + string)
      alert(JSON.stringify(output.data))
      setSpinner(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let date = new Date()
    setUserLogin(date)
  }, [])
  return (
    <Modal className="text-dark" isOpen={valFlag} size="lg">
      <ModalHeader className="d-flex justify-content-evenly">
        Validate payment
          <Button  disabled={spinner} close onClick={() => setValFlag(false)}></Button>
      </ModalHeader>

      <ModalBody>
        <Form onSubmit={handleSubmit(fnSend)}>

          <FormGroup isInvalid={errors.year}>
            <Label> Year </Label>
            <Input id="year" placeholder="year" type="number" {...register("year")} />
            <FormFeedback>{errors.year?.message}</FormFeedback>
          </FormGroup>


          <FormGroup isInvalid={errors.month}>
            <Label> Month </Label>
            <Input id="month" placeholder="month" type="text" {...register("month")} />
            <FormFeedback>{errors.month?.message}</FormFeedback>
          </FormGroup>


          <FormGroup isInvalid={errors.day}>
            <Label> Day </Label>
            <Input id="day" placeholder="day" type="number" {...register("day")} />
            <FormFeedback>{errors.day?.message}</FormFeedback>
          </FormGroup>


          <FormGroup isInvalid={errors.hour}>
            <Label> Hour </Label>
            <Input id="hour" placeholder="hour" type="number" {...register("hour")} />
            <FormFeedback>{errors.hour?.message}</FormFeedback>
          </FormGroup>

          <FormGroup isInvalid={errors.minute}>
            <Label> Minute </Label>
            <Input id="minute" placeholder="minute" type="number" {...register("minute")} />
            <FormFeedback>{errors.minute?.message}</FormFeedback>
          </FormGroup>


          <FormGroup isInvalid={errors.second}>
            <Label> Second </Label>
            <Input id="second" placeholder="second" type="number" {...register("second")} />
            <FormFeedback>{errors.second?.message}</FormFeedback>
          </FormGroup>

          <FormGroup isInvalid={errors.quantity}>
            <Label> Quantity </Label>
            <Input id="quantity" placeholder="quantity" type="text" {...register("quantity")} />
            <FormFeedback>{errors.quantity?.message}</FormFeedback>
          </FormGroup>
          <Container className="text-center">
          {spinner ? <Button disabled={spinner} type="submit" value="register"><Spinner /></Button> : <Button type="submit" className="text-center" value="register">Validate</Button>}
          </Container>
        </Form>
      </ModalBody>
    </Modal>
  )

}

export default ValidatePays;