import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Center,
} from '@chakra-ui/react';

function DepositHistory() {

    let [deposits, setDeposits] = useState([])
    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"))

    const getData = async () => {
        try {
            let string = "?email=" + email.slice(1, email.length - 1)
            console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getDeposits + string)
            setDeposits(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Box>
            <Center fontWeight="extrabold" fontSize="4xl" pt="1em" pb="1em">Deposits</Center>
            <Center>
                <TableContainer bgColor="purple.400" w="50em" rounded="10">
                    <Table variant="striped" >
                        <Thead>
                            <Tr>
                                <Th> Amount</Th>
                                <Th> Currency </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {deposits &&
                                deposits.map((deposits) => (
                                    <Tr>
                                        <Td>{deposits.amount}</Td>
                                        <Td>{deposits.currency}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>
        </Box>
    )
}

export default DepositHistory