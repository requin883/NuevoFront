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

function DepositHistory(){
    return (
        <Box>
            <Center fontWeight="extrabold" fontSize="4xl" pt="1em" pb="1em">Deposits</Center>
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
                            {/* {transactions &&
                                transactions.map((transaction) => (
                                    <Tr>
                                        <Td>{transaction.quantity}</Td>
                                        <Td>{transaction.other}</Td>
                                    </Tr>
                                ))} */}
                    </Tbody>
                </Table>
            </TableContainer>
            </Center>
        </Box>
    )
}

export default DepositHistory