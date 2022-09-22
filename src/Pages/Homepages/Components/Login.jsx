import { useForm } from "react-hook-form";
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


function Login() {

  const [flag, setFlag] = useState(false);

  let [email, setEmail] = useLocalStorage('userEmailHP', '');

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
      console.log("hello");
      console.log(data);
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
        <Card style={{ width: '40em' }} className="d-flex logincard text-center">
          <CardBody>
            <CardTitle className="border-bottom">
              <h2>Login</h2>
            </CardTitle>
            <Form method="POST" onSubmit={handleSubmit(fnSend)}>
              <Row >
                <Col md={6}>
                  <FormGroup floating>
                    <Input bsSize="sm" id="email" name="email" placeholder="email" type="email" {...register("email")} />
                    <Label for="email">Email</Label>
                    {errors?.email &&
                      <FormFeedback>{errors?.email?.message}</FormFeedback>}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup floating>
                    <Input bsSize="sm" id="password" name="password" placeholder="password" type="password"  {...register("password")} />
                    <Label for="password"> Password </Label>
                    {errors?.password &&
                      <FormFeedback>{errors?.password?.message}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Button className="mx-2" type="submit">Submit</Button>
              <Button onClick={handlePassword} >Olvidaste tu contraseña</Button>
            </Form>
            <Routes>
              <Route path='/forgetpassword' element={<EmailAlert val={{ flag, setFlag }} />} />
            </Routes>
          </CardBody>
        </Card>
      </Container>
    </Container>
  );
}

export default Login;
