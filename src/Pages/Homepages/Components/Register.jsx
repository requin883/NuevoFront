import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../settings/settings";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { ref, ...emailField } = register("email");

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
      <Container className="w-50 text-dark">
        <Card className="d-flex regcard justify-self-center">
          <CardTitle className="pt-4 d-flex">
            <h1 className="ms-3"> Register</h1>
            <Button className="ms-auto me-3" onClick={() => navigate("/home")}>X</Button>
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit(fnSend)}>

              <FormGroup>
                <Label for="email"> Email </Label>
                <Input id="email" placeholder="Email" type="email" invalid={errors?.email?true:false} innerRef={ref} {...emailField} />
                {errors?.email &&
                <FormFeedback>{errors.email?.message}</FormFeedback>}
              </FormGroup>

                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { ref, ...passProps } }) => (
                        <FormGroup>
                          <Label for="password"> Password </Label>
                          <Input
                      
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
          
                      invalid={errors.password ? true : false}
                      innerRef={ref} {...passProps}
                    />
                      
                      
                      {errors?.password && (
                        <FormFeedback>{errors.password?.message}</FormFeedback>
                      )}
                        </FormGroup>
                      )}
                    />

             <Controller
                      control={control}
                      name="valpass"
                      render={({ field: { ref, ...valpassProps } }) => (
                        <FormGroup>
                          <Label for="valpass"> Confirm Password </Label>
                          <Input
                      
                      name="valpass"
                      placeholder="Confirm password"
                      type="password"
                      id="valpass"
          
                      invalid={errors.valpass ? true : false}
                      innerRef={ref} {...valpassProps}
                    />
                      
                      
                      {errors?.valpass && (
                        <FormFeedback>{errors.valpass?.message}</FormFeedback>
                      )}
                        </FormGroup>
                      )}
                    />


             <Controller
                      control={control}
                      name="firstname"
                      render={({ field: { ref, ...firstnameProps } }) => (
                        <FormGroup>
                          <Label for="firstname"> First Names </Label>
                          <Input
                      
                      name="firstname"
                      placeholder="firstname"
                      type="firstname"
                      id="firstname"
          
                      invalid={errors.firstname ? true : false}
                      innerRef={ref} {...firstnameProps}
                    />
                      
                      
                      {errors?.firstname && (
                        <FormFeedback>{errors.firstname?.message}</FormFeedback>
                      )}
                        </FormGroup>
                      )}
                    />


                  <Controller
                      control={control}
                      name="lastname"
                      render={({ field: { ref, ...lastnameProps } }) => (
                        <FormGroup>
                          <Label for="lastname"> Last Names </Label>
                          <Input
                      
                      name="lastname"
                      placeholder="Lastname"
                      type="lastname"
                      id="lastname"
          
                      invalid={errors.lastname ? true : false}
                      innerRef={ref} {...lastnameProps}
                    />
                      
                      
                      {errors?.lastname && (
                        <FormFeedback>{errors.lastname?.message}</FormFeedback>
                      )}
                        </FormGroup>
                      )}
                    />
                    
                    <Controller
                      control={control}
                      name="address"
                      render={({ field: { ref, ...addressProps } }) => (
                        <FormGroup>
                          <Label for="address"> Address </Label>
                          <Input
                      name="address"
                      placeholder="Address"
                      type="textarea"
                      id="address"
                      invalid={errors.address ? true : false}
                      innerRef={ref} {...addressProps}
                    />
                      
                      
                      {errors?.address && (
                        <FormFeedback>{errors.address?.message}</FormFeedback>
                      )}
                        </FormGroup>
                      )}
                    />
              

              
              <Container className="text-center">

                <Button type="submit">Register </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default Register;
