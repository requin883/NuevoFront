import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../../settings/endpoints";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../Utils/yupSchemas"
import {
  Container, Button, Label, Input, Form, FormGroup, Spinner, Card, CardBody, CardTitle, FormFeedback, Row, Col
} from "reactstrap";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import EmailAlert from "./EmailAlert";
import { useState } from "react";
import ExamplesNavbar from "./Navbar";
import { useEffect } from "react";


function Login() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver:yupResolver(loginSchema)
   
  });

  const { ref, ...emailField } = register("email");
  
   let [email, setEmail] = useLocalStorage('userEmailHP', '');


   const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    alert(JSON.stringify(data))
    try {
      setSpinner(true)
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
          reset();
      setSpinner(false);
      }
    } catch (error) {
      console.log("hello");
      console.log(error);
    }
  };

  const handlePassword = () => {
    setFlag(true);
    navigate('/login/forgetpassword');
  }


  return (
    <Container>
      <ExamplesNavbar />
      <Container style={{ display: "flex", justifyContent: "center" }} >
        <Card style={{ width: "40em" }} className="d-flex logincard text-center">
          <CardBody>
            <CardTitle className="border-bottom d-flex">
              <span></span>
              <h2 className="text-center">Login</h2>
              <Button className="ms-auto mb-2" onClick={() => navigate("/")}>X</Button>
            </CardTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={6}>
                  <FormGroup floating>
                    <Input
                      bsSize="sm"
                      placeholder="email"
                      type="email"
                      invalid={errors.email ? true : false}
                      innerRef={ref} {...emailField}
                    />
                    <Label for="email">Email</Label>
                    {errors?.email && (
                      <FormFeedback>{errors.email?.message}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                <Controller
                      control={control}
                      name="password"
                      render={({ field: { ref, ...fieldProps } }) => (
                        <FormGroup floating>
                          <Input
                      bsSize="sm"
                      name="password"
                      placeholder="password"
                      type="password"
          
                      invalid={errors.password ? true : false}
                      innerRef={ref} {...fieldProps}
                    />
                      
                      <Label for="password"> Password </Label>
                      {errors?.password && (
                        <FormFeedback>{errors.password?.message}</FormFeedback>
                      )}
                        </FormGroup>
                      )}
                    />
                  
                    


                    
                  
                </Col>
              </Row>
              <Button type="submit">Login</Button>
              <Button  onClick={handlePassword} >Olvidaste tu contraseña </Button>
            </Form>
          </CardBody>
        </Card>
        <Routes>
       
        </Routes>
      </Container>
    </Container>
  );
}

export default Login;
