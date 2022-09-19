
import API_AXIOS from "../../../settings/settings";
import * as yup from "yup" 
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import endpointList from "../../settings/endpoints";


const redirectUser = () => {
    window.location.href = "http://localhost:5173"
}

const schema = yup.object().shape({
    password: yup.string().min(6).required(),
    valpass: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "the password confirmation does not match"),
})

function ForgotPassword (){
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(schema),
      });


const params = useParams()
let email = params.email

const fnSend = async (data) => {
    let output = await API_AXIOS.post(endpointList.forgotPassword + `?email=${email}&newPassword=${data.password}`)
    if (output.data == 1) {
        alert ("Contraseña cambiada correctamente")
    }
}

return(
    <div> 
        <h2> Email: {email} </h2> 
        <h1> Save a new password </h1>
        <form onSubmit={handleSubmit(fnSend)}>
            <div>
                 <label> Password </label>
                 <input type="password" placeholder="Password" {...register("password")} />
                 <p> {errors.password?.message} </p>
            </div>
            <div>
                 <label> Verify new Password </label>
                 <input type="password" placeholder="Same password " {...register("valpass")} />
                 <p> {errors.valpass?.message} </p>
            </div>
          <input type="submit" value="Save new password" />
        </form>
        <button onClick={redirectUser}> Go to home page </button>
    </div>
)

}

export default ForgotPassword;