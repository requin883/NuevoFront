import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";

import cbMenu from "../../callbacks/cbMenu";
import DepositHistory from "./Components/DepositHistory";
import PaymentHistory from "./Components/PaymentHistory";

function Profile(){

let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP")) 
let [balance, setBalance] = useState()
// datos personales
// balance
// historial de pagos
// historial de depositos


const getData = async() => {
    try {
        let string = "?email=" + email.slice(1, email.length - 1)
         let {data} = await API_AXIOS.get(endpointList.getBalance + string)
   console.log(data)
   setBalance(data)
    } catch (error) {
        console.log(error)
    }
       
   }


useEffect(()=>{
    getData()
    console.log(balance)
}, [])

let menu = [

    { links: '/menu/profile/paymenthistory', options: "Paymens' history" },
    { links: '/menu/profile/deposithistory', options: "Deposits' history" },
    
]

return (
    <div>
        <h1> Profile </h1>
<div> 
    <p>User data  </p>
    <p> Email: {email} </p>
<p> Balance: {balance} </p>
</div>

        <div> 
            {menu.map(cbMenu)}
        </div>
        <div> 
        <Routes>
                    <Route path='/paymenthistory' element={<PaymentHistory/>} />
                    <Route path="/deposithistory" element = {<DepositHistory/>} />
         </Routes>
        </div>
    </div>
)
} 
export default Profile;