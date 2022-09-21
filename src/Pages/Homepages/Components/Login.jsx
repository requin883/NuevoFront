import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../../settings/endpoints";
import { Route, Routes, useNavigate, Link as reactLink } from "react-router-dom";
import { loginSchema } from "../../../Utils/yupSchemas"
import {
  Container, Button, Label, Input, Form, FormGroup, Spinner, Card, CardBody, CardTitle, FormFeedback
} from "reactstrap";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import EmailAlert from "./EmailAlert";
import { useState } from "react";
import ExamplesNavbar from "./Navbar";


function Login() {

  const [flag, setFlag] = useState(false);

  const [spinner, setSpinner] = useState(false);

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
      console.log(data);
      setSpinner(true);
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
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = () => {
    setFlag(true);
    navigate('/login/forgetpassword')
  }

  return (
    <Container>
      <ExamplesNavbar />
      <Card className="d-flex logincard">
        <CardBody>
          <CardTitle className="border-bottom mb-4">
            <h2>Login</h2>
          </CardTitle>
          <Form onSubmit={handleSubmit(fnSend)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" name="email" placeholder="email" type="email" {...register("email")} />
              {errors?.email &&
                <FormFeedback>{errors?.email?.message}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password"> Password </Label>
              <Input id="password" name="password" placeholder="password" type="password"  {...register("password")} />
              {errors?.password &&
                <FormFeedback>{errors?.password?.message}</FormFeedback>}
            </FormGroup>
            <Container className="d-flex flex-column justify-content-center align-center">
              {spinner ? <Button className="m-2" type="submit" value="register"><Spinner /></Button> : <Button className="m-2" type="submit" value="register">Login</Button>}
              <Button onClick={handlePassword} >Olvidaste tu contraseña</Button>
            </Container>
          </Form>
          <Routes>
            <Route path='/forgetpassword' element={<EmailAlert val={{ flag, setFlag }} />} />
          </Routes>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Login;
