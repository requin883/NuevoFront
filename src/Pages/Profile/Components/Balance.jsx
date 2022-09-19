import { Container, Button, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';


function Balance() {
    let [userLogin, setUserLogin] = useLocalStorage('user', "");

    let [balance, setBalance] = useState([]);

    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"));

    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            let { data } = await API_AXIOS.get(endpointList.getBalance + string)
            let keys = Object.keys(data)
            let bal = []
            for (let i = 0; i < keys.length; i++) {
                bal.push({ currency: keys[i].toUpperCase(), amount: data[keys[i]] })
            }
            console.log(bal)
            setBalance(bal)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        let date = new Date()
        setUserLogin(date)
        //console.log(userLogin)
    }, [])
    return (
        <Container>
            <h1 className='text-dark text-center'>Balance</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th> Currency </th>
                                <th> Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                            {balance &&
                                balance.map((currency) => (
                                    <tr>
                                        <td>{currency.currency}</td>
                                        <td>{currency.amount}</td>

                                    </tr>
                                ))}
                        </tbody>
                    </Table>
        </Container>
    )
}

export default Balance;