import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'

function ClientModal({ singleDoc}) {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalSubmit = (event) => {
      event.preventDefault()
  }


    return (
        <>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Form id="update_client" onSubmit={modalSubmit}>
          <Modal.Body>
            <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="claimantName">Name</Form.Label>
                <Form.Control
                  type="text"
                  name=""
                  id="claimantName"
                  placeholder="Enter Client's name"
                  value={singleDoc.name}
                />
              </Form.Group>
              <Row className='mb-3'>
              <Form.Group
                as={Col}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "start",
                }}
              >
                <Form.Label htmlFor="dateReported">Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  id="dateReported"
                />
              </Form.Group>
              <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='gender'>Gender <span className='required'>*</span></Form.Label>
                                <div className='gender-options'>
                                    <div>
                                    <input type="radio" name="gender" id="gender" value="male" className='addFormRadio' />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="gender" value="female" className='addFormRadio'/>
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </Form.Group>
                            </Row>

                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='email'>Email Address</Form.Label>
                                <Form.Control type="email" id="email" placeholder="Enter email" value={singleDoc.email}/>
                            </Form.Group>
                            <Form.Group as={Col} className='addFormGroups'>
                                <Form.Label htmlFor='phone'>Phone Number <span className='required'>*</span></Form.Label>
                                <Form.Control type="tel" id="phone" placeholder="Enter phone number" value={singleDoc.phone} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control id="address" placeholder="Enter your address"/>
                    </Form.Group>
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

export default ClientModal
