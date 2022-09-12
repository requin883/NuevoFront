import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'

function PaymentHistory(){
/*let transactions = [
    {id: 1, quantity: 500, other: 'foo@foo.foo', date: "2022-07-25"},
    {id: 2, quantity: -300, other: 'bar@bar.bar', date: "2022-05-20"},
    {id: 3, quantity: 200, other: 'qux@qux.qux', date: "2022-04-05"}
]*/


let [transactions, setTransactions] = useState([])
let [email, setEmail] =  useState(window.localStorage.getItem("userEmailHP")) 

const getData = async() => {
    try {
        let string = "?email=" + email.slice(1, email.length - 1)
        console.log(string)
         let {data} = await API_AXIOS.get(endpointList.getPayments + string)
   console.log(data)
   setTransactions(data)
    } catch (error) {
        console.log(error)
    }
       
   }

   useEffect(()=>{
       getData()
       console.log(transactions)
}, [])
    return (
        <div> 
            Payments

            <div className='table-responsive'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                            <th> Quantity</th>
                            <th> from/to </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && 
                        transactions.map((transaction)=>(
                            <tr>
                                <td>{transaction.quantity}</td>
                                <td>{transaction.other}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div> 
    )
}

export default PaymentHistory