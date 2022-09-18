import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../settings/endpoints";
import {pepito} from "../../Utils/pepito";

const schema = yup.object().shape({
    data: yup.string().required(),
    currency: yup.string().required(),
    amount: yup.number().required()
})

function SendPayment(){
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(schema),
      });

let [placeholder, setPlaceholder] = useState("Select the type of transaction ")
const currencies = ["usdt", "btc", "eth", "busd"]
const fnSend = (data) => {

    if (placeholder == "Add receiver email") {
        let email = data.data
        let currency = data.currency
        let amount = data.amount
        alert (`Email=${email} & currency=${currency} & amount ${amount}`)
    } else if (placeholder == "Add receiver secret token") {
        let token = data.data
        let currency = data.currency
        let amount = data.amount
        alert (`Token=${token} & currency=${currency} & amount ${amount}`)
    } else  {
        alert ("Please select a type of transaction")
    }

}


return (
    
    <div> 
         <h1> Send Payment </h1>
        <button onClick={()=>  setPlaceholder ("Add receiver email")}> Public </button> <br></br>
        <button onClick={()=>  setPlaceholder ("Add receiver secret token")}> Secret </button>

        <form onSubmit={handleSubmit(fnSend)}>
            <div>
                <label> {placeholder} </label>
            <input placeholder={placeholder} type="text" {...register("data")}/>
            <p> {errors.data?.message}</p> 
            </div>
            <div>
            <input placeholder="Amount" type="number" {...register("amount")}/>
            <p> {errors.amount?.message}</p> 
            </div>
            <div>
            <select placeholder="Select currency" {...register("currency")}>
            {currencies?.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                     ))}
            </select>
            <p> {errors.data?.message}</p> 
            </div>


            <input type="submit" value="Send Payment"/>
        </form>
   
        <button onClick={ async () => {
            let email = window.localStorage.getItem("userEmailHP")
            console.log(email.slice(1,email.length - 1))
            pepito(email.slice(1,email.length - 1))
            alert ("Exportado ")
     }} > Export Payments </button>
    </div>
)
}

export default SendPayment;