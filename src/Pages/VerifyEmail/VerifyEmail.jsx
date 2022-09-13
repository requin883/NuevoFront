import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    Box,
    Flex,
    Heading,
    Button
  } from '@chakra-ui/react'


const redirectUser = () => {
    window.location.href = "http://localhost:5173"
}

function VerifyEmail() {
    let [message, setMessage] = useState("Your validation is in progress")

    const params = useParams()
    /*
    let [token, setToken] = useState()
    
        useEffect(() => {
            setToken(params.token)
        }, [])
    
    */

    let token = params.token

    useEffect(() => {

        async function validate() {
            try {
                let output = await API_AXIOS.post(endpointList.verifyEmail + `?token=${token}`);
                console.log(output.data);
                switch (output.data) {
                    case 0:
                        setMessage("The time for validate expired")
                        break;
                    case 1:
                        setMessage("This email is registered")
                        break;
                    case 2:
                        setMessage("Your validation was succesful")
                        break;
                    default:
                        setMessage("error")
                        break;
                }

                console.log(JSON.stringify(params))
            } catch (error) {
                console.log(error)
            }
        }
        validate();

    }, [])

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
export default VerifyEmail;