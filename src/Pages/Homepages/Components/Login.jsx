import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../../settings/settings";
import endpointList from "../../../../settings/endpoints";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const fnSend = async (data) => {
    try {
      let call = await API_AXIOS.get(
        endpointList.login + `?email=${data.email}&password=${data.password}`
      );
      if (call.data == 0) {
        alert("los datos no coinciden pana");
      } else {
        alert("tamo activo menol");
        navigate('/menu')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={handleSubmit(fnSend)}>
        <div>
          <label> Email </label>
          <input type="email" {...register("email")} />
          <p> {errors.email?.message}</p>
        </div>
        <div>
          <label> Password </label>
          <input type="password" {...register("password")} />
          <p> {errors.password?.message}</p>
        </div>
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default Login;
