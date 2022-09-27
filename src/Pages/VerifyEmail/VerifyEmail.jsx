import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import {
    Button,
    Alert,
    Container
} from 'reactstrap'
import ExamplesNavbar from "../Homepages/Components/Navbar";


const redirectUser = () => {
    window.location.href = "http://localhost:5173/home"
}

function VerifyEmail() {
    let [message, setMessage] = useState("Your validation is in progress")

    const [color, setColor] = useState("success");

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
                        setMessage("The time for validation has expired");
                        setColor("danger");
                        break;
                    case 1:
                        setMessage("This email is registered");
                        setColor("danger")
                        break;
                    case 2:
                        setMessage("Your validation was succesful");
                        break;
                    default:
                        setMessage("error")
                        setColor("danger");
                        break;
                }
            } catch (error) {
                console.log(error)
            }
        }
        validate();

    }, [])

    return (
        <>
            <ExamplesNavbar />
            <Container className="d-flex align-center justify-content-center">
                <Alert color={color} className="newalert text-center">
                    <h1>Notification</h1>
                    <p>{message}</p>
                    <Button className="btn-menu" color="info" onClick={redirectUser}>
                        Go to main page
                    </Button>
                </Alert>
            </Container>
        </>

    )
}
export default VerifyEmail;