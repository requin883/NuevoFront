
import { Card, CardBody, CardHeader, CardText, CardTitle, Container, Button } from "reactstrap";

const redirectUser = () => {
    window.location.href = "https://nuevo-front-vz2b.vercel.app/home"
}
function AutoLogOut() {
    return (
        <Container style={{ width: "40vw" }} className="text-dark mt-5">
            <Card style={{ marginTop: "30vh" }}>
                <CardHeader className="text-center">
                    <CardTitle style={{ fontSize: "2em", fontWeight: "bold" }}>Session Timeout !</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText style={{ fontSize: "1em" }}> You have been logged out due to inactive  </CardText>
                    <Container className="text-center">
                        <Button className="btn-menu" color="info" onClick={redirectUser}> Visit our home page </Button>
                    </Container>
                </CardBody>
            </Card>
        </Container>
    )
}
export default AutoLogOut