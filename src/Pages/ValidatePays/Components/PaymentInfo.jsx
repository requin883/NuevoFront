import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


export default function PaymentInfo(props) {

    const { paymentInfoFlag, setPaymentInfoFlag } = props.val;

    return (
        <Modal className="text-dark" isOpen={paymentInfoFlag}>
            <ModalHeader className="text-dark text-center">
                <h2>Account information to process deposits</h2>
            </ModalHeader>
            <ModalBody>
                <h5>
                Binance Pay ID : 219489153
                </h5>
                <img src="./static/binancepay.png" style={{width:"15vw"}}></img>
            </ModalBody>
            <ModalFooter>
                <Button className="btn-menu text-light" color="info" onClick={() => setPaymentInfoFlag(false)}>X</Button>
            </ModalFooter>
        </Modal>
    )

}