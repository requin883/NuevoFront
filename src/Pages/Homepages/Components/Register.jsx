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
console.log(registerSchema);

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
            <FormGroup>
              <Label for="email"> Email </Label>
              <Input id="email" placeholder="Email" type="email" invalid={errors?.email} {...register("email")} />
              {errors?.email &&
                <FormFeedback>{errors.email?.message}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="password"> Password </Label>
              <Input id="password" placeholder="Password" type="password" invalid={errors?.password} {...register("password")} />
              {errors?.password &&
                <FormFeedback>{errors.password?.message}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="valpass"> Confirm password </Label>
              <Input id="valpass" placeholder="Password" type="password" invalid={errors?.valpass} {...register("valpass")} />
              {errors?.valpass &&
                <FormFeedback>{errors.valpass?.message}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="firstname"> First name </Label>
              <Input id="firstname" placeholder="First name" type="text" invalid={errors?.firstname} {...register("firstname")} />
              {errors.firstname &&
                <FormFeedback> {errors.firstname?.message}</FormFeedback>}
            </FormGroup>

            <FormGroup >
              <Label for="Lastname"> Last name </Label>
              <Input id="lastname" placeholder="Last name" type="text" invalid={errors?.lastname} {...register("lastname")} />
              {errors.lastname &&
                <FormFeedback> {errors.lastname && errors.lastname?.message}</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="Address"> address </Label>
              <Input type="textarea" id="address" placeholder="Address" invalid={errors?.address}  {...register("address")} />
              {errors.address &&
                <FormFeedback> {errors.address?.message} </FormFeedback>}
            </FormGroup>
            <Container className="text-center">
             <Button type="submit" value="register">Register</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default Register;
