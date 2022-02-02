import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { db } from '../helpers/firebase';
import { doc, updateDoc } from 'firebase/firestore'
import { authentication } from '../helpers/firebase';

function OrganisationModal({ singleDoc, handleClose }) {
  
    const modalSubmit = async (event) => {
        event.preventDefault()

        const organisationRef = doc(db, "organisations", singleDoc.id);

        await updateDoc(organisationRef, {
            uid: authentication.currentUser.uid,
            category: event.target.category.value,
            name: event.target.name.value,
            org_email: event.target.org_email.value,
            tel: event.target.tel.value,
            address: event.target.address.value,
            logo: event.target.logo.value,
            role: event.target.role.value,
            title: event.target.title.value,
            contactName: event.target.contactName.value,
            contactPhoneNumber: event.target.contactPhoneNumber.value,
            contact_email: event.target.contact_email.value
        });
    }




    return (
        <>

            <Modal.Header closeButton>
                <Modal.Title>Edit {singleDoc.name}</Modal.Title>
            </Modal.Header>
            <form onSubmit={modalSubmit}>
                <Modal.Body>
                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                <Form.Label htmlFor="name">Organisation Name</Form.Label>
                    <Form.Select aria-label="User role" id='category' defaultValue={singleDoc.category}>
                        <option value="hide">--Select Category--</option>
                        <option value="mtp">Bank</option>
                        <option value="comprehensive">Brokers</option>
                        <option value="windscreen">MTN</option>
                        <option value="windscreen">Shell</option>
                        <option value="windscreen">others</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="name">Category</Form.Label>
                    <Form.Control type="text" id="name" defaultValue={singleDoc.name} />
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" id="email" defaultValue={singleDoc.org_email} required/>
                </Form.Group>

                <Row>
                    <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                        <Form.Label htmlFor="tel">Contact</Form.Label>
                        <Form.Control type="text" id="tel" defaultValue={singleDoc.tel} />
                    </Form.Group>

                    <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                        <Form.Label htmlFor="tel">Address</Form.Label>
                        <Form.Control type="text" id="tel" defaultValue={singleDoc.address} />
                    </Form.Group>
                </Row>

                <hr></hr>
                <p style={{color: "#76859a"}}>Contact's Details</p>
                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="tel">Name</Form.Label>
                        <Row>
                            <Col><Form.Control type="text" id="tel" className='col-4' defaultValue={singleDoc.title} /></Col>
                            <Col xs={10}><Form.Control type="text" id="tel" className='col-8' defaultValue={singleDoc.contactName} /></Col>
                        </Row>
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="tel">Role</Form.Label>
                    <Form.Control type="text" id="tel" defaultValue={singleDoc.role} />
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="tel">Phone Number</Form.Label>
                    <Form.Control type="text" id="tel" defaultValue={singleDoc.contactPhoneNumber} />
                </Form.Group>

                <Form.Group as={Col} style={{ display: "flex", "flex-direction": "column", "align-items": "start"}}>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" id="email" defaultValue={singleDoc.contact_email} required/>
                </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleClose} id="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </form>
        </>
    )
}

export default OrganisationModal
