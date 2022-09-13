import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";




function VerifyEmail(){
    let [message, setMessage] = useState("Your validation is in progress")

const params = useParams()
/*
let [token, setToken] = useState()

    useEffect(() => {
        setToken(params.token)
    }, [])

*/

let token = params.token

useEffect(()=>{

    async function validate(){
        try {
      let output = await API_AXIOS.post(endpointList.verifyEmail + `?token=${token}`);
            console.log(output.data)
      switch (output.data) {
       case 0:
        setMessage("The time for validate expired")
           break;
        case 1: 
        setMessage("This email is registered")
            break;
        case 2:
        setMessage ("Your validation was succesful")
        break;
       default:
        setMessage("error")
           break;
   } 

    console.log(JSON.stringify(params))  
    } catch (error) {
        console.log(error)
    }   
    }
 validate();
  
}, [])

return (
    <div>
        <h1> Email Validation  </h1> 
        <h3> {message} </h3>
        <h3> {token} </h3>  
    </div>

)
}
export default VerifyEmail;