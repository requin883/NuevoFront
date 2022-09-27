import { Button, ModalBody, ModalFooter, ModalHeader, Modal } from "reactstrap";



export default function HowToTransaction(props) {

    const { flag, setFlag } = props.val;

    const handleClose = () => {
        setFlag(false);
    }
    return (
        <>
            <Modal isOpen={flag} className="text-dark ">
                <ModalHeader className="text-center">
                    <h1> How to validate a transaction</h1>
                </ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button className="btn-menu text-light" color="info" onClick={handleClose}>X</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}