import { Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    TableContainer,
    Center, } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import {pepito} from "../../../Utils/pepito";

function PaymentHistory(props) {
    /*let transactions = [
        {id: 1, quantity: 500, other: 'foo@foo.foo', date: "2022-07-25"},
        {id: 2, quantity: -300, other: 'bar@bar.bar', date: "2022-05-20"},
        {id: 3, quantity: 200, other: 'qux@qux.qux', date: "2022-04-05"}
    ]*/

    let { isOpen, onClose } = props.val;
    let [transactions, setTransactions] = useState([])
    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
   let [userLogin, setUserLogin] = useLocalStorage('user', "") 
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
        <Box>
            <Center fontWeight="extrabold" fontSize="4xl" pt="1em" pb="1em">Payments</Center>
            <Center>
            <TableContainer bgColor="purple.400" w="50em" rounded="10">
                <Table variant="striped" >
                    <Thead>
                        <Tr>
                            <Th> Quantity</Th>
                            <Th> from/to </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactions &&
                            transactions.map((transaction) => (
                                <Tr>
                                    <Td>{transaction.quantity}</Td>
                                    <Td>{transaction.other}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
            </Center>

            <Button onClick={ async () => {
            let email = window.localStorage.getItem("userEmailHP")
            console.log(email.slice(1,email.length - 1))
            pepito(email.slice(1,email.length - 1))
     }} > Export Payments' History </Button>
        </Box>
    )
}

export default PaymentHistory