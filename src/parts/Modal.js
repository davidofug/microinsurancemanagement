import AddClient from './forms/AddClient'
import Modal from 'react-bootstrap'

export const handleClose = (display) => false
export const handleShow = (show) => true

function Modal({ display }) {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <Modal show={ display } onHide={close}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddClient />             
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => { display }}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Modal
