import { Container, Card, CardHeader, CardTitle, CardBody, Button, CardText } from "reactstrap";
const redirectUser = () => {
    window.location.href = "https://cryptocoders-pi.vercel.app/home"
}
function PageNotFound() {
    return (
        <Container style={{ width: "40vw" }} className="text-dark mt-5">
            <Card style={{ marginTop: "30vh" }}>
                <CardHeader className="text-center">
                    <CardTitle style={{ fontSize: "2em", fontWeight: "bold" }}>PAGE NOT FOUND !</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText style={{ fontSize: "1em" }}> We couldn't find this page  </CardText>
                    <Container className="text-center">
                        <Button className="btn-menu" color="info" onClick={redirectUser}> Visit our home page </Button>
                    </Container>
                </CardBody>
            </Card>
        </Container>
    )
}
export default PageNotFound