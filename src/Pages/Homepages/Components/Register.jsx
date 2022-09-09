import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../../settings/settings";
import endpointList from "../../../../settings/endpoints";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  valpass: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "the password confirmation does not match"),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  address: yup.string().required(),
});

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fnSend = async (data) => {
    
    try {
      let registeredFlag = await API_AXIOS.get(
        endpointList.findEmail + `?email=${data.email}`
      );

      if (registeredFlag.data == 0) {alert("no hay un email registrado");
        await API_AXIOS.post(endpointList.register +`?email=${data.email}&names=${data.firstname}&lastnames=${data.lastname}&address=${data.address}&password=${data.password}` );} 
        else {
        alert("hay un email registrado");}


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Register </h1>
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
        <div>
          <label> Confirm password </label>
          <input type="password" {...register("valpass")} />
          <p>{errors.valpass?.message}</p>
        </div>
        <div>
          <label> First name </label>
          <input type="text" {...register("firstname")} />
          <p> {errors.firstname?.message}</p>
        </div>
        <div>
          <label> Last name </label>
          <input type="text" {...register("lastname")} />
          <p> {errors.lastname?.message}</p>
        </div>
        <div>
          <label> address </label>
          <textarea {...register("address")} />
          <p> {errors.address?.message} </p>
        </div>
        <input type="submit" value="register" />
      </form>
    </div>
  );
}

export default Register;
