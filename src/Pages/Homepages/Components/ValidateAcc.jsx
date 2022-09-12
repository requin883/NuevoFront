import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Box,
    Flex,
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    Button
} from '@chakra-ui/react'
import API_AXIOS from '../../../../settings/settings'
import endpointList from '../../../../settings/endpoints'

let message = "Your account has been confirmed"

const redirectUser = () => {
    window.location.href = "http://localhost:5173"
}

export default function Validation() {
    const { token } = useParams();
    console.log(token);
    // useEffect(async () => {
    //     const message = await API_AXIOS.post(endpointList.verifyAcc,{token});
    //     console.log(message);
    // }, []);

    return (
        <Box width="100vw" h="100vh" opacity=".9" bgImage="url(../../Public/img/cryptoMenubg1.jpg)" bgSize="cover">
            <Flex textShadow=".2em .2em purple" boxShadow='dark-lg' h="6em" justify="center" bgColor="black">
                <Heading fontSize="4em" color="white" fontWeight="bold">CryptoCoders</Heading>
            </Flex>
            <AlertDialog isOpen={true} onClose={onclose}>
                <AlertDialogContent>
                    <AlertDialogHeader>Notification</AlertDialogHeader>
                    <AlertDialogBody>{message}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={redirectUser}>
                            Go to main page
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    )
}

