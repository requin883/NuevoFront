import {
    Container,
    Table,
    Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { pepito } from "../../../Utils/pepito";

function PaymentHistory(props) {
    /*let transactions = [
        {id: 1, quantity: 500, other: 'foo@foo.foo', date: "2022-07-25"},
        {id: 2, quantity: -300, other: 'bar@bar.bar', date: "2022-05-20"},
        {id: 3, quantity: 200, other: 'qux@qux.qux', date: "2022-04-05"}
    ]*/

    // let { paymentFlag, setPaymentFlag } = props.val;

    let [transactions, setTransactions] = useState([]);

    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"));

    let [userLogin, setUserLogin] = useLocalStorage('user', "");

    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getPayments + string)
            console.log(data)
            setTransactions(data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
        getData()
        //  console.log(transactions)

    }, [])
    return (
        <Container>
            <h1 className='text-dark text-center'>Payments</h1>
            <Table>
                <thead>
                    <tr>
                        <th> Quantity</th>
                        <th> Currency </th>
                        <th> from/to </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions &&
                        transactions.map((transaction) => (
                            <tr>
                                <td>{transaction.quantity}</td>
                                <td> {transaction.token} </td>
                                <td>{transaction.other}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Container className='text-center'>
                <Button onClick={async () => {
                    let email = window.localStorage.getItem("userEmailHP")
                    console.log(email.slice(1, email.length - 1))
                    pepito(email.slice(1, email.length - 1))
                }} > Export Payments' History </Button>
            </Container>
        </Container>
    )
}

export default PaymentHistory