import {
    Container,
    Table,
    Button,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
function DepositHistory() {
    let [userLogin, setUserLogin] = useLocalStorage('user', "");

    let [deposits, setDeposits] = useState([]);

    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"));

    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            //console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getDeposits + string)
            setDeposits(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
        getData()

    }, [])
    return (
        <Container>
            <h1 className='text-dark text-center'>Deposits</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th> Amount</th>
                        <th> Currency </th>
                    </tr>
                </thead>
                <tbody>
                    {deposits &&
                        deposits.map((deposits) => (
                            <tr>
                                <td>{deposits.amount}</td>
                                <td>{deposits.currency}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default DepositHistory