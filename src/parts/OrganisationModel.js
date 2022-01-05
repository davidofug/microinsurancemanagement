import { useState } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from '../hooks/useForm';

function OrganisationModal({ handleFieldChange, singleDoc, setSingleDoc, fields }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const modalSubmit = (event) => {
        event.preventDefault()
        setSingleDoc(fields)
    }


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Edit Claim</Modal.Title>
            </Modal.Header>
            <Form id="organisation_claim" onSubmit={modalSubmit}>
                <Modal.Body>
                    <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        style={{
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "start",
                        }}
                    >
                        <Form.Label htmlFor="name">Organisation Name</Form.Label>
                        <Form.Control
                        type="text"
                        name=""
                        id="name"
                        defaultValue={singleDoc.name}
                        placeholder="Enter plate No."
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        style={{
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "start",
                        }}
                    >
                        <Form.Label htmlFor="org_email">Organisation Email</Form.Label>
                        <Form.Control
                        type="text"
                        name=""
                        id="org_email"
                        defaultValue={singleDoc.org_email}
                        placeholder="Enter plate No."
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Form.Group
                        as={Col}
                        style={{
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "start",
                        }}
                    >
                        <Form.Label htmlFor="tel">Organisation Phone Number</Form.Label>
                        <Form.Control
                        type="text"
                        name=""
                        id="tel"
                        defaultValue={singleDoc.tel}
                        placeholder="Enter phone Number"
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        style={{
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "start",
                        }}
                    >
                        <Form.Label htmlFor="address">Address</Form.Label>
                        <Form.Control
                        type="text"
                        name=""
                        id="address"
                        defaultValue={singleDoc.address}
                        placeholder="Enter address"
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <h3>Contact Person</h3>
                    <Form.Group
                        as={Col}
                        style={{
                        display: "flex",
                        "flex-direction": "column",
                        "align-items": "start",
                        }}
                    >
                        <Form.Label htmlFor="role">Contact Role</Form.Label>
                        <Form.Control
                        type="text"
                        name=""
                        id="role"
                        placeholder="Enter role"
                        defaultValue={singleDoc.role}
                        onChange={handleFieldChange}
                        />
                    </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group
                            as={Col}
                            style={{
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "start",
                            }}
                        >
                            <Form.Label htmlFor="title">
                            Title
                            </Form.Label>
                            <Form.Control
                            type="text"
                            name=""
                            id="title"
                            defaultValue={singleDoc.title}
                            placeholder="Enter Claimant's phone number"
                            onChange={handleFieldChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            style={{
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "start",
                            }}
                        >
                            <Form.Label htmlFor="contactName">
                            Name
                            </Form.Label>
                            <Form.Control
                            type="text"
                            name=""
                            id="contactName"
                            defaultValue={singleDoc.contactName}
                            placeholder="Enter Contact's Name"
                            onChange={handleFieldChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            style={{
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "start",
                            }}
                        >
                            <Form.Label htmlFor="contactPhoneNumber">
                            Phone Number
                            </Form.Label>
                            <Form.Control
                            type="text"
                            name=""
                            id="contactPhoneNumber"
                            defaultValue={singleDoc.contactPhoneNumber}
                            placeholder="Enter Contact's phone number"
                            onChange={handleFieldChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            style={{
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "start",
                            }}
                        >
                            <Form.Label htmlFor="contact_email">
                            Email
                            </Form.Label>
                            <Form.Control
                            type="text"
                            name=""
                            id="contact_email"
                            defaultValue={singleDoc.contact_email}
                            placeholder="Enter Contact's email"
                            onChange={handleFieldChange}
                            />
                        </Form.Group>
                    </Row>
                    <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        handleClose();
                        
                    }}
                    id="submit"
                    >
                    Submit
                    </Button>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Form>
        </>
    )
}

export default OrganisationModal
