import { Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center, } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';


function Balance () {
   let [userLogin, setUserLogin] = useLocalStorage('user', "") 
    let [balance, setBalance] = useState([])
    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"))

    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            let { data } = await API_AXIOS.get(endpointList.getBalance + string)
            let keys = Object.keys(data)
            let bal = []
            for (let i = 0; i < keys.length; i++) {
            bal.push({currency: keys[i].toUpperCase(), amount: data[keys[i]]})                
            }
            console.log(bal)
            setBalance(bal)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     getData()
  let date = new Date()
  setUserLogin(date)
  //console.log(userLogin)
}, [])
        return (
            <Box>
            <Center fontWeight="extrabold" fontSize="4xl" pt="1em" pb="1em">Balance</Center>
            <Center>
                <TableContainer bgColor="purple.400" w="50em" rounded="10">
                    <Table variant="striped" >
                        <Thead>
                            <Tr>
                                 <Th> Currency </Th> 
                                 <Th> Amount</Th>
                              
                            </Tr>
                        </Thead>
                        <Tbody>
                            {balance &&
                                balance.map((currency) => (
                                    <Tr>
                                       <Td>{currency.currency}</Td> 
                                       <Td>{currency.amount}</Td>
                                        
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>
        </Box>
        )
}

export default Balance;