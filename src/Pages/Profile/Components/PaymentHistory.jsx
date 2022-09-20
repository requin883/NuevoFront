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
    Center,
    Input, } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import {pepito} from "../../../Utils/pepito";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    token: yup.string(),
})
    

function PaymentHistory(props) {

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(schema),
      });

    let trans = [
        {quantity: 500, other: 'foo@foo.foo', token: "btc", date: 1647057600000},
        { quantity: -300, other: 'bar@bar.bar', token: "usdt", date: 1632542400000},
        {quantity: 200, other: 'qux@qux.qux', token: "eth", date: 1648180800000}
    ]


    let { isOpen, onClose } = props.val;
    let [filter, setFilter] = useState(trans)
  //  let [busqueda, setBusqueda] = useState("")
    let [transactions, setTransactions] = useState(trans)
    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
   let [userLogin, setUserLogin] = useLocalStorage('user', "") 
    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getPayments + string)
            console.log(data)
            setTransactions(data)
            setFilter(data)
        } catch (error) {
            console.log(error)
        }

    }

    /*
    const fillFunc = (dataBusqueda) => {
        var result 
        result = filter.filter((element) => {
            if(element.token.toString().toLowerCase().includes(dataBusqueda.toLowerCase())){
                return element;
            }  
        })
        setTransactions(result)
    }
 

    const handleChangeCrypto = e => {
        setBusqueda(e.target.value)
        fillFunc(e.target.value)
    }*/

const iterar = (array) => {
    for (let i = 0; i < array.length; i++) {
        let d = new Date(array[i].date)
    return (
        <Tr>
                <Td>{array[i].quantity}</Td>
                <Td> {array[i].token} </Td>
                <Td>{array[i].other}</Td>
                <Td> {d}</Td>
      </Tr>
    )    
    }
}

const fnSend = (data) =>{
   let start = new Date(data.startDate)
   let end = new Date(data.endDate)
    var result = filter.filter((element) => {
if(element.token.toString().toLowerCase().includes(data.token.toLowerCase()) 
&& start.getTime() <= element.date 
&& end.getTime() >= element.date) {
   return element 
}
        }
)
setTransactions(result)
}

    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
       // getData()
      //  console.log(transactions)
       
    }, [])
    return (
        <Box>
            <Center fontWeight="extrabold" fontSize="4xl" pt="1em" pb="1em">Payments</Center>
          <form onSubmit={handleSubmit(fnSend)}>

            <Input  placeholder="Crypto filter" type="text"  {...register("token")}/>
            <Input  placeholder="Start date" type="date"  {...register("startDate")}/>
            <Input  placeholder="End date" type="date"  {...register("endDate")}/>

        <Input type="submit" value="Fill data"/>
          </form>
           
            <Center>
            <TableContainer bgColor="purple.400" w="50em" rounded="10">
                <Table variant="striped" >
                    <Thead>
                        <Tr>
                            <Th> Quantity</Th>
                            <Th> Currency </Th>
                            <Th> From/To </Th>
                            <Th> Date </Th> 
                        </Tr>
                    </Thead>
                    <Tbody>

                        {transactions &&
                            transactions.map((transaction) => (
                                <Tr>
                                    <Td>{transaction.quantity}</Td>
                                    <Td> {transaction.token} </Td>
                                    <Td>{transaction.other}</Td>
                                    <Td> {transaction.date}</Td>
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