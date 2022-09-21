import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../../settings/endpoints";
import { registerSchema } from "../../../Utils/yupSchemas";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  FormFeedback,
  Input,
  Form,
  Button,
  Spinner
} from 'reactstrap'
import { useState } from "react";
import ExamplesNavbar from "./Navbar";


function Register() {
  const [spinner, setSpinner] = useState(false);

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
    <>
      <ExamplesNavbar />
      <Card className="d-flex regcard">
          <CardTitle className="text-center"><h1> Register</h1> </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit(fnSend)}>
              <FormGroup isInvalid={errors.email}>
                <Label for="email"> Email </Label>
                <Input id="email" placeholder="Email" type="email" {...register("email")} />
                <FormFeedback> {errors.email?.message}</FormFeedback>
              </FormGroup>

              <FormGroup isInvalid={errors.password}>
                <Label for="password"> Password </Label>
                <Input id="pw" placeholder="Password" type="password" {...register("password")} />
                <FormFeedback>{errors.email && errors.password?.message}</FormFeedback>
              </FormGroup>

              <FormGroup isInvalid={errors.valpass}>
                <Label for="valpass"> Confirm password </Label>
                <Input id="pw2" placeholder="Password" type="password" {...register("valpass")} />
                <FormFeedback>{errors.valpass && errors.valpass?.message}</FormFeedback>
              </FormGroup>

              <FormGroup isInvalid={errors.firstname}>
                <Label for="firstName"> First name </Label>
                <Input id="firstName" placeholder="First name" type="text" {...register("firstname")} />
                <FormFeedback> {errors.firstname?.message}</FormFeedback>
              </FormGroup>

              <FormGroup isInvalid={errors.lastname}>
                <Label for="LastName"> Last name </Label>
                <Input id="lastName" placeholder="Last name" type="text" {...register("lastname")} />
                <FormFeedback> {errors.lastname && errors.lastname?.message}</FormFeedback>
              </FormGroup>

              <FormGroup isInvalid={errors.address}>
                <Label for="Address"> address </Label>
                <Input type="textarea" id="address" placeholder="Address"  {...register("address")} />
                <FormFeedback> {errors.address?.message} </FormFeedback>
              </FormGroup>
              <Container className="text-center">
                {spinner ? <Button disabled={spinner} type="submit" value="register"><Spinner /></Button> : <Button type="submit" value="register">Register</Button>}
                </Container>
            </Form>
          </CardBody>
      </Card>
    </>
  );
}

export default Register;
