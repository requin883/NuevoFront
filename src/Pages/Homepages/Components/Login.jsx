import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../../settings/endpoints";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../Utils/yupSchemas"
import {
  Container, Alert, Button, Label, Input, Form, FormGroup, Spinner, Card, CardBody, CardTitle, FormFeedback, Row, Col
} from "reactstrap";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import EmailAlert from "./EmailAlert";
import { useState } from "react";
import ExamplesNavbar from "./Navbar";


function Login() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema)

  });

  const [newAlert, setNewAlert] = useState(false);

  const [msg, setNewMsg] = useState('The email ')

  const [valFlag, setValFlag] = useState(false);

  const { ref, ...emailField } = register("email");

  const handleAlert = () => {
    setNewAlert(true);
    setTimeout(() => {
      setNewAlert(false);
    }, 3000);

  }

  let [email, setEmail] = useLocalStorage('userEmailHP', '');

  let [userLogin, setUserLogin] = useLocalStorage('user', "");

  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setSpinner(true);
      let call = await API_AXIOS.get(
        endpointList.login + `?email=${data.email}&password=${data.password}`
      );
      switch (call.data) {
        case 0:
          setNewMsg("The username and/or password are incorrect");
          setSpinner(false);
          reset();
          handleAlert();
          break;
        case 1:
          setEmail(data.email);
          let date = new Date();
          setUserLogin(date);
          navigate('/menu');
          break;
        case 2:
          setSpinner(false);
          reset();
          setNewMsg("The email address is not registered");
          handleAlert();
          break;
        case 3:
          setSpinner(false);
          reset();
          setNewMsg("The account has not been verified");
          handleAlert();
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = () => {
    setValFlag(true);
    navigate('/login/forgotpassword');
  }


  return (
    <Container>
      <ExamplesNavbar />
      <Container style={{ display: "flex", justifyContent: "center" }} >
        <Card style={{ width: "40em" }} className="d-flex logincard text-center">
          <Alert className="m-2" isOpen={newAlert} color="danger">
            {msg}
          </Alert>
          <CardBody>
            <CardTitle className="border-bottom d-flex">
              <span></span>
              <h2 className="text-center">Login</h2>
              <Button className="ms-auto mb-2 btn-menu text-light" disabled={spinner} color="info" onClick={() => navigate("/home")}>X</Button>
            </CardTitle>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row >
                <Col md={12}>
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

                <Col md={12}>
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
              {spinner ? <Button disabled={spinner} className="btn-menu text-light" color="info" type="submit"><Spinner /></Button> : <Button className="btn-menu text-light" color="info" type="submit">Login</Button>}
              <br />
              <Button className="mt-3 btn-menu text-light" color="info" disabled={spinner} onClick={handlePassword} >Forgot Password</Button>
            </Form>
          </CardBody>
        </Card>
        <Routes>
          <Route path='/forgotpassword' element={<EmailAlert val={{ valFlag, setValFlag }} />} />
        </Routes>
      </Container>
    </Container>
  );
}

export default Login;
