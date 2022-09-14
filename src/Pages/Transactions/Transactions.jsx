import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import endpointList from "../../../settings/endpoints"
import API_AXIOS from "../../../settings/settings"

const currencies = ["USDT" , "USDC", "BUSD"]

const schema = yup.object().shape({
email: yup.string().email().required(),
amount: yup.number().min(0, "The amount most be possitive ").required(),
currency: yup.string().required()
})


function Transactions(){
    let [userEmail, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(schema),
      });

        const fnSend = async (data) => {
            try {

                let string = `?sender=${userEmail.slice(1,userEmail.length - 1)}&receiver=${data.email}&quantity=${data.amount}`
               let output = await API_AXIOS.post(endpointList.sendPayment+ string)
               alert (output.data) 
               switch (output.data) {
                    case 0:
                        alert("no existe el sender")
                        break;
                    case 1:
                        alert("No tienes tanta plata")
                    break;
                    case 2:
                        alert("Sender = receiver")
                    break
                    case 3:
                        alert("Salio bien")
                    break;
                    default:
                        alert("error")
                        break;
                }

            } catch (error) {
                console.log (error)
            }
        }

    return (
        <div>
            <h1>Transactions</h1> 
            <h2> From: {userEmail}</h2>
            <form onSubmit={handleSubmit(fnSend)}>
                <div> 
                  <label> Email of receiver</label>
                <input type='email' id="email" placeholder="Email" {...register("email")} />
                <p> {errors.email?.message} </p>  
                </div>
                <div>
                    <label> Currency </label>
                    <select {...register("currency")}>
                        {currencies?.map((option, index) => (
                            <option key={index} value = {option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <p> {errors.currency?.message} </p>
                </div>
                <div> 
                  <label> Amount of the selected currency </label>
                <input type="number" id="amount" placeholder="Amount" {...register("amount")} />
                <p> {errors.amount?.message} </p>  
                </div>

                <input type='submit' value="Confirm Transaction"/>
            </form>
        </div>
    )

}

export default Transactions