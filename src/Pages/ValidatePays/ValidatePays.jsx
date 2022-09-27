import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatePaySchema } from "../../Utils/yupSchemas";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
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
import ExamplesNavbar from "../Homepages/Components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import HowToTransaction from "./Components/HowToTransaction";



function ValidatePays() {

  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);

  const [userEmail, setEmail] = useState(window.localStorage.getItem("userEmailHP"));

  const [userLogin, setUserLogin] = useLocalStorage('user', "");

  const [spinner, setSpinner] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validatePaySchema),
  });

  const currencies = ["USDT", "BTC", "ETH", "BUSD"];

  const handleClick = () => {
    setFlag(true);
    navigate("howtotrans");
  }

  const fnSend = async (data) => {
    try {
      setSpinner(true);
      let string = `?email=${userEmail.slice(1, userEmail.length - 1)}&year=${data.year}&month=${data.month}&day=${data.day}&hours=${data.hour}&minutes=${data.minute}&seconds=${data.second}&quantity=${data.quantity}`
      let output = await API_AXIOS.post(endpointList.verifyPayment + string)
      alert(JSON.stringify(output.data))
      setSpinner(false);
      reset();
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let date = new Date()
    setUserLogin(date)
  }, [])
  return (
    <>
      <Container>
        <ExamplesNavbar env="pro" />
        <Container className="d-flex align-items-center justify-content-center">
          <Card className="text-dark mb-4" style={{ marginTop: "20vh", width: "50vw" }}>
            <CardHeader>
              <Container className="d-flex justify-content-between">
                <CardTitle className="fs-3 fw-bold">
                  Validate payment
                </CardTitle>
                <Button onClick={handleClick} className="bg-transparent border-0 p-0"><i className="bi bi-info-circle text-dark"></i></Button>
              </Container>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(fnSend)}>
                <Controller
                  control={control}
                  name="year"
                  render={({ field: { ref, ...yearProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="year"
                        placeholder="Year"
                        type="number"
                        id="year"

                        invalid={errors.year ? true : false}
                        innerRef={ref} {...yearProps}
                      />
                      <Label for="year"> Year </Label>
                      {errors?.year && (
                        <FormFeedback>{errors.year?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  control={control}
                  name="month"
                  render={({ field: { ref, ...monthProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="month"
                        placeholder="Month"
                        type="number"
                        id="month"

                        invalid={errors.month ? true : false}
                        innerRef={ref} {...monthProps}
                      />
                      <Label for="month"> Month </Label>
                      {errors?.month && (
                        <FormFeedback>{errors.month?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  control={control}
                  name="day"
                  render={({ field: { ref, ...dayProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="day"
                        placeholder="Day"
                        type="number"
                        id="day"

                        invalid={errors.day ? true : false}
                        innerRef={ref} {...dayProps}
                      />
                      <Label for="day"> Day </Label>
                      {errors?.day && (
                        <FormFeedback>{errors.day?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  control={control}
                  name="hour"
                  render={({ field: { ref, ...hourProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="hour"
                        placeholder="Hour"
                        type="number"
                        id="hour"

                        invalid={errors.hour ? true : false}
                        innerRef={ref} {...hourProps}
                      />
                      <Label for="hour"> Hour </Label>
                      {errors?.hour && (
                        <FormFeedback>{errors.hour?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  control={control}
                  name="minute"
                  render={({ field: { ref, ...minuteProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="minute"
                        placeholder="Minutes"
                        type="number"
                        id="minute"

                        invalid={errors.minute ? true : false}
                        innerRef={ref} {...minuteProps}
                      />
                      <Label for="minute"> Minutes </Label>
                      {errors?.minute && (
                        <FormFeedback>{errors.minute?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  control={control}
                  name="second"
                  render={({ field: { ref, ...secondProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="second"
                        placeholder="Seconds"
                        type="number"
                        id="second"

                        invalid={errors.second ? true : false}
                        innerRef={ref} {...secondProps}
                      />
                      <Label for="second"> Seconds </Label>

                      {errors?.second && (
                        <FormFeedback>{errors.second?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { ref, ...amountProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        id="amount"

                        invalid={errors.amount ? true : false}
                        innerRef={ref} {...amountProps}
                      />
                      <Label for="amount"> Amount </Label>

                      {errors?.amount && (
                        <FormFeedback>{errors.amount?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Controller
                  defaultValue="USDT"
                  control={control}
                  name="currency"
                  render={({ field: { ref, ...currencyProps } }) => (
                    <FormGroup floating>
                      <Input
                        style={{ height: "6vh" }}
                        name="currency"
                        placeholder="Select currency"
                        type='select'
                        id="currency"
                        disabled={spinner}
                        invalid={errors.currency ? true : false}
                        innerRef={ref} {...currencyProps}
                      >
                        <optgroup label="Choose a currency">
                          {currencies?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </optgroup>
                      </Input>
                      <Label for="Currency"> Currency </Label>
                      {errors?.currency && (
                        <FormFeedback>{errors.currency?.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                />
                <Container className="text-center">
                  {spinner ? <Button disabled={spinner} type="submit" className="btn-menu text-light" color="info" value="register"><Spinner /></Button> : <Button type="submit" className="text-center btn-menu text-light" color="info" value="register">Validate</Button>}
                </Container>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <Button disabled={spinner} className="btn-menu text-light" color="info" onClick={() => navigate("/menu")}>Go back to main menu</Button>
            </CardFooter>
          </Card>
        </Container>
      </Container>
      <Routes>
        <Route path="/howtotrans" element={<HowToTransaction val={{ flag, setFlag }} />} />
      </Routes>
    </>
  )

}

export default ValidatePays;