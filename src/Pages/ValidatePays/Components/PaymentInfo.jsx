import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


export default function PaymentInfo(props) {

    const { paymentInfoFlag, setPaymentInfoFlag } = props.val;

    return (
        <Modal className="text-dark" isOpen={paymentInfoFlag}>
            <ModalHeader className="text-dark text-center">
                <h2>Account information to process deposits</h2>
            </ModalHeader>
            <ModalBody>
                <h5>Payment Information Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nam rerum esse reiciendis voluptas enim qui mollitia debitis assumenda quaerat odio, minima dolorum, sunt quod dolore excepturi illo beatae ad?</h5>

            </ModalBody>
            <ModalFooter>
                <Button className="btn-menu text-light" color="info" onClick={() => setPaymentInfoFlag(false)}>X</Button>
            </ModalFooter>
        </Modal>
    )

}